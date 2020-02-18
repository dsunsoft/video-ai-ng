import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService, NzTreeNode, UploadFile, UploadFilter } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { SysLogService } from './sysLog.service';
import { DatePipe } from '@angular/common';
import { PAGE_SIZE, ST_PAGE, cutStr } from '@shared';

@Component({
  selector: 'app-sysLog-list',
  templateUrl: './list.component.html',
})
export class SysLogListComponent implements OnInit, OnDestroy {
  query: any = {
    pageIndex: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    sorter: '',
  };
  data: any[] = [];
  loading = false;
  ST_PAGE = ST_PAGE;
  scroll = { x: "1800px", y: "550px" };
  showEx = false;

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '序号', index: 'id', type: 'no', width: '2%' },
    {
      title: '操作菜单', index: 'title', width: '10%'
      , sort: true
    },
    {
      title: '操作用户', index: 'operBy', width: '6%'
      , sort: true
    },
    {
      title: '所在公司', index: 'operCompanyName', width: '6%'
      , sort: true
    },
    {
      title: 'URI', index: 'requestUri', width: '18%'
      , sort: true
    },
    {
      title: '提交方式', index: 'method', width: '6%'
      , sort: true
    },
    {
      title: '操作者IP', index: 'remoteAddr', width: '10%'
      , sort: true,
    },
    {
      title: '操作时间', index: 'createDate', width: '10%', format: (item: any) => item.createDate ? this.datePipe.transform(item.createDate, 'yyyy-MM-dd HH:mm:ss') : ''
      , sort: true
    },
    {
      title: '异常信息', index: 'exception', render: 'exception', width: '15%'
      , sort: true,
    },
  ];
  selectedRows: STData[] = [];

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: ModalHelper,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private sysLogService: SysLogService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {

  }

  /**
   * 加载列表数据
   */
  load() {
    if (this.showEx) {
      this.query.type = 2;
    } else {
      this.query.type = 1;
    }
    this.loading = true;
    this.sysLogService.query(
      {
        query: this.query
      }
    ).pipe(
      map((res: any) => {
        res.data.list.forEach(i => {
          i.longException = i.exception;
          i.exception = cutStr(i.exception, 20);
        })
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

  /**
   * 重置
   */
  reset() {
    // wait form reset updated finished
    setTimeout(() => this.load());
  }

  delete(item: any) {
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '你确定要删除操作记录:“' + (item ? item.title : '') + '”吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        this.sysLogService.delete(item.id).subscribe(res => {
          if (res.code == 200) {
            this.msg.success(`删除成功！`);
            this.load();
          }
          else {
            this.msg.error(res.message);
          }
        });
      }
    });
  }
}

