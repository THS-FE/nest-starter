/**
 * 附件interface
 */
export interface Attachment {
    fileId: string; // 文件名称UUID
    fieldname?: string; // fileKey
    mimetype?: string; // 文件类型
    originalname?: string; // 文件名称
    size?: number; // 文件大小
    ext?: string; // 文件扩展
    createTime?: string;
    buffer?: any; // 文件流
}
