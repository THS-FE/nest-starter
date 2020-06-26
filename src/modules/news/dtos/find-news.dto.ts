import { IsInt, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
/**
 * 查询文章时dto
 */
export class FindNewsDto {
    @MaxLength(20, {
        message: '长度不能超过20',
    })
    @ApiProperty({ description: '关键词', example: '中美贸易' })
    keywords: string; // 字段——关键词
}
