import { Injectable, Logger } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join, extname } from 'path';
import { UPLOAD_FILE } from '../../../../setup/constants';
import { InjectModel } from '@nestjs/mongoose';
import { Attachment } from '../../../../interfaces/attachment.interface';
import { CommUtilsService } from '../comm-utils/comm-utils.service';
import Jimp from 'jimp/es';
import { DownLoadAttachementDto } from '../../dtos/download-attachement.dto';
/**
 * 文件相关操作
 */
@Injectable()
export class FileUtilsService {
    constructor(@InjectModel('Attachment') private attachmentModel, private readonly commUtilsService: CommUtilsService) {

    }
    /**
     * 保存文件
     * @param files 文件列表
     */
    saveFiles(...files: any[]): any[] {
        for (const file of files) {
            this.saveFile(file, `${file.originalname}`);
        }
        return files;
    }

    /**
     * 保存单个文件
     * @param file 文件对象
     * @param originalname 保存的文件名称
     */
    private saveFile(file: Attachment, originalname: string) {
        // 获取要保存的文件路径
        const pathStr = join(UPLOAD_FILE.REAL_PATH, originalname);
        // 创建写入流，准备生成文件
        const writeImage = createWriteStream(pathStr);
        // 返回写入结果
        writeImage.write(file.buffer);
        writeImage.end();
        writeImage.on('finish', () => {
            // 根据配置及文件是否为支持的图片确定是否生成缩略图
            this.saveThumps(pathStr);
        });
    }

    /**
     * 保存缩略图
     * @param pathStr 原图路径
     */
    private saveThumps(pathStr: string) {
        if (UPLOAD_FILE.IS_CREATE_THUMP && extname(pathStr)) {
            for (const thump of UPLOAD_FILE.THUMP_CONFIG) {
                this.jimpImg(pathStr, thump.w, thump.h, thump.quality);
            }
        }
    }

    /**
     * 保存文件
     * @param files 文件列表
     */
    async saveFileAndData(...files: Attachment[]): Promise<string[]> {
        const fileArr = [];
        for (const file of files) {
            // 获取uuid 用于文件名保存
            const uuid = this.commUtilsService.getUuid();
            const originalname = file.originalname;
            // 通过原始文件名称获取扩展后缀
            const ext = this.getFileExtName(originalname);
            file.ext = ext;
            // 保存文件到磁盘
            this.saveFile(file, `${uuid}.${ext}`);
            // 设置fileId字段为保存的a
            file.fileId = uuid;
            const fileObj = await this.saveData(file);
            fileArr.push(fileObj);

        }
        return fileArr;
    }

    /**
     * 保存文件相关数据进入数据库
     * @param fileData 文件数据
     */
    async saveData(fileData: Attachment): Promise<Attachment[]> {
        const model = new this.attachmentModel(fileData);
        const result = await model.save();
        return result;
    }

    /**
     * 下载文件
     * @param condition 过滤条件，一般根据id进行过滤
     * @param res @Res 返回数据
     */
    async downFile(condition: DownLoadAttachementDto, res) {
        // 查询数据库附件数据
        const result = await this.attachmentModel.find({ fileId: condition.fileId }).exec();
        if (result && result.length > 0) {
            // 根据查询出来数据，拼接文件路径
            const file = result[0];
            let pathStr = join(UPLOAD_FILE.REAL_PATH, `${file.fileId}.${file.ext}`);
            if (this.isJimpSupport(extname(pathStr)) && condition.w && condition.h) {
                pathStr = pathStr + `_${condition.w}x${condition.h}` + extname(pathStr);
            }
            // 返回文件流
            try {
                res.download(pathStr);
            } catch (error) {
                res.send(error);
            }
        } else {
            // 文件不存在时返回返回
            res.send('文件不存在');
        }

    }

    /**
     * 获取文件扩展名
     * @param filename 文件名字
     */
    getFileExtName(filename: string): string {
        const index = filename.lastIndexOf('.');
        const ext = filename.substr(index + 1);
        return ext;
    }

    /**
     * 生成缩略图
     * @param path 缩略图路径
     * @param w 宽度
     * @param h 高度
     * @param quality 质量
     */
    jimpImg(path: string, w: number = 256, h: number = w, quality: number = 80) {
        Jimp.read(path)
            .then(lenna => {
                return lenna
                    .resize(w, h) // resize
                    .quality(quality) // set JPEG quality
                    .greyscale() // set greyscale
                    .write(path + `_${w}x${h}` + extname(path)); // save
            })
            .catch(err => {
                Logger.error(err);
            });
    }

    /**
     * 检测Jimp是否支持
     * @param extName 扩展名
     */
    isJimpSupport(extName: string): boolean {
        const supportImgs = ['.bmp', '.BMP', '.gif', '.GIF', '.jpeg', '.JPEG', '.png', '.PNG', '.tiff', '.TIFF'];
        return supportImgs.findIndex((value) => value === extName) !== -1;
    }

}
