import { Injectable } from '@nestjs/common';
import { Uuid, UuidOptions } from 'node-ts-uuid';
import { format } from 'silly-datetime';

/**
 * 公共得工具方法
 */
@Injectable()
export class CommUtilsService {

    /**
     * 生成UUID
     * @param length UUID 长度
     * @param prefix 前缀
     */
    getUuid(length = 20, prefix?: string): string {
        const options: UuidOptions = {
            length,
            prefix,
        };
        const uuid: string = Uuid.generate(options);
        return uuid;
    }

    /**
     * 截取字符串
     * @param str 源字符串
     * @param start 开始位置
     * @param end 结束位置
     */
    substring(str: string, start: number, end: number) {
        if (end) {
            return str.substring(start, end);
        } else {
            return str.substring(start);
        }
    }

    /**
     * 格式化日期
     * @param parmas 时间戳 13 位的时间戳
     */
    formatTime(parmas: number, formatStr = 'YYYY-MM-DDHH:mm') {
        return format(new Date(parmas), formatStr);
    }

    /**
     * 日期对象转为日期字符串
     * @param date 需要格式化的日期对象
     * @param sFormat 输出格式,默认为yyyy-MM-dd                         年：y，月：M，日：d，时：h，分：m，秒：s
     * @example  dateFormat(new Date())                                12017-02-281
     * @example  dateFormat(new Date(),'yyyy-MM-dd')                   12017-02-281
     * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         12017-02-28 09:24:001
     * @example  dateFormat(new Date(),'hh:mm')                       109:241
     * @example  dateFormat(new Date(),'yyyy-MM-ddThh:mm:ss+08:00')   12017-02-28T09:24:00+08:001
     */
    public dateFormat(date: Date, sFormat: string = 'yyyy-MM-dd'): string {

        const time = {
            Year: 0,
            TYear: '0',
            Month: 0,
            TMonth: '0',
            Day: 0,
            TDay: '0',
            Hour: 0,
            THour: '0',
            hour: 0,
            Thour: '0',
            Minute: 0,
            TMinute: '0',
            Second: 0,
            TSecond: '0',
            Millisecond: 0,
        };
        time.Year = date.getFullYear();
        time.TYear = String(time.Year).substr(2);
        time.Month = date.getMonth() + 1;
        time.TMonth = time.Month < 10 ? '0' + time.Month : String(time.Month);
        time.Day = date.getDate();
        time.TDay = time.Day < 10 ? '0' + time.Day : String(time.Day);
        time.Hour = date.getHours();
        time.THour = time.Hour < 10 ? '0' + time.Hour : String(time.Hour);
        time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
        time.Thour = time.hour < 10 ? '0' + time.hour : String(time.hour);
        time.Minute = date.getMinutes();
        time.TMinute = time.Minute < 10 ? '0' + time.Minute : String(time.Minute);
        time.Second = date.getSeconds();
        time.TSecond = time.Second < 10 ? '0' + time.Second : String(time.Second);
        time.Millisecond = date.getMilliseconds();

        return sFormat.replace(/yyyy/ig, String(time.Year))
            .replace(/yyy/ig, String(time.Year))
            .replace(/yy/ig, time.TYear)
            .replace(/y/ig, time.TYear)
            .replace(/MM/g, time.TMonth)
            .replace(/M/g, String(time.Month))
            .replace(/dd/ig, time.TDay)
            .replace(/d/ig, String(time.Day))
            .replace(/HH/g, time.THour)
            .replace(/H/g, String(time.Hour))
            .replace(/hh/g, time.Thour)
            .replace(/h/g, String(time.hour))
            .replace(/mm/g, time.TMinute)
            .replace(/m/g, String(time.Minute))
            .replace(/ss/ig, time.TSecond)
            .replace(/s/ig, String(time.Second))
            .replace(/fff/ig, String(time.Millisecond));
    }

}
