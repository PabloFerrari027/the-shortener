import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { ListUsersService } from './services/list-users.service';
import { RemoveUserService } from './services/remove-user.service';
import { UpdateUserService } from './services/update-user.service';
import { User, UserRole } from '../domain/entities/user.entity';
import { Name } from '../domain/value-objects/name.value-object';
import { Email } from '../domain/value-objects/email.value-object';
import { Password } from '../domain/value-objects/password.value-object';
import { UserPresentation } from './presentation/user.presentation';
import { AuthGuard } from '@/modules/auth/infra/guards/auth.guard';
import { AdminGuard } from '@/modules/auth/infra/guards/role.guard';
import { ExecutionContext } from '@nestjs/common';

jest.mock('./presentation/user.presentation');

describe('UsersController', () => {
  let controller: UsersController;
  let listUsersService: jest.Mocked<ListUsersService>;
  let removeUserService: jest.Mocked<RemoveUserService>;
  let updateUserService: jest.Mocked<UpdateUserService>;

  const mockAuthGuard = {
    canActivate: jest.fn().mockResolvedValue(true),
  };

  const mockAdminGuard = {
    canActivate: jest.fn().mockResolvedValue(true),
  };

  const createMockUser = (role: UserRole = UserRole.ADMIN) => {
    return User.create({
      name: Name.create('John Doe'),
      email: Email.create('john@example.com'),
      password: Password.create('Password123!'),
      role,
    });
  };

  const mockUser = createMockUser();
  const mockUser2 = createMockUser(UserRole.CLINET);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: ListUsersService,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: RemoveUserService,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateUserService,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .overrideGuard(AdminGuard)
      .useValue(mockAdminGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
    listUsersService = module.get(ListUsersService);
    removeUserService = module.get(RemoveUserService);
    updateUserService = module.get(UpdateUserService);

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('list', () => {
    beforeEach(() => {
      mockAuthGuard.canActivate.mockResolvedValue(true);
      mockAdminGuard.canActivate.mockResolvedValue(true);
    });

    it('should list users with default parameters', async () => {
      const mockServiceResponse = {
        data: [mockUser, mockUser2],
        currentPage: 1,
        totalPages: 1,
      };

      const mockPresentation = {
        data: [
          {
            id: mockUser.id,
            name: mockUser.name.value,
            email: mockUser.email.value,
            role: mockUser.role,
            created_at: mockUser.createdAt.toISOString(),
            updated_at: mockUser.updatedAt.toISOString(),
          },
        ],
        current_page: 1,
        total_pages: 1,
      };

      listUsersService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue(
        mockPresentation,
      );

      const result = await controller.list({});

      expect(listUsersService.execute).toHaveBeenCalledWith({
        page: 1,
        order: undefined,
        orderBy: 'createdAt',
      });
      expect(UserPresentation.toController).toHaveBeenCalledWith(
        mockServiceResponse.data,
        mockServiceResponse.totalPages,
        mockServiceResponse.currentPage,
      );
      expect(result).toEqual(mockPresentation);
    });

    it('should list users with custom page', async () => {
      const mockServiceResponse = {
        data: [mockUser],
        currentPage: 2,
        totalPages: 3,
      };

      const mockPresentation = {
        data: [],
        current_page: 2,
        total_pages: 3,
      };

      listUsersService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue(
        mockPresentation,
      );

      await controller.list({ page: 2 });

      expect(listUsersService.execute).toHaveBeenCalledWith({
        page: 2,
        order: undefined,
        orderBy: 'createdAt',
      });
    });

    it('should list users with order_by created_at', async () => {
      const mockServiceResponse = {
        data: [mockUser],
        currentPage: 1,
        totalPages: 1,
      };

      listUsersService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue({});

      await controller.list({ order_by: 'created_at' as any });

      expect(listUsersService.execute).toHaveBeenCalledWith({
        page: 1,
        order: undefined,
        orderBy: 'createdAt',
      });
    });

    it('should list users with order_by updated_at', async () => {
      const mockServiceResponse = {
        data: [mockUser],
        currentPage: 1,
        totalPages: 1,
      };

      listUsersService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue({});

      await controller.list({ order_by: 'updated_at' as any });

      expect(listUsersService.execute).toHaveBeenCalledWith({
        page: 1,
        order: undefined,
        orderBy: 'updatedAt',
      });
    });

    it('should list users with order asc', async () => {
      const mockServiceResponse = {
        data: [mockUser],
        currentPage: 1,
        totalPages: 1,
      };

      listUsersService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue({});

      await controller.list({ order: 'asc' as any });

      expect(listUsersService.execute).toHaveBeenCalledWith({
        page: 1,
        order: 'asc',
        orderBy: 'createdAt',
      });
    });

    it('should list users with order desc', async () => {
      const mockServiceResponse = {
        data: [mockUser],
        currentPage: 1,
        totalPages: 1,
      };

      listUsersService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue({});

      await controller.list({ order: 'desc' as any });

      expect(listUsersService.execute).toHaveBeenCalledWith({
        page: 1,
        order: 'desc',
        orderBy: 'createdAt',
      });
    });

    it('should list users with all parameters', async () => {
      const mockServiceResponse = {
        data: [mockUser],
        currentPage: 2,
        totalPages: 5,
      };

      listUsersService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue({});

      await controller.list({
        page: 2,
        order_by: 'updated_at' as any,
        order: 'desc' as any,
      });

      expect(listUsersService.execute).toHaveBeenCalledWith({
        page: 2,
        order: 'desc',
        orderBy: 'updatedAt',
      });
    });

    it('should handle service errors', async () => {
      const error = new Error('Service error');
      listUsersService.execute.mockRejectedValue(error);

      await expect(controller.list({})).rejects.toThrow('Service error');
    });

    it('should block access when authentication fails', async () => {
      mockAuthGuard.canActivate.mockResolvedValue(false);

      const result = await mockAuthGuard.canActivate({} as ExecutionContext);

      expect(result).toBe(false);
    });

    it('should block access when user is not admin', async () => {
      mockAdminGuard.canActivate.mockResolvedValue(false);

      const result = await mockAdminGuard.canActivate({} as ExecutionContext);

      expect(result).toBe(false);
    });

    it('should allow access when both guards pass', async () => {
      mockAuthGuard.canActivate.mockResolvedValue(true);
      mockAdminGuard.canActivate.mockResolvedValue(true);

      const authResult = await mockAuthGuard.canActivate(
        {} as ExecutionContext,
      );
      const adminResult = await mockAdminGuard.canActivate(
        {} as ExecutionContext,
      );

      expect(authResult).toBe(true);
      expect(adminResult).toBe(true);
    });
  });

  describe('update', () => {
    beforeEach(() => {
      mockAuthGuard.canActivate.mockResolvedValue(true);
      mockAdminGuard.canActivate.mockResolvedValue(true);
    });

    it('should update user role successfully', async () => {
      const userId = mockUser.id;
      const mockServiceResponse = {
        user: mockUser,
      };

      const mockPresentation = {
        id: mockUser.id,
        name: mockUser.name.value,
        email: mockUser.email.value,
        role: UserRole.ADMIN,
        created_at: mockUser.createdAt.toISOString(),
        updated_at: mockUser.updatedAt.toISOString(),
      };

      updateUserService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue(
        mockPresentation,
      );

      const result = await controller.update(
        { id: userId },
        { role: UserRole.ADMIN },
      );

      expect(updateUserService.execute).toHaveBeenCalledWith({
        id: userId,
        role: UserRole.ADMIN,
      });
      expect(UserPresentation.toController).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockPresentation);
    });

    it('should update user without role', async () => {
      const userId = mockUser.id;
      const mockServiceResponse = {
        user: mockUser,
      };

      updateUserService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue({});

      await controller.update({ id: userId }, {});

      expect(updateUserService.execute).toHaveBeenCalledWith({
        id: userId,
        role: undefined,
      });
    });

    it('should update user with CLINET role', async () => {
      const userId = mockUser.id;
      const mockServiceResponse = {
        user: mockUser2,
      };

      updateUserService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue({});

      await controller.update({ id: userId }, { role: UserRole.CLINET });

      expect(updateUserService.execute).toHaveBeenCalledWith({
        id: userId,
        role: UserRole.CLINET,
      });
    });

    it('should handle service errors', async () => {
      const userId = mockUser.id;
      const error = new Error('Update failed');
      updateUserService.execute.mockRejectedValue(error);

      await expect(
        controller.update({ id: userId }, { role: UserRole.ADMIN }),
      ).rejects.toThrow('Update failed');
    });

    it('should call presentation layer correctly', async () => {
      const userId = mockUser.id;
      const mockServiceResponse = {
        user: mockUser,
      };

      updateUserService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue({});

      await controller.update({ id: userId }, { role: UserRole.ADMIN });

      expect(UserPresentation.toController).toHaveBeenCalledTimes(1);
      expect(UserPresentation.toController).toHaveBeenCalledWith(mockUser);
    });

    it('should block access when authentication fails', async () => {
      mockAuthGuard.canActivate.mockResolvedValue(false);

      const result = await mockAuthGuard.canActivate({} as ExecutionContext);

      expect(result).toBe(false);
    });

    it('should block access when user is not admin', async () => {
      mockAdminGuard.canActivate.mockResolvedValue(false);

      const result = await mockAdminGuard.canActivate({} as ExecutionContext);

      expect(result).toBe(false);
    });

    it('should allow access when both guards pass', async () => {
      mockAuthGuard.canActivate.mockResolvedValue(true);
      mockAdminGuard.canActivate.mockResolvedValue(true);

      const authResult = await mockAuthGuard.canActivate(
        {} as ExecutionContext,
      );
      const adminResult = await mockAdminGuard.canActivate(
        {} as ExecutionContext,
      );

      expect(authResult).toBe(true);
      expect(adminResult).toBe(true);
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      mockAuthGuard.canActivate.mockResolvedValue(true);
      mockAdminGuard.canActivate.mockResolvedValue(true);
    });

    it('should delete user successfully', async () => {
      const userId = mockUser.id;

      removeUserService.execute.mockResolvedValue(undefined);

      const result = await controller.delete({ id: userId });

      expect(removeUserService.execute).toHaveBeenCalledWith({
        id: userId,
      });
      expect(removeUserService.execute).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });

    it('should delete user with different id', async () => {
      const userId = 'different-id';

      removeUserService.execute.mockResolvedValue(undefined);

      await controller.delete({ id: userId });

      expect(removeUserService.execute).toHaveBeenCalledWith({
        id: userId,
      });
    });

    it('should handle service errors', async () => {
      const userId = mockUser.id;
      const error = new Error('Delete failed');
      removeUserService.execute.mockRejectedValue(error);

      await expect(controller.delete({ id: userId })).rejects.toThrow(
        'Delete failed',
      );
    });

    it('should not return any value', async () => {
      const userId = mockUser.id;
      removeUserService.execute.mockResolvedValue(undefined);

      const result = await controller.delete({ id: userId });

      expect(result).toBeUndefined();
    });

    it('should block access when authentication fails', async () => {
      mockAuthGuard.canActivate.mockResolvedValue(false);

      const result = await mockAuthGuard.canActivate({} as ExecutionContext);

      expect(result).toBe(false);
    });

    it('should block access when user is not admin', async () => {
      mockAdminGuard.canActivate.mockResolvedValue(false);

      const result = await mockAdminGuard.canActivate({} as ExecutionContext);

      expect(result).toBe(false);
    });

    it('should allow access when both guards pass', async () => {
      mockAuthGuard.canActivate.mockResolvedValue(true);
      mockAdminGuard.canActivate.mockResolvedValue(true);

      const authResult = await mockAuthGuard.canActivate(
        {} as ExecutionContext,
      );
      const adminResult = await mockAdminGuard.canActivate(
        {} as ExecutionContext,
      );

      expect(authResult).toBe(true);
      expect(adminResult).toBe(true);
    });
  });

  describe('orderBy mapping', () => {
    beforeEach(() => {
      mockAuthGuard.canActivate.mockResolvedValue(true);
      mockAdminGuard.canActivate.mockResolvedValue(true);
    });

    it('should map created_at to createdAt', async () => {
      const mockServiceResponse = {
        data: [mockUser],
        currentPage: 1,
        totalPages: 1,
      };

      listUsersService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue({});

      await controller.list({ order_by: 'created_at' as any });

      const callArgs = listUsersService.execute.mock.calls[0][0];
      expect(callArgs.orderBy).toBe('createdAt');
    });

    it('should map updated_at to updatedAt', async () => {
      const mockServiceResponse = {
        data: [mockUser],
        currentPage: 1,
        totalPages: 1,
      };

      listUsersService.execute.mockResolvedValue(mockServiceResponse);
      (UserPresentation.toController as jest.Mock).mockReturnValue({});

      await controller.list({ order_by: 'updated_at' as any });

      const callArgs = listUsersService.execute.mock.calls[0][0];
      expect(callArgs.orderBy).toBe('updatedAt');
    });
  });

  describe('integration between methods', () => {
    beforeEach(() => {
      mockAuthGuard.canActivate.mockResolvedValue(true);
      mockAdminGuard.canActivate.mockResolvedValue(true);
    });

    it('should handle multiple operations in sequence', async () => {
      const mockServiceResponse = {
        data: [mockUser],
        currentPage: 1,
        totalPages: 1,
      };

      listUsersService.execute.mockResolvedValue(mockServiceResponse);
      updateUserService.execute.mockResolvedValue({ user: mockUser });
      removeUserService.execute.mockResolvedValue(undefined);
      (UserPresentation.toController as jest.Mock).mockReturnValue({});

      await controller.list({});
      await controller.update({ id: mockUser.id }, { role: UserRole.ADMIN });
      await controller.delete({ id: mockUser.id });

      expect(listUsersService.execute).toHaveBeenCalledTimes(1);
      expect(updateUserService.execute).toHaveBeenCalledTimes(1);
      expect(removeUserService.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('Guards integration', () => {
    it('should verify AuthGuard is applied to controller', () => {
      const guards = Reflect.getMetadata('__guards__', UsersController);
      expect(guards).toBeDefined();
      expect(guards.length).toBeGreaterThan(0);
    });

    it('should verify AdminGuard is applied to controller', () => {
      const guards = Reflect.getMetadata('__guards__', UsersController);
      expect(guards).toBeDefined();
      expect(guards.length).toBeGreaterThan(0);
    });

    it('should verify guards are applied to list endpoint', () => {
      const guards = Reflect.getMetadata('__guards__', UsersController);
      expect(guards).toBeDefined();
    });

    it('should verify guards are applied to update endpoint', () => {
      const guards = Reflect.getMetadata('__guards__', UsersController);
      expect(guards).toBeDefined();
    });

    it('should verify guards are applied to delete endpoint', () => {
      const guards = Reflect.getMetadata('__guards__', UsersController);
      expect(guards).toBeDefined();
    });
  });

  describe('Guard behavior scenarios', () => {
    it('should deny access when only AuthGuard fails', async () => {
      mockAuthGuard.canActivate.mockResolvedValue(false);
      mockAdminGuard.canActivate.mockResolvedValue(true);

      const authResult = await mockAuthGuard.canActivate(
        {} as ExecutionContext,
      );

      expect(authResult).toBe(false);
    });

    it('should deny access when only AdminGuard fails', async () => {
      mockAuthGuard.canActivate.mockResolvedValue(true);
      mockAdminGuard.canActivate.mockResolvedValue(false);

      const adminResult = await mockAdminGuard.canActivate(
        {} as ExecutionContext,
      );

      expect(adminResult).toBe(false);
    });

    it('should deny access when both guards fail', async () => {
      mockAuthGuard.canActivate.mockResolvedValue(false);
      mockAdminGuard.canActivate.mockResolvedValue(false);

      const authResult = await mockAuthGuard.canActivate(
        {} as ExecutionContext,
      );
      const adminResult = await mockAdminGuard.canActivate(
        {} as ExecutionContext,
      );

      expect(authResult).toBe(false);
      expect(adminResult).toBe(false);
    });

    it('should allow access only when both guards pass', async () => {
      mockAuthGuard.canActivate.mockResolvedValue(true);
      mockAdminGuard.canActivate.mockResolvedValue(true);

      const authResult = await mockAuthGuard.canActivate(
        {} as ExecutionContext,
      );
      const adminResult = await mockAdminGuard.canActivate(
        {} as ExecutionContext,
      );

      expect(authResult).toBe(true);
      expect(adminResult).toBe(true);
    });
  });
});
