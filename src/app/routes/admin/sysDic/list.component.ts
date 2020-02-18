import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { SysDicService } from './sysDic.service';
import { DatePipe } from '@angular/common';
import { PAGE_SIZE, ST_PAGE } from '@shared';
import { SysDicListEditComponent } from './edit.component';
import { SysDicListEditValueComponent } from './editValue.component';

@Component({
  selector: 'app-sysdic-list',
  templateUrl: './list.component.html',
})
export class SysDicListComponent implements OnInit, OnDestroy {
  //字典类型查询
  query: any = {
    pageIndex: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    sorter: ''
  };
  //字典类型数据
  data: any[] = [];

  //键值查询
  queryDicValue: any = {
    sorter: ''
  };
  //当前选中的字典数据
  dataDicValue: any[] = [];
  loading = false;
  loadingDicValue = false;
  ST_PAGE: any = ST_PAGE;

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'id', type: 'radio' },
    {
      title: '类型', index: 'type'
      , sorter: (a: any, b: any) => true
    },
    {
      title: '描述', index: 'description'
      , sorter: (a: any, b: any) => true
    },
    {
      title: '操作',
      buttons: [
        {
          text: '修改',
          click: (item: any) => this.openEdit(item),
        },
        {
          text: '删除',
          click: (item: any) => this.del(item),
        },
        {
          text: '管理键值',
          click: (item: any) => { this.dictType = item; this.loadDicValue() },
        },
      ],
    },
  ];
  selectedRows: STData[] = [];

  dictType: any = {};

  @ViewChild('stDicValue')
  stDicValue: STComponent;
  columnsDicValue: STColumn[] = [
    { title: '', index: 'id', type: 'checkbox', width: '5%' },
    {
      title: '标签', index: 'label', width: '30%'
      , sorter: (a: any, b: any) => true
    },
    {
      title: '键值', index: 'value', width: '40%'
      , sorter: (a: any, b: any) => true
    },
    {
      title: '排序', index: 'sort', width: '10%'
      , sorter: (a: any, b: any) => true
    },
    {
      title: '操作', width: '15%',
      buttons: [
        {
          text: '修改',
          click: (item: any) => this.openEditDicValue(item),
        },
        {
          text: '删除',
          click: (item: any) => this.delDicValue(item),
        },
      ],
    },
  ];
  selectedRowsDicValue: STData[] = [];

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: ModalHelper,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private sysDicService: SysDicService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.load();
  }
  ngOnDestroy() {

  }

  openEdit(record: any = {}) {
    this.modal
      .createStatic(SysDicListEditComponent, { record }, { size: 800 })
      .subscribe(res => {
        if (record.id) {
          record = Object.assign(record, { id: 'id' }, res);
          this.st.reload();
        } else {
          this.load();
        }
        this.cdr.detectChanges();
      });
  }

  /**
   * 删除
   * @param item 
   */
  del(item?: any): void {
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '你确定要删除“' + (item ? item.description : '') + '”吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        this.sysDicService.delete(item.id).subscribe(res => {
          this.msg.success(`删除成功！`);
          this.load();
        });;
      }
    });
  }

  openEditDicValue(record: any = {}) {
    record.dictTypeId = this.dictType.id;
    this.modal
      .createStatic(SysDicListEditValueComponent, { record }, { size: 800 })
      .subscribe(res => {
        if (record.id) {
          record = Object.assign(record, { id: 'id' }, res);
          this.stDicValue.reload();
        } else {
          this.reLoadDicValue();
        }
        this.cdr.detectChanges();
      });
  }

  reLoadDicValue() {
    this.queryDicValue.pageIndex = 0;
    this.loadDicValue();
  }

  /**
   * 删除
   * @param item 
   */
  delDicValue(item?: any): void {
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '你确定要删除“' + (item ? item.label : '') + '”吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        this.sysDicService.deleteDicValue(item.id).subscribe(res => {
          this.msg.success(`删除成功！`)
          this.reLoadDicValue();
        });;
      }
    });
  }

  /**
   * 加载列表数据
   */
  load() {
    this.loading = true;
    this.sysDicService.query(
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
        if (this.data != null && this.data.length > 0) {
          this.selectedRows = [];
          this.selectedRows.push(this.data[0]);
          this.dictType = this.data[0];
          this.loadDicValue();
        }
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
      case 'click':
        this.selectedRows = [];
        this.selectedRows.push(e.click.item);
        this.dictType = e.click.item;
        this.loadDicValue();
        break;
    }
  }


  reset() {
    // wait form reset updated finished
    setTimeout(() => this.load());
  }

  /**
   * 加载列表数据
   */
  loadDicValue() {
    this.loadingDicValue = true;
    this.sysDicService.queryDicValue(
      {
        id: this.dictType.id,
        query: this.queryDicValue
      }
    ).pipe(
      map((res: any) => {
        return res.data;
      }
      ),
      tap(() => (this.loadingDicValue = false)),
    )
      .subscribe(res => {
        this.dataDicValue = res;
        this.cdr.detectChanges();
      });
  }

  stChangeDicValue(e: STChange) {
    switch (e.type) {
      case 'radio':
        this.selectedRowsDicValue = [];
        this.selectedRowsDicValue.push(e.radio);
        this.cdr.detectChanges();
        break;
      case 'checkbox':
        this.selectedRowsDicValue = e.checkbox;
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.load();
        break;
      case 'sort':
        this.queryDicValue.orderBy = e.sort.column.indexKey + ' ' + (e.sort.value == 'descend' ? 'desc' : 'asc');
        this.load();
        break;
      case 'pi':
        this.queryDicValue.pageIndex = e.pi;
        this.load();
        break;
      case 'ps':
        this.queryDicValue.pageSize = e.ps;
        this.load();
        break;
    }
  }


  resetDicValue() {
    // wait form reset updated finished
    setTimeout(() => this.loadDicValue());
  }
}

