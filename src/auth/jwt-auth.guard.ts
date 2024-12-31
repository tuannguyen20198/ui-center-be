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
  
      // If no user or an error occurs, throw UnauthorizedException
      if (err || !user) {
        throw err || new UnauthorizedException("Token không hợp lệ or không có token ở Bearer Token ở Header request!");
      }
  
      // Skip permission check if it's marked as public
      if (isSkipPermission) {
        return user;
      }
  
      // If the endpoint is public or no permission check is needed, continue
      const targetEndpoint = request.route?.path as string;
      if (targetEndpoint.startsWith("/api/v1/auth")) {
        return user;
      }
  
      // If it's not a public endpoint and no permissions, throw ForbiddenException
      throw new ForbiddenException("Bạn không có quyền để truy cập endpoint này!");
    }
  }
  