import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from 'src/interfaces/article.interface';

/**
 * 新闻服务，主要数据库数据等相关操作
 */
@Injectable()
export class NewsService {
    constructor(@InjectModel('Article') private articleModel) {

    }

    /**
     * 添加新闻文章
     * @param article 单个文章对象
     */
    async add(article: Article) {
        const model = new this.articleModel(article);
        const result = await model.save();
        return result;
    }

    /**
     * 删除新闻文章
     * @param article 单个文章对象
     */
    async delete(article: Article) {
        const result = await this.articleModel.deleteOne(article);
        return result;
    }

   /**
    * 更新新闻文章
    * @param conditions 条件
    * @param article 更新后的内容
    */
    async update(conditions: Article, article: Article) {
        const result = await this.articleModel.updateOne(conditions, article);
        return result;
    }

    /**
     * 查询返回所有的文章
     * @param conditions 查询条件
     * @param fields 返回的字段
     */
    async findAll(conditions: Article = {}, fields?: string) {
        const result = await this.articleModel.find(conditions, fields).exec();
        return result;
    }

    /**
     * 分页查询的文章
     * @param conditions 查询条件
     * @param fields 返回的字段
     * @param skipnum 跳过数
     * @param pageSize 查询条数
     * @param sort 排序条件  {'field':-1}
     */
    async findByPage(conditions: Article = {}, skipnum, pageSize, sort, fields?: string) {
        const result = await this.articleModel.find(conditions, fields).skip(skipnum).limit(pageSize).sort(sort).exec();
        return result;
    }
}
