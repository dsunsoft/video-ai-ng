/**
 * 设备管理
 * @zb
 * 2019-03-14 11:43
 */
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { DeviceService } from './device.service';
import { DatePipe } from '@angular/common';
import { DeviceEditComponent } from './edit.component';
import { PAGE_SIZE, ST_PAGE, DEVICE_TYPE } from '@shared';

@Component({
  selector: 'app-device-list',
  templateUrl: './list.component.html',
})
export class DeviceListComponent implements OnInit, OnDestroy {

  query: any = {
    pageIndex: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    sorter: '',
  };
  data: any[] = [];
  loading = false;
  ST_PAGE: any = ST_PAGE;
  DEVICE_TYPE: any = DEVICE_TYPE;
  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'id', type: 'checkbox' },
    {
      title: '设备编号', index: 'deviceNo'
      ,sort: true
    },
    {
      title: '设备名称', index: 'deviceName'
      ,sort: true
    },
    {
      title: '设备类型', index: 'deviceType', render:'deviceType'
      ,sort: true
    },
    {
      title: '最近连接时间', index: 'connDate'
      ,format: (item: any) => item.connDate ? this.datePipe.transform(item.connDate, 'yyyy-MM-dd HH:mm:ss') : ''
      ,sort: true
    },
    {
      title: '设备IP', index: 'deviceIP'
      ,sort: true
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
      ],
    },
  ];
  selectedRows: STData[] = [];

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: ModalHelper,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private deviceService: DeviceService,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * 修改
   * @param item 
   */
  edit(item) {
    this.deviceService.find(item.id).subscribe(res => {
      if (res.code == 200) {
        let device = res.data;
        this.modal
          .createStatic(DeviceEditComponent, { device }, { size: 800 })
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
      nzContent: '你确定要删除“' + (item ? item.deviceName : '') + '”吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        if (item.id == null || item.id == '0') {
          this.msg.error(`角色ID不能为空！`)
        }
        else {
          this.deviceService.delete(item.id).subscribe(res => {
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
    let device: any = {};
    this.modal
      .createStatic(DeviceEditComponent, { device }, { size: 800 })
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
    this.deviceService.query(
      {
        query: this.query
      }
    )
      .pipe(
        map((res: any) => {
          res.data.list.forEach(i => {
            const deviceTypeItem = this.DEVICE_TYPE.find(p => p.value == i.deviceType);
            i.deviceTypeText = deviceTypeItem ? deviceTypeItem.text : '';
            i.deviceTypeType = deviceTypeItem ? deviceTypeItem.type : 'default';
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



