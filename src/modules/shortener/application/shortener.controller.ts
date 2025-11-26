import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Injectable,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateShortUrlService } from './services/create-short-url.service';
import {
  IsEnum,
  IsInt,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { HandleShortUrlService } from './services/handle-short-url.service';
import { ShortUrlPresentation } from './presentation/short-url.presentation';
import { ListShortnerUrlsService } from './services/list-shortner-urls.service';
import { ShortUrlProps } from '../domain/entities/short-url.entity';
import { Transform } from 'class-transformer';

class CreateShortUrlBody {
  @ApiProperty({ example: 'http://example.com/long-url', required: false })
  @IsUrl()
  url: string;
}

enum Order {
  ASC = 'asc',
  DESC = 'desc',
}

enum OrderBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
}

class ListShortenerUrlsQuery {
  @ApiProperty({ example: 1, required: false })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({ example: 'created_at', required: false })
  @Transform(({ value }) => (value as string).toLowerCase())
  @IsEnum(OrderBy)
  order_by: OrderBy;

  @ApiProperty({ example: 'desc', required: false })
  @Transform(({ value }) => (value as string).toLowerCase())
  @IsEnum(Order)
  order: Order;
}

class RedirectParams {
  @ApiProperty({ example: 'abc123', required: false })
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  hash: string;
}

@Controller('')
@Injectable()
@ApiUnauthorizedResponse({
  description: `
  The request was not authorized. This can occur if:
  
  - The **access token** is missing, invalid, or expired.
  - The user does not have permission to access the requested resource.
  Ensure that a valid access token is provided in the \`Authorization: Bearer <token>\` header.
  `,
})
@ApiBadRequestResponse({
  description: 'The request could not be processed due to invalid input.',
})
@ApiInternalServerErrorResponse({
  description: 'An internal server error occurred.',
})
@ApiNotFoundResponse({
  description: 'Some requested resource was not found',
})
@ApiBearerAuth()
export class ShortenerController {
  constructor(
    @Inject()
    private readonly createShortUrlService: CreateShortUrlService,
    @Inject()
    private readonly listShortnerUrlsService: ListShortnerUrlsService,
    @Inject()
    private readonly handleShortUrlService: HandleShortUrlService,
  ) {}

  @Post('/shortener')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a short url' })
  @ApiOkResponse({
    description: 'Short url created successfully',
  })
  async create(@Body() body: CreateShortUrlBody) {
    const response = await this.createShortUrlService.execute({
      url: body.url,
    });

    const output = ShortUrlPresentation.toController(response.shortUrl);
    return output;
  }

  @Get('/shortener')
  @HttpCode(200)
  @ApiOperation({ summary: 'List shotener urls' })
  @ApiOkResponse({
    description: 'Shortened URLs successfully listed.',
  })
  async list(@Query() params: ListShortenerUrlsQuery) {
    const orderByOptions = { created_at: 'createdAt', updated_at: 'updatedAt' };
    const orderBy = orderByOptions[params.order_by] as keyof ShortUrlProps;

    const response = await this.listShortnerUrlsService.execute({
      page: params.page,
      order: params.order,
      orderBy,
    });

    const output = ShortUrlPresentation.toController(
      response.data,
      response.totalPages,
      response.currentPage,
    );

    return output;
  }

  @Get('/:hash')
  @HttpCode(302)
  @Redirect()
  @ApiOperation({ summary: 'Redirect to the original url' })
  @ApiOkResponse({
    description: 'Redirection successful',
  })
  async redirect(@Param() params: RedirectParams) {
    const response = await this.handleShortUrlService.execute({
      hash: params.hash,
    });

    if (!response) return null;

    return { url: response.shortUrl.url };
  }
}
