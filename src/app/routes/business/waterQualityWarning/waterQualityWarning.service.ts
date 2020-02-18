/**
 * 描述:[water_quality_warning][水质超指标预警详细记录]访问数据库服务
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable()
export class WaterQualityWarningService {
    // restful api uri
    private resourceUrl = `${environment.API_URL}/video-ai/waterQualityWarning`;

    constructor( public http: _HttpClient) { }

    /**
     * 创建
     * @param waterQualityWarning 传入需要创建的实例对象
     */
    create(waterQualityWarning: any): Observable<any> {
        return this.http.post(this.resourceUrl, waterQualityWarning);
    }

    /**
     * 更新
     * @param waterQualityWarning 传入需要更新的实例对象
     */
    update(waterQualityWarning: any): Observable<any> {
        return this.http.put(this.resourceUrl, waterQualityWarning);
    }

    
    /**
     * 根据id获取指定对象
     * @param id 查询id
     */
    find(id: string): Observable<any> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    /**
     * 根据查询条件查询列表
     * @param req 查询条件，包括分页、排序、关键字等
     */
    query(req?: any): Observable<any> {
        let body = req.query || {};
        return this.http.post(`${this.resourceUrl}/page`, body);
    }
    

    /**
     * 根据id删除指定对象
     * @param id 删除id
     */
    delete(id: string): Observable<any> {
        let params:any = {
            body:{
                id: id
            }
        };
        return this.http.request('DELETE',this.resourceUrl, params );
    }
}
