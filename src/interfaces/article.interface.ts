/**
 * 文章interface
 */
export interface Article {
    _id?: string; // 字段——id
    title?: string; // 字段——标题
    author?: string; // 字段——作者
    content?: string; // 字段——内容
    status?: number; // 字段——文章状态,1已发表，0未发表
    createTime?: string; // 字段——文章创建时间,自动创建
    keywords?: string; // 字段——关键词
}
