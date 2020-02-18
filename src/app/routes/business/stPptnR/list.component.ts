/**
 * 描述:[ST_PPTN_R][降水量表]表的列表组件
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { StPptnRService } from './stPptnR.service';
import { DatePipe } from '@angular/common';
import { PAGE_SIZE, ST_PAGE } from '@shared';

@Component({
  selector: 'app-stPptnR-list',
  templateUrl: './list.component.html',
})
export class StPptnRListComponent implements OnInit, OnDestroy {

  query: any = {
    pageIndex: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    sorter: '',
  };
  data: any[] = [];
  loading = true;
  ST_PAGE: any = ST_PAGE;
  selectedRows: STData[] = [];

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: ModalHelper,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private stPptnRService: StPptnRService,
    private cdr: ChangeDetectorRef
  ) { }

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    {
      title: '测站编码', index: 'stcd'
      , sort: true
    },
    {
      title: '测站名称', index: 'stnm'
      , sort: true
    },
    {
      title: '时间', index: 'tm'
      , format: (item: any) => item.tm ? this.datePipe.transform(item.tm, 'yyyy-MM-dd HH:mm:ss') : ''
      , sort: true
    },
    {
      title: '时段降水量(mm)', index: 'drp'
      , sort: true
    },
    {
      title: '时段长(h)', index: 'intv'
      , sort: true
    },
    {
      title: '降水历时', index: 'pdr'
      , sort: true
    },
    {
      title: '日降水量(mm)', index: 'dyp'
      , sort: true
    },
    {
      title: '天气状况', index: 'wth'
      , sort: true
    }
  ];

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {

  }

  load() {
    this.loading = true;
    this.stPptnRService.query(
      {
        query: this.query
      }
    )
      .pipe(
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

  reset() {
    this.query.pageIndex = 1;
    // wait form reset updated finished
    setTimeout(() => this.load());
  }

}
