/**
 * 描述:[ST_RIVER_R][河道水情表]表的列表组件
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { StRiverRService } from './stRiverR.service';
import { DatePipe } from '@angular/common';
import { PAGE_SIZE, ST_PAGE } from '@shared';

@Component({
  selector: 'app-stRiverR-list',
  templateUrl: './list.component.html',
})
export class StRiverRListComponent implements OnInit, OnDestroy {

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
    private stRiverRService: StRiverRService,
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
      title: '水位(m)', index: 'z'
      , sort: true
    },
    {
      title: '流量(m3/s)', index: 'q'
      , sort: true
    },
    {
      title: '断面过水面积(m2)', index: 'xsa'
      , sort: true
    },
    {
      title: '断面平均流速(m/s)', index: 'xsavv'
      , sort: true
    }
    ,{
      title: '断面最大流速(m/s)', index: 'xsmxv'
      , sort: true
    }
    ,{
      title: '河水特征码', index: 'flwchrcd'
      , sort: true
    }
    ,{
      title: '水势', index: 'wptn'
      , sort: true
    }
    ,{
      title: '测流方法', index: 'msqmt'
      , sort: true
    }
    ,{
      title: '测积方法', index: 'msamt'
      , sort: true
    }
    ,{
      title: '测速方法', index: 'msvmt'
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
    this.stRiverRService.query(
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
