import { Article } from '../../../interfaces/article.interface';
import {  MinLength, MaxLength, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
/**
 * 添加文章时dto
 */
export class AddArticleDto implements Article {
    @IsString({ message: '必须的字符类型' })
    @MinLength(2, {
        message: '长度不能小于2',
    })
    @MaxLength(20, {
        message: '长度不能超过20',
    })
    @IsString({ message: '必须的字符类型' })
    @ApiProperty({ description: '文章标题', example: '香港暴乱' })
    title: string; // 字段——标题
    @IsString({ message: '必须的字符类型' })
    @ApiProperty({ description: '作者', example: '张梦玮' })
    author: string; // 字段——作者
    @IsString({ message: '必须的字符类型' })
    @ApiProperty({ description: '内容', example: '这个测试内容' })
    content: string; // 字段——内容
    @IsInt({ message: '必须的整数' })
    @ApiProperty({ description: '文章状态', example: 1 })
    status: number; // 字段——文章状态,1已发表，0未发表
    @MaxLength(20, {
        message: '长度不能超过20',
    })
    @ApiProperty({ description: '关键词', example: '中美贸易' })
    keywords: string; // 字段——关键词
}
