import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AUTH } from '../../setup/constants';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
/**
 * 认证controller
 */
@ApiTags('用户认证模块')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    /**
     * 登录
     * @param body 用户名密码对象
     */
    @Post('login')
    async login(@Body() login: LoginDto) {
        // 通过数据库验证用户名密码是否正确
        const userRes = await this.authService.checkUser(login);
        if (userRes.length > 0) {
            const token = await this.authService.signIn({ userName: login.userName });
            return { ret: 'success', data: { msg: '登录成功', token, expires_in: AUTH.EXPIRES_IN, realName: userRes[0].realName } };
        }
        return { ret: 'fail', data: { msg: '用户名或密码错误' } };
    }

}
