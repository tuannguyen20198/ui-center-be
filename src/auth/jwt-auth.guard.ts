import {
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { AuthGuard } from '@nestjs/passport';
  import { Request } from 'express';
  import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSION } from 'src/decorator/customize';
  
  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
      super();
    }
  
    canActivate(context: ExecutionContext) {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        return true;
      }
      return super.canActivate(context);
    }
  
    handleRequest(err, user, info, context: ExecutionContext) {
      const request: Request = context.switchToHttp().getRequest();
  
      const isSkipPermission = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSION, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      // Bỏ qua kiểm tra token cho các API /api/auth
      const targetEndpoint = request.route?.path as string;
      if (targetEndpoint.startsWith('/api/auth')) {
        // Nếu là /api/auth, không cần phải kiểm tra token
        return user; // Không ném lỗi mà trả về user
      }
  
      // Kiểm tra nếu không có token hoặc token không hợp lệ
      if (err || !user) {
        throw err || new UnauthorizedException("Token không hợp lệ or không có token ở Bearer Token ở Header request!");
      }
  
      // Nếu có token hợp lệ, tiếp tục kiểm tra quyền truy cập nếu cần
      const permissions = user?.permissions ?? [];
      let isExist = permissions.find(
        permission =>
          request.method === permission.method &&
          request.route?.path === permission.apiPath
      );
  
      if (!isExist && !isSkipPermission) {
        throw new ForbiddenException("Bạn không có quyền để truy cập endpoint này!");
      }
  
      return user;
    }
  }
  