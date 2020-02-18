/**
 * 描述:[systemuser][]访问数据库服务
 * @version:1.0.0
 * @author:  x
 * @创建时间: 2019-01-10 14:45:28
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_URL } from '../../../app.constants';

@Injectable()
export class SysDicService {
    // restful api uri
    private resourceUrl = `${API_URL}/video-ai/sysDict`;

    constructor( public http: _HttpClient) { }

    /**
     * 创建
     * @param SysUser 传入需要创建的实例对象
     */
    create(SysUser: any): Observable<any> {
        return this.http.post(this.resourceUrl, SysUser);
    }


     /**
     * 添加  和 修改
     * @param Seller 传入需要更新的实例对象
     */
    save(dic: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/saveType`, dic);
    }
     /**
     * 添加  和 修改
     * @param Seller 传入需要更新的实例对象
     */
    saveValue(dic: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/saveValue`, dic);
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
        let body:any = req.query || {};
        // Object.keys(body).map(ele => {
        //     if(body[ele] == null) {
        //         body[ele] = '';
        //     }
        // });
        return this.http.post(`${this.resourceUrl}/getType`, body);
    }
    /**
     * 根据查询条件查询列表
     * @param req 查询条件，包括分页、排序、关键字等
     */
    queryDicValue(req?: any): Observable<any> {
        let body = req.query || {};
        Object.keys(body).map(ele => {
            if(body[ele] == null) {
                body[ele] = '';
            }
        });
        return this.http.get(`${this.resourceUrl}/listValue/${req.id}`, body);
    }

    /**
     * 根据id删除指定对象
     * @param id 删除id
     */
    delete(id: string): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/deleteType/${id}`);
    }
    /**
     * 根据id删除指定对象
     * @param id 删除id
     */
    deleteDicValue(id: string): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/deleteValue/${id}`);
    }
}
