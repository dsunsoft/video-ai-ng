/**
 * 描述:[order][]访问数据库服务
 * @version:1.0.0
 * @author:  x
 * @创建时间: 2019-01-10 14:45:28
 */
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_URL } from '../../../app.constants';

@Injectable()
export class SysLogService {
    // restful api uri
    private resourceUrl = `${API_URL}/video-ai/sysLog`;

    constructor(public http: _HttpClient) { }
    /**
     * 根据查询条件查询列表
     * @param req 查询条件，包括分页、排序、关键字等
     */
    query(req?: any): Observable<any> {
        let body = req.query || {};
        return this.http.post(`${this.resourceUrl}/get`, body);
    }

    delete(id:any): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/delete/${id}`);
    }

    empty(req?:any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/empty`,req);
    }
 
}
