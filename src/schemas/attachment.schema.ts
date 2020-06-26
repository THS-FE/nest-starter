import * as mongoose from 'mongoose';

export const AttachmentSchema = new mongoose.Schema({
    fileId: String, // 文件名称UUID
    fieldname: String, // fileKey
    mimetype: String, // 文件类型
    originalname: String, // 文件名称
    size: Number, // 文件大小
    ext: String, // 文件扩展
    createTime: {
        type: Date,
        default: Date.now,
    },
});
