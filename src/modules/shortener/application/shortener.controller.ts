import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Injectable,
  Param,
  Post,
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
import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { HandleShortUrlService } from './services/handle-short-url.service';

class CreateShortUrlBody {
  @ApiProperty({ example: 'http://example.com/long-url', required: false })
  @IsUrl()
  url: string;
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
    return { short_url: response.shortUrl };
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

    return { url: response.url };
  }
}
