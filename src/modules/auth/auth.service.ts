import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
/**
 * 认证服务
 */
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel('User') private userModel,
    ) { }

    /**
     * 根据用户信息生成一个token
     * @param user 将要生成用户信息的token
     */
    async signIn(user: User): Promise<string> {
        return this.jwtService.sign(user);
    }

    /**
     * 验证用户是否存在数据
     * @param payload token存放的数据
     */
    async validateUser(payload: User): Promise<any> {
        const users = await this.checkUser({ userName: payload.userName });
        if (users.length > 0) {
            return users[0];
        }
        return null;
    }

   /**
    * 检查用户是否存在
    * @param user 包含用户字段信息的对象json
    */
   async checkUser(user: User): Promise<User[]> {
    const result = await this.userModel.find(user).exec();
    return result;
}
}
