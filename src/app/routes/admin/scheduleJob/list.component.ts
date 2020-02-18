/**
 * 定时任务管理
 * @zb
 * 2019-03-14 11:43
 */
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { ScheduleJobService } from './scheduleJob.service';
import { DatePipe } from '@angular/common';
import { ScheduleJobEditComponent } from './edit.component';
import { PAGE_SIZE, ST_PAGE, ChooseMenuComponent } from '@shared';

@Component({
  selector: 'app-scheduleJob-list',
  templateUrl: './list.component.html',
})
export class ScheduleJobListComponent implements OnInit, OnDestroy {

  query: any = {
    pageIndex: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    sorter: '',
  };
  data: any[] = [];
  loading = false;
  ST_PAGE: any = ST_PAGE;
  status = [
    { index: 0, text: '启用', value: '1', type: 'success', checked: false },
    { index: 1, text: '停用', value: '0', type: 'error', checked: false },
  ];
  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'id', type: 'radio', width: '3%' },
    {
      title: '任务名称', index: 'name', width: '12%'
      ,sort: true
    },
    // {
    //   title: '任务组', index: 'group', width: '6%'
    //   ,sort: true
    // },
    {
      title: '定时规则', index: 'cronExpression', width: '8%'
      ,sort: true
    },
    {
      title: '状态', index: 'status', render: 'status', width: '5%'
      ,sort: true
      , filter: {
        menus: this.status,
        fn: (filter: any, record: any) => record.status === filter.value,
      }
    },
    // {
    //   title: '通知用户', index: 'isInfo',width:'6%'
    //   ,sort: true
    // },
    {
      title: '任务类', index: 'className', width: '22%'
      ,sort: true
    },
    {
      title: '描述', index: 'description', width: '18%'
      ,sort: true
    },
    {
      title: '操作', width: '8%',
      buttons: [
        {
          text: '启动',
          click: (item: any) => this.resume(item),
        },
        {
          text: '暂停',
          click: (item: any) => this.pause(item),
        },
        // {
        //   text: '立即运行一次',
        //   click: (item: any) => this.startNow(item),
        // },
      ],
    },
  ];
  selectedRows: STData[] = [];
  selectedItem: any = {};

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: ModalHelper,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private scheduleJobService: ScheduleJobService,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * 修改
   * @param item 
   */
  edit(item?: any) {
    if (!item) {
      item = this.selectedItem;
    }
    this.scheduleJobService.find(item.id).subscribe(res => {
      if (res.code == 200) {
        let scheduleJob = res.data;
        this.modal
          .createStatic(ScheduleJobEditComponent, { scheduleJob }, { size: 800 })
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
   * 暂停
   * @param item 
   */
  pause(item?: any) {
    if (!item) {
      item = this.selectedItem;
    }
    this.modalSrv.confirm({
      nzTitle: '确定要暂停吗？',
      nzContent: '你确定要暂停“' + (item ? item.name : '') + '”吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        if (item.id == null || item.id == '0') {
          this.msg.error(`任务ID不能为空！`)
        }
        else {
          this.scheduleJobService.pause(item).subscribe(res => {
            if (res.code == 200) {
              this.msg.success(`暂停成功！`)
              this.load();
            }
            else {
              this.msg.error(`暂停失败！`)
            }
          });
        }
      }
    });

  }

  /**
   * 立即执行定时任务
   * @param item 
   */
  startNow(item?: any) {
    if (!item) {
      item = this.selectedItem;
    }
    this.scheduleJobService.startNow(item).subscribe(res => {
      if (res.code == 200) {
        this.msg.success(`立即执行定时任务成功！`)
        this.load();
      }
      else {
        this.msg.error(`立即执行定时任务失败！`)
      }
    });

  }
  /**
   * 恢复定时任务,启动
   * @param item 
   */
  resume(item?: any) {
    if (!item) {
      item = this.selectedItem;
    }
    this.scheduleJobService.resume(item).subscribe(res => {
      if (res.code == 200) {
        this.msg.success(`启动定时任务成功！`)
        this.load();
      }
      else {
        this.msg.error(`启动定时任务失败！`)
      }
    });
  }
  /**
   * 删除
   * @param item 
   */
  del(item?: any) {
    if (!item) {
      item = this.selectedItem;
    }
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '你确定要删除“' + (item ? item.name : '') + '”吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        if (item.id == null || item.id == '0') {
          this.msg.error(`任务ID不能为空！`)
        }
        else {
          this.scheduleJobService.delete(item.id).subscribe(res => {
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
    let scheduleJob: any = {};
    this.modal
      .createStatic(ScheduleJobEditComponent, { scheduleJob }, { size: 800 })
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
    this.scheduleJobService.query(
      {
        query: this.query
      }
    )
      .pipe(
        map((res: any) => {
          res.data.list.forEach(i => {
            const statusItem = this.status.find(p => p.value == i.status);
            i.statusText = statusItem.text;
            i.statusType = statusItem.type;
          })
          return res;
        }
        ),
        tap(() => (this.loading = false)),
      )
      .subscribe(res => {
        this.data = res.data.list;
        this.query.total =  res.data.total;
        this.cdr.detectChanges();
      });
  }

  stChange(e: STChange) {
    switch (e.type) {
      case 'radio':
        this.selectedRows = [];
        this.selectedRows.push(e.radio);
        this.selectedItem = e.radio;
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
        this.selectedItem = e.click.item;
        break;
    }
  }

  reset() {
    // wait form reset updated finished
    setTimeout(() => this.load());
  }

}



