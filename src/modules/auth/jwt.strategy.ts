import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AUTH } from 'src/setup/constants';
/**
 * JWt策略类，由于继承了PassportStrategy，当验证token 时，会自动进入此方法validate
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: AUTH.SECRET,
        });
    }
    /**
     * 包含认证token时，此方法被自动调用
     * @param payload 负载数据，包含用户信息
     */
    async validate(payload: any) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            // 用户不存在，抛出异常
            throw new UnauthorizedException('认证失败');
        }
        return user;
    }
}
