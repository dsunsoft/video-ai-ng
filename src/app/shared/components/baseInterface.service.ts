/**
 * 描述:访问数据库服务
 * @version:1.0.0
 * @author:  zb
 * @创建时间: 2019-01-10 14:45:28
 */
import { Observable } from 'rxjs';

export interface BaseInterfaceService {
    // restful api uri
    resourceUrl:any;
     
    /**
     * 根据查询条件查询列表
     * @param req 查询条件，包括分页、排序、关键字等
     */
    query(req?: any): Observable<any>;

    /**
     * 保存
     * @param params 传入需要创建的实例对象
     */
    save(params: any): Observable<any>;
    /** 
     * 创建
     * @param params 传入需要创建的实例对象
     */
    create(params: any): Observable<any>;

    /**
     * 更新
     * @param params 传入需要更新的实例对象
     */
    update(params: any): Observable<any>;

    /**
     * 根据id获取指定对象
     * @param id 查询id
     */
    find(id: string): Observable<any>;

     /**
     * 根据id删除指定对象
     * @param id 删除id
     */
    delete(id: string): Observable<any>;

    /**
     * 导出
     * @param req 
     */
    export(req?: any): Observable<any>;
   
}
