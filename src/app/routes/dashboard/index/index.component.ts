import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
  Optional,
  Inject
} from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { STColumn } from '@delon/abc';
import { getTimeDistance } from '@delon/util';
import { _HttpClient } from '@delon/theme';
import { ReuseTabService,ReuseTabCached } from '@delon/abc';
import { I18NService } from '@core';
import { yuan,DEVICE_STATUS } from '@shared';
import { Router } from '@angular/router';
import { API_URL } from '../../../app.constants';

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardIndexComponent implements OnInit {
  data: any = {};
  indexCount:any = {
    waterQualityRangeCount: 8,
    deviceCount: 1,
    videoStationCount: 0,
    warningCount: 0
  };
  tableData:any[] = [];
  DEVICE_STATUS = DEVICE_STATUS;
  loading = true;
  date_range: Date[] = [];
  // 资源地址
  private resourceUrl = `${API_URL}/video-ai/waterQuality`;
  private resourceIndexUrl = `${API_URL}/video-ai/index`;

  rankingListData: any[] = Array(7)
    .fill({})
    .map((item, i) => {
      return {
        title: this.i18n.fanyi('app.analysis.test', { no: i }),
        total: 323234,
      };
    });
  titleMap = {
    y1: this.i18n.fanyi('app.analysis.traffic'),
    y2: this.i18n.fanyi('app.analysis.payments'),
  };
  searchColumn: STColumn[] = [
    {
      title: '设备名称', index: 'deviceName'
      ,width: '250px'
      ,sort: true
    },
    {
      title: '状态',
      width: '150px',
      index: 'status',
      render: 'status'
    },
    {
      title: '溶解氧（mg/l）', index: 'dissolvedOxygen'
      ,width: '200px'
      ,sort: true
    },
    {
      title: '浊度（NTU）', index: 'turbidity'
      ,width: '200px'
      ,sort: true
    },
    {
      title: '电导率（mS/cm）', index: 'conductivity'
      ,width: '200px'
      ,sort: true
    },
    {
      title: '叶绿素（cells/mL）', index: 'chlorophyll'
      ,width: '200px'
      ,sort: true
    },
    {
      title: '化学需氧量（mg/m³）', index: 'chemicalOxygen'
      ,width: '200px'
      ,sort: true
    },
    {
      title: '酸碱度（ph）', index: 'ph'
      ,width: '200px'
      ,sort: true
    },
    {
      title: '氨氮（μg/l）', index: 'ammoniaNitrogen'
      ,width: '200px'
      ,sort: true
    },
    {
      title: '温度（℃）', index: 'temperature'
      ,width: '200px'
      ,sort: true
    },
  ];

  constructor(
    private router: Router,
    private http: _HttpClient,
    public msg: NzMessageService,
    private i18n: I18NService,
    private cdr: ChangeDetectorRef,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
  ) { }

  // _onReuseInit() {
  //   this.reuseTabService.closable = false;
  //   let reuseTabCached:ReuseTabCached = this.reuseTabService.get('/dashboard/analysis');
  //   if(reuseTabCached != null) {
  //     reuseTabCached.closable = false;
  //     this.reuseTabService.items.find((ele,index)=>ele.url == '/dashboard/analysis').closable = false;
  //   }
  //   this.reuseTabService.refresh();
  // }
  // _onReuseDestroy() {
  //   this.reuseTabService.closable = false;
  //   this.reuseTabService.refresh();
  // }

  ngOnInit() {
    this.getIndexCount();
    this.getLastDataList();
    // this.insertStPptnR();
  }

  getIndexCount(){
    let param:any = {};
    this.http.post(`${this.resourceIndexUrl}/getIndexCount`,param).subscribe((res: any) => {
        if(res.code == 200) {
          this.indexCount = res.data;
        }
        this.cdr.detectChanges();
      });
  }

  // insertStPptnR(){
  //   let param:any = {
  //     code: 0
  //   };
  //   this.http.post(`${API_URL}/video-ai/stPptnR/insertStPptnR`,param).subscribe((res: any) => {
  //       if(res.code == 200) {
  //         this.indexCount = res.data;
  //       }
  //       this.cdr.detectChanges();
  //     });
  // }
  
  getLastDataList(){
    this.loading = true;
    let param:any = {
      deviceType: 1
    };
    this.http.post(`${this.resourceUrl}/getLastDataList`,param).subscribe((res: any) => {
        res.data.forEach(i => {
          const statusItem = this.DEVICE_STATUS.find(p => p.value == i.status);
          i.statusText = statusItem ? statusItem.text : '正常';
          i.statusType = statusItem ? statusItem.type : 'success';
        });
        this.tableData = res.data;
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  setDate(type: any) {
    this.date_range = getTimeDistance(type);
    setTimeout(() => this.cdr.detectChanges());
  }

  salesType = 'all';
  salesPieData: any;
  salesTotal = 0;
  changeSaleType() {
    this.salesPieData =
      this.salesType === 'all'
        ? this.data.salesTypeData
        : this.salesType === 'online'
          ? this.data.salesTypeDataOnline
          : this.data.salesTypeDataOffline;
    if (this.salesPieData) {
      this.salesTotal = this.salesPieData.reduce((pre, now) => now.y + pre, 0);
    }
    this.cdr.detectChanges();
  }

  handlePieValueFormat(value: any) {
    return yuan(value);
  }

  saleTabs: any[] = [
    { key: 'sales', show: true },
    { key: 'visits' },
  ];
  salesChange(idx: number) {
    if (this.saleTabs[idx].show !== true) {
      this.saleTabs[idx].show = true;
      this.cdr.detectChanges();
    }
  }

  offlineIdx = 0;
  offlineChange(idx: number) {
    if (this.data.offlineData[idx].show !== true) {
      this.data.offlineData[idx].show = true;
      this.cdr.detectChanges();
    }
  }

  toPage(type){
    if(type == 1) {
      this.router.navigateByUrl("/business/device");
    }
    if(type == 2) {
      this.router.navigateByUrl("/business/videoMonitor");
    }
    if(type == 3) {
      this.router.navigateByUrl("/business/realTimeMonitor");
    }
    if(type == 4) {
      this.router.navigateByUrl("/business/waterQualityWarning");
    }
  }
}
