import {  IsNotEmpty } from 'class-validator';
import { Attachment } from 'src/interfaces/attachment.interface';
import { ApiProperty } from '@nestjs/swagger';
export class DownLoadAttachementDto implements Attachment {
    @IsNotEmpty({ message: 'fileId不能为空' })
    @ApiProperty({ description: '文件ID', example: 'c1c2a3s5s6s69kkan8xkkkasn' })
    fileId: string; // 文件存储唯一标识

    @ApiProperty({ description: '附件为图片时缩略图宽度', example: '256' })
    w: string; // 附件为图片时缩略图宽度

    @ApiProperty({ description: '附件为图片时缩略图高度', example: '256' })
    h: string; // 附件为图片时缩略图高度
}
