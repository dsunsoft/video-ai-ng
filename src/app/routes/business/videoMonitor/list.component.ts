/**
 * 设备管理
 * @zb
 * 2019-03-14 11:43
 */
import { Component, OnInit, OnDestroy,AfterViewInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { VideoMonitorService } from './videoMonitor.service';
import { DatePipe } from '@angular/common';
import { PAGE_SIZE, ST_PAGE } from '@shared';

@Component({
  selector: 'app-videoMonitor-list',
  templateUrl: './list.component.html',
})
export class VideoMonitorListComponent implements OnInit, OnDestroy {

  query: any = {
    pageIndex: 1,
    pageSize: 2,
    total: 0,
    sorter: '',
  };
  data: any[] = [];
  loading = false;
  nzPageSizeOptions = [2,4,6,10];
  selectedRows: STData[] = [];
  playerList: any[] = [];

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: ModalHelper,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private videoMonitorService: VideoMonitorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(){

  }
  nzPageIndexChange(e){
    this.query.pageIndex = e;
    this.load();
  }
  nzPageSizeChange(e){
    this.query.pageIndex = 1;
    this.query.pageSize = e;
    this.load();
  }

  clearPlayer(){
    if(this.playerList != null && this.playerList.length>0) {
      for(let i=0; i<this.playerList.length; i++){
        this.playerList[i].remove();
      }
     }
     this.playerList = [];
  }

  videoPlayer(){
    // var videoObject = {
    //     container: '#video',//“#”代表容器的ID，“.”或“”代表容器的class
    //     variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
    //     autoplay: false,//自动播放
    //     live: true,
    //     // poster: 'material/poster.jpg',
    //     video:'rtmp://live.hkstv.hk.lxdns.com/live/hks'//视频地址
    //     // video:'http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8'//视频地址
    // };
     this.clearPlayer();
     if(this.data != null && this.data.length>0) {
      for(let i=0; i<this.data.length; i++){
        let player = new cyberplayer("video"+this.data[i].id).setup({
            width: '100%', // 宽度，也可以支持百分比（不过父元素宽度要有）
            height: 480, // 高度，也可以支持百分比
            title: this.data[i].deviceId+'-'+this.data[i].channelId, // 标题
            isLive: true, // 必须设置，表明是直播视频
            //file: "https://cmgw-hz.lechange.com:8890/LCO/5E00E86PAZ191E1/2/1/20191218T121602/dev_5E00E86PAZ191E1_20191218T121602.m3u8?proto=https", // //您的视频源的地址（目前是乐橙示例播放地址）
            file: this.data[i].hls, // //您的视频源的地址（目前是乐橙示例播放地址）
            image: this.data[i].coverUrl, // 预览图
            autostart: true, // 是否自动播放
            stretching: "uniform", // 拉伸设置
            repeat: false, // 是否重复播放
            volume: 0, // 音量，注：仅当用户同意、网站由用户激活或媒体无声时允许自动播放
            controls: true, // 是否显示控制栏
            hls: {
                reconnecttime: 5 // hls直播重连间隔秒数
            },
            ak: "39f82ac87fc3462ea4dcc78734450f57" // 百度智能云平台注册（https://cloud.baidu.com）即可获得accessKey
        });
        this.playerList.push(player);
      }
     }
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.clearPlayer();
  }
  load() {
    this.loading = true;
    this.videoMonitorService.query(
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
        setTimeout(()=>{
          this.videoPlayer();
        },50);
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



