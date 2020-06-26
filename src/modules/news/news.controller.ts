import { Controller, Post, Get, Query, Body, UseGuards, Put, Param, Delete, ParseIntPipe, Render, Res } from '@nestjs/common';
import { NewsService } from './news.service';
import { AuthGuard } from '@nestjs/passport';
import { AddArticleDto } from './dtos/add-article.dto';
import { FindNewsDto } from './dtos/find-news.dto';
import { UpdateArticleDto } from './dtos/update-article.dto';
import { HttpClientService } from '../comm/services/http-client/http-client.service';
import { ApiTags } from '@nestjs/swagger';
/**
 * 新闻模块，此模块为演示模块，演示增删改查、模板渲染引擎、HTTP Service
 */
@ApiTags('新闻演示模块')
@Controller('news')
export class NewsController {

    constructor(private readonly newsService: NewsService, private httpClientService: HttpClientService) {

    }

    /**
     * 新增新闻
     */
    @Post()
    @UseGuards(AuthGuard()) // 此接口需要认证
    async doAdd(@Body() body: AddArticleDto) {
        const result = await this.newsService.add(body);
        return result;
    }

    /**
     * 删除新闻
     */
    @Delete(':id')
    @UseGuards(AuthGuard()) // 此接口需要认证
    async doDelete(@Param('id') id: string) {
        const result = await this.newsService.delete({ _id: id });
        return result;
    }

    /**
     * 更新新闻
     */
    @Put(':id') // 数据新闻主键
    @UseGuards(AuthGuard()) // 此接口需要认证
    async doUpdate(@Param('id') id: string, @Body() body: UpdateArticleDto) {
        const result = await this.newsService.update({
            _id: id,
        }, body);
        return result;
    }

    /**
     * 分页获取新闻数据
     * @param pageSize 一次查询数据条数
     * @param currentPage 从第几页查
     * @param condition  条件
     */
    @Get(':pageSize/:currentPage')
    // @UseGuards(AuthGuard()) // 此接口需要认证
    async getListByPage(@Param('pageSize', new ParseIntPipe()) pageSize, @Param('currentPage', new ParseIntPipe()) currentPage, // 使用内置的转换整数的管道
                        @Query() condition: FindNewsDto) {
        const sort = { createTime: -1 };        // 排序（按登录时间倒序）
        const skipnum = (currentPage - 1) * pageSize;   // 跳过数
        const queryParam = {};
        const keywords = condition.keywords;
        if (keywords) {
            Object.assign(queryParam, { keywords: { $regex: new RegExp(keywords) } });
        }
        // 下边继续可以增加新的参数
        // if (xxx) {
        //     Object.assign(queryParam, { xxx: { $regex: new RegExp(xxx) } });
        // }
        const result = await this.newsService.findByPage(queryParam, skipnum, pageSize, sort);
        return result;
    }

    /**
     * 模板引擎渲染示例
     * @param res express Res
     */
    @Get('page')
    // @Render('index')
    async index(@Res() res) {
        const newsList = await this.newsService.findAll();
        res.render('index', { newsList });
    }

    /**
     * 调取取HTTP service示例
     * @param query 参数
     */
    @Get('foo')
    async foo(@Query() query) {
        // 这里配置的地址为演示地址，实际需要使用配置的变量
        return this.httpClientService.get<string>('https://api.github.com/users/januwA', query);
    }

    /**
     * 调取取HTTP service示例
     * @param query 参数
     */
    @Get('bar')
    async bar(@Query() query) {
        // 这里配置的地址为演示地址，实际需要使用配置的变量
        return this.httpClientService.post<string>('http://localhost:3000/thsapp/auth/login', query);
    }
}
