/**
 * 描述:访问数据库服务
 * @version:1.0.0
 * @author:  zb
 * @创建时间: 2019-01-10 14:45:28
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';
import { BaseInterfaceService } from './baseInterface.service';

@Injectable()
export class BaseService implements BaseInterfaceService {
    // restful api uri
    resourceUrl = `${API_URL}/video-ai/`;

    constructor(public http: _HttpClient) { }

    /**
     * 保存
     * @param params 传入需要创建的实例对象
     */
    save(params: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/save`, params);
    }

    /** 
     * 创建
     * @param params 传入需要创建的实例对象
     */
    create(params: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/add`, params);
    }

    /**
     * 更新
     * @param params 传入需要更新的实例对象
     */
    update(params: any): Observable<any> {
        return this.http.put(`${this.resourceUrl}/update`, params);
    }

    /**
     * 根据id获取指定对象
     * @param id 查询id
     */
    find(id: string): Observable<any> {
        return this.http.get(`${this.resourceUrl}/get/${id}`);
    }

    /**
    * 根据id删除指定对象
    * @param id 删除id
    */
    delete(id: string): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/delete/${id}`);
    }

    /**
     * 根据查询条件查询列表
     * @param req 查询条件，包括分页、排序、关键字等
     */
    query(req?: any): Observable<any> {
        let body = req.query || {};
        //过滤为null值的条件
        for (const key in body) {
            if (null == body[key]) {
                body[key] = '';
            }
        }
        return this.http.get(`${this.resourceUrl}/get`, body);
    }

    /**
   * 根据查询条件查询列表
   * @param req 查询条件，包括分页、排序、关键字等
   */
    queryPost(req?: any): Observable<any> {
        let body = req.query || {};
        return this.http.post(`${this.resourceUrl}/get`, body);
    }

    /**
     * 导出
     * @param req 
     */
    export(req?: any): Observable<any> {
        let body = req.query || {};
        let options: any = {
            responseType: 'blob'
        };
        return this.http.post(`${this.resourceUrl}/export`, body, {}, options);
    }
    /**
     * 导出明细
     * @param req 
     */
    exportDetail(req?: any): Observable<any> {
        let body = req.query || {};
        let options: any = {
            responseType: 'blob'
        };
        return this.http.post(`${this.resourceUrl}/export/detail`, body, {}, options);
    }
}
