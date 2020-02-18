/**
 * 描述:[water_quality_range][水质指标正常范围]表的列表组件
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { WaterQualityRangeService } from './waterQualityRange.service';
import { DatePipe } from '@angular/common';
import { WaterQualityRangeEditComponent } from './edit.component';
import { PAGE_SIZE, ST_PAGE, WATER_QUALITY_RANGE_TYPE } from '@shared';

@Component({
  selector: 'app-waterQualityRange-list',
  templateUrl: './list.component.html',
})
export class WaterQualityRangeListComponent implements OnInit, OnDestroy {

  query: any = {
    pageIndex: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    sorter: '',
  };
  data: any[] = [];
  loading = true;
  ST_PAGE: any = ST_PAGE;
  WATER_QUALITY_RANGE_TYPE: any[] = WATER_QUALITY_RANGE_TYPE;
  selectedRows: STData[] = [];

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: ModalHelper,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private waterQualityRangeService: WaterQualityRangeService,
    private cdr: ChangeDetectorRef
  ) { }

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    {
      title: '指标编码', index: 'code'
      , sort: true
    },
    {
      title: '指标名称', index: 'name'
      , sort: true
    },
    {
      title: '指标单位', index: 'unit'
      , sort: true
    },
    {
      title: '指标正常范围类型', index: 'rangeType', render: 'rangeType'
      , sort: true
    },
    {
      title: '最小值', index: 'min'
      , sort: true
    },
    {
      title: '最大值', index: 'max'
      , sort: true
    },
    {
      title: '其他', index: 'other'
      , sort: true
    },
    {
      title: '备注信息', index: 'remarks'
      , sort: true
    },
    {
      title: '预警记录数', index: 'warningCount'
      , sort: true
    },
    {
      title: '操作',
      buttons: [
        {
          text: '修改',
          click: (item: any) => this.edit(item),
        },
        {
          text: '删除',
          click: (item: any) => this.del(item),
        }
      ]
    }
  ];

  /**
   * 修改
   * @param item 
   */
  edit(item) {
    this.waterQualityRangeService.find(item.id).subscribe(res => {
      if (res.code == 200) {
        let waterQualityRange = res.data;
        this.modal
          .createStatic(WaterQualityRangeEditComponent, { waterQualityRange }, { size: 800 })
          .subscribe(res => {
            this.load();
          });
      }
      else {
        this.msg.error(`未获取到数据！`)
      }
    });
  }

  /**
   * 删除
   * @param item 
   */
  del(item) {
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '你确定要删除“' + (item ? item.id : '') + '”吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        if (item.id == null || item.id == '0') {
          this.msg.error(`ID不能为空！`)
        }
        else {
          this.waterQualityRangeService.delete(item.id).subscribe(res => {
            if (res.code == 200) {
              this.msg.success(`删除成功！`)
              this.load();
            }
            else {
              this.msg.error(`删除失败！`)
            }
          });
        }
      }
    });
  }
  /**
   * 新增
   * @param item 
   */
  add() {
    let waterQualityRange: any = {};
    this.modal
      .createStatic(WaterQualityRangeEditComponent, { waterQualityRange }, { size: 800 })
      .subscribe(res => {
        this.load();
      });
  }


  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {

  }

  load() {
    this.loading = true;
    this.waterQualityRangeService.query(
      {
        query: this.query
      }
    )
      .pipe(
        map((res: any) => {
          res.data.list.forEach(i => {
            const statusItem = this.WATER_QUALITY_RANGE_TYPE.find(p => p.value == i.rangeType);
            i.statusText = statusItem ? statusItem.text : '';
            i.statusType = statusItem ? statusItem.type : 'default';
          })
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
