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
  selector: 'app-shared-chooseUser',
  styles: [`
  .active {
    background: #1890FF;
    color: #fff;
  }
  `],
  templateUrl: './chooseUser.html',
})
export class ChooseUserComponent implements OnInit, OnDestroy {
  private resourceUrl = `${API_URL}/video-ai/sysUser`;

  query: any = {
    pageIndex: 0,
    pageSize: 10,
    sorter: '',
    total: 0,
  };
  data: any[] = [];
  loading = false;
  ST_PAGE = ST_PAGE;

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'id', type: 'radio', width: '4%' },
    {
      title: '登录名', index: 'loginName', width: '12%'
      , sort: true
    },
    {
      title: '姓名', index: 'name', width: '10%'
      , sort: true
    },
    {
      title: '电话', index: 'phone', width: '10%'
      , sort: true
    },
    {
      title: '手机', index: 'mobile', width: '10%'
      , sort: true
    },
    {
      title: '归属公司', index: 'company.name', width: '15%'
      , sort: true
    },
    {
      title: '归属部门', index: 'office.name', width: '15%'
      , sort: true
    },

  ];
  selectedRows: STData = [];
  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: ModalHelper,
    private mmodalr: NzModalRef,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.load();
  }
  ngOnDestroy() {

  }
  sortChange(e) {
  }

  /**
   * 加载列表数据
   */
  load() {
    this.loading = true;
    this.queryList({ query: this.query }).pipe(
      map((res: any) => {
        return res;
      }
      ),
      tap(() => (this.loading = false)),
    )
      .subscribe(res => {
        this.data = res.data.list;
        this.query.total = res.data.total;
        this.cdr.detectChanges();
      });
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

  queryList(req?: any): Observable<any> {
    let body = req.query || {};
    return this.http.post(`${this.resourceUrl}/get`, body);
  }

  reset() {
    setTimeout(() => this.load());
  }

  close() {
    this.mmodalr.destroy();
  }

  save() {
    this.mmodalr.close(this.selectedRows);
  }
}

