import {
    Injectable,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T> {
    data: T;
}

/**
 * 返回数据结果进行格式转换
 */
@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map(data => {
                return {
                    data,
                    code: 0,
                    message: '请求成功',
                };
            }),
        );
    }
}
