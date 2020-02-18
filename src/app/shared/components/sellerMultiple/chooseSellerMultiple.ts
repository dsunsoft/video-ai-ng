import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService, NzModalRef, NzTreeNode } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { DatePipe } from '@angular/common';
import { API_URL } from '../../../app.constants';
import { PAGE_SIZE, ST_PAGE } from '../../contants/common.constants';

@Component({
  selector: 'app-shared-chooseSellerMultiple',
  styles: [`
  .active {
    background: #1890FF;
    color: #fff;
  }
  `],
  templateUrl: './chooseSellerMultiple.html',
})
export class ChooseSellerMultipleComponent implements OnInit, OnDestroy {
  query: any = {
    pageIndex: 1,
    pageSize: 10,
    total: 0,
  };
  data: any[] = [];
  loading = false;

  ST_PAGE: any = ST_PAGE;

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '选择', index: 'sellerId', type: 'checkbox',width:'5%' },
    {
      title: '客户编码', index: 'sellerCode',width:'10%'
      ,sort: true
    },
    {
      title: '客户名称', index: 'sellerName',width:'20%'
      ,sort: true
    },
    {
      title: '签约日期', index: 'signDate',width:'12%'
      , format: (item: any) => item.signDate ? this.datePipe.transform(item.signDate, 'yyyy-MM-dd') : ''
      ,sort: true
    },
    {
      title: '联系人', index: 'linkman',width:'12%'
      ,sort: true
    },
    {
      title: '电话', index: 'phone',width:'12%'
      ,sort: true
    }
  ];
  selectedRows: STData[] = [];
  resourceOrgUrl: string = `${API_URL}/video-ai/sellerOrg`;
  resourceUrl: string = `${API_URL}/video-ai/seller`;

  @ViewChild('nzTree')
  private nzTree: any;

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: NzModalRef,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef
  ) { }

  /**
    * 获取客户组 Tree
    */
  getStoreOrg(): Observable<any> {
    return this.http.get(`${this.resourceOrgUrl}/getTree`, {});
  }

  queryList(req?: any): Observable<any> {
    let body = req.query || {};
    return this.http.post(`${this.resourceUrl}/get`, body);
  }

  ngOnInit() {
    this.load();
  }
 
  ngOnDestroy() {

  }
  sellerOrgChange(e){
    this.query.orgId = e;
    this.load();
  }
  /**
   * 加载列表数据
   */
  load() {
    this.loading = true;
    this.query.pageSize = 10;
    this.queryList(
      {
        query: this.query
      }
    ).pipe(
      map((res: any) => {
        return res.data;
      }
      ),
      tap(() => (this.loading = false)),
    )
      .subscribe(res => {
        this.data = res.list;
        this.query.total = res.total;
        this.cdr.detectChanges();
      });
  }

  activeNode(e:any){ 
    this.query.orgId =  e.keys[0] == '-1'?'':e.keys[0];
    this.load();
  }

  stChange(e: STChange) {
    switch (e.type) {
      case 'radio':
        this.selectedRows = [];
        this.selectedRows.push(e.radio);
        this.cdr.detectChanges();
        break;
      case 'checkbox':
        this.selectedRows = e.checkbox;
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.load();
        break;
      case 'sort':
        this.query.orderBy = e.sort.column.indexKey + ' ' + (e.sort.value == 'descend' ? 'desc' : 'asc');
        this.load();
        break;
      case 'pi':
        this.query.pageIndex = e.pi;
        this.load();
        break;
      case 'ps':
        this.query.pageSize = e.ps;
        this.load();
        break;
    }
  }

  /**
   * 提交
   */
  submit() {
    if (this.selectedRows == null || (this.selectedRows != null && this.selectedRows.length == 0)) {
      this.msg.error("请选择");
      return;
    }
    this.modal.close(this.selectedRows);
  }

  close() {
    this.modal.destroy();
  }

  reset(){
      this.load();
  }





}

