import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
    title: String, // 标题
    author: String, // 作者
    content: String, // 内容
    status: Number, // 文章状态,1已发表，0未发表
    keywords: String, // 文件关键词
    createTime: {
        type: Date,
        default: Date.now,
    }, // 文章创建时间
});
