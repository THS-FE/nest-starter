import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AUTH } from '../../setup/constants';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schemas/user.schema';
/**
 * API认证模块
 */
@Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
        secret: AUTH.SECRET,
        signOptions: {
            expiresIn: AUTH.EXPIRES_IN,
        },
    }),
    MongooseModule.forFeature([
        {
            name: 'User',
            schema: UserSchema,
            collection: 'user',
        },
    ])],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule.register({ defaultStrategy: 'jwt' }), AuthService],
    controllers: [AuthController],
})
export class AuthModule { }
