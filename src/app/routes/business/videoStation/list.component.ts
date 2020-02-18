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
import { VideoStationService } from './videoStation.service';
import { DatePipe } from '@angular/common';
import { VideoStationEditComponent } from './edit.component';
import { PAGE_SIZE, ST_PAGE,LIVE_STATUS } from '@shared';

@Component({
  selector: 'app-videoStation-list',
  templateUrl: './list.component.html',
})
export class VideoStationListComponent implements OnInit, OnDestroy {

  query: any = {
    pageIndex: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    sorter: '',
  };
  data: any[] = [];
  loading = false;
  liveStatus = [...LIVE_STATUS];
  ST_PAGE: any = ST_PAGE;
  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'id', type: 'checkbox' },
    {
      title: '设备序列号', index: 'deviceId'
      ,width:'150px'
      ,sort: true
    },
    {
      title: '通道号', index: 'channelId'
      ,width:'100px'
      ,sort: true
    },
    {
      title: '直播状态', index: 'liveStatus',render: 'liveStatus'
      ,width:'100px'
      ,sort: true
    },
    {
      title: '封面图片', index: 'coverUrl',type: 'img'
      ,sort: true
    },
    {
      title: '直播流hls', index: 'hls'
      ,sort: true
    },
    {
      title: '操作'
      ,width:'100px'
      ,buttons: [
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
    private videoStationService: VideoStationService,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * 修改
   * @param item 
   */
  edit(item) {
    this.videoStationService.find(item.id).subscribe(res => {
      if (res.code == 200) {
        let videoStation = res.data;
        this.modal
          .createStatic(VideoStationEditComponent, { videoStation }, { size: 800 })
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
      nzContent: '你确定要删除“' + (item ? item.videoStationName : '') + '”吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        if (item.id == null || item.id == '0') {
          this.msg.error(`ID不能为空！`)
        }
        else {
          this.videoStationService.delete(item.id).subscribe(res => {
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
    let videoStation: any = {};
    this.modal
      .createStatic(VideoStationEditComponent, { videoStation }, { size: 800 })
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
    this.videoStationService.query(
      {
        query: this.query
      }
    )
      .pipe(
        map((res: any) => {
          res.data.list.forEach(i => {
            const statusItem = this.liveStatus.find(p => p.value == i.liveStatus);
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



