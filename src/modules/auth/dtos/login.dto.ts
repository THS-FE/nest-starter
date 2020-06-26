import { MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
    @IsNotEmpty({ message: '不能为空' })
    @ApiProperty({ description: '用户名', example: 'liuyingxin' })
    userName: string; // 字段——标题
    @MinLength(6, {
        message: '长度不能小于6',
    })
    @ApiProperty({ description: '密码', example: '123456' })
    pwd: string; // 字段——作者
}
