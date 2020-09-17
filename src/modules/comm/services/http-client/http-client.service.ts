import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
/**
 * 向外部服务接口发送服务
 */
@Injectable()
export class HttpClientService {
    constructor(private readonly httpService: HttpService) {

    }

    /**
     * get 方法
     * @param url 请求地址
     * @param param 请求参数
     */
    get<T>(url: string, param?: any): Promise<T> {
        url = `${url}${this.getHttpParams(param)}`;
        return this.httpService.get(url).pipe(map(response => response.data)).toPromise();
    }

    /**
     * post 方法
     * @param url 请求地址
     * @param param  请求参数 格式 {x:1,y:2}
     */
    post<T>(url: string, param?: any): Promise<T> {
        return this.httpService.post(url, param).pipe(map(response => response.data)).toPromise();
    }

    /**
     * 参数处理
     * @param param 调用函数传过来的参数，键值对形式
     */
    getHttpParams(param: Map<any, any>): string {
        let paramUrl = '';
        if (param) {
            paramUrl = '?';
            for (const key in param) {
                if (param[key]) {
                    paramUrl = `${paramUrl}&${key}=${param[key]}`;
                }
            }
        }
        return paramUrl;
    }
}
