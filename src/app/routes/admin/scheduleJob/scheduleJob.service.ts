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
export class ScheduleJobService {
    // restful api uri
    private resourceUrl = `${API_URL}/video-ai/scheduleJob`;

    constructor( public http: _HttpClient) { }

    saveRoleMenu(SysRole: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/roleMenu`, SysRole);
    }

    /**
     * 保存
     * @param scheduleJob 传入需要创建的实例对象
     */
    save(scheduleJob: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/save`, scheduleJob);
    }
    /**
     * 暂停
     * @param scheduleJob 传入需要创建的实例对象
     */
    pause(scheduleJob: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/pause`, scheduleJob, scheduleJob);
    }

    /**
     * @param scheduleJob 传入需要更新的实例对象
     */
    startNow(scheduleJob: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/startNow`, scheduleJob, scheduleJob);
    }
    /**
     * @param scheduleJob 传入需要更新的实例对象
     */
    resume(scheduleJob: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/resume`, scheduleJob, scheduleJob);
    }

    
    /**
     * 根据id获取指定对象
     * @param id 查询id
     */
    find(id: string): Observable<any> {
        return this.http.get(`${this.resourceUrl}/get/${id}`);
    }

    /**
     * 根据查询条件查询列表
     * @param req 查询条件，包括分页、排序、关键字等
     */
    query(req?: any): Observable<any> {
        let body = req.query || {};
        return this.http.post(`${this.resourceUrl}/get`, body);
    }
    /**
     * 根据id删除指定对象
     * @param id 删除id
     */
    delete(id: string): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }
}
