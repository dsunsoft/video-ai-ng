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
export class SysRoleService {
    // restful api uri
    private resourceUrl = `${API_URL}/video-ai/sysRole`;

    constructor( public http: _HttpClient) { }

    saveRoleMenu(SysRole: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/roleMenu`, SysRole);
    }

    /**
     * 创建
     * @param SysUser 传入需要创建的实例对象
     */
    create(SysUser: any): Observable<any> {
        return this.http.post(this.resourceUrl, SysUser);
    }

    /**
     * 更新
     * @param SysUser 传入需要更新的实例对象
     */
    update(SysUser: any): Observable<any> {
        return this.http.put(this.resourceUrl, SysUser);
    }

    updateRole(SysUser: any): Observable<any> {
        return this.http.put(`${this.resourceUrl}/updateRole`, SysUser);
    }
    
    /**
     * 根据id获取指定对象
     * @param id 查询id
     */
    find(id: string): Observable<any> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    loadRoles(SysUser: any): Observable<any> {
        return this.http.post(`${this.resourceUrl}/loadRoles`, SysUser);
    }
    /**
     * 根据查询条件查询列表
     * @param req 查询条件，包括分页、排序、关键字等
     */
    query(req?: any): Observable<any> {
        let body = req.query || {};
        return this.http.post(`${this.resourceUrl}/page`, body);
    }
    // query(req?: any): Observable<any> {
    //     let body = req.query || {};
    //     let options: any = {
    //         //headers里面值必须穿字符串，number类型传不了
    //         headers: new HttpHeaders(
    //             {
    //                 pageIndex: req.page?req.page+'':'',
    //                 pageSize: req.size?req.size+'':'',
    //                 orderBy: req.sortBy?req.sortBy+'':''
    //             }
    //         )
    //     };
    //     return this.http.post(`${this.resourceUrl}/get`, body, {}, options);
    // }

    /**
     * 根据id删除指定对象
     * @param id 删除id
     */
    delete(id: string): Observable<any> {
        let params:any = {
            body:{
                roleId: id
            }
        };
        return this.http.request('DELETE',this.resourceUrl, params );
    }
}
