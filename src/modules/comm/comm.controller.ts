import { Controller, Post, UseInterceptors, UploadedFiles, Get, Query, Res } from '@nestjs/common';
import { FilesInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { DownLoadAttachementDto } from './dtos/download-attachement.dto';
import { FileUtilsService } from './services/file-utils/file-utils.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('公共模块')
@Controller('comm')
export class CommController {
    constructor(private readonly fileUtilsService: FileUtilsService) {

    }

    /**
     * 上传多个文件，按照选择的文件名字存储，文件名字重复会被覆盖
     * @param files 文件
     */
    @Post('uploadFiles')
    @UseInterceptors(FilesInterceptor('file')) // 指定fileKey 为file
    uploadFiles(@UploadedFiles() files) {
        return this.fileUtilsService.saveFiles(...files);
    }

    /**
     * 上传任意且多个文件，不用指定固定fileKey。该方法上传会使用数据库存储文件相关信息
     * @param files  文件列表
     */
    @Post('uploadAnyFiles')
    @UseInterceptors(AnyFilesInterceptor())
    uploadAnyFiles(@UploadedFiles() files) {
        // 保存文件并存储文件相关信息进入数据库
        if (files.length > 0) {
            return this.fileUtilsService.saveFileAndData(...files);
        }
        return {res: 'fail', msg: '上传文件不存在'};
    }

    /**
     * 下载文件，与uploadAnyFiles该方法配合使用
     * @param attaachement 传参
     * @param res 返回结果
     */
    @Get('download')
    downLoad(@Query() attaachement: DownLoadAttachementDto, @Res() res) {
        this.fileUtilsService.downFile(attaachement, res);
    }

}
