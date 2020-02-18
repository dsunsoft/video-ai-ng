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
import { WaterQualityService } from './waterQuality.service';
import { DatePipe } from '@angular/common';
import { WaterQualityEditComponent } from './edit.component';
import { PAGE_SIZE, ST_PAGE, DEVICE_RANGE_TYPE } from '@shared';

@Component({
  selector: 'app-waterQuality-list',
  templateUrl: './list.component.html',
})
export class WaterQualityListComponent implements OnInit, OnDestroy {
  
  options:any = {};
  query: any = {
    deviceType:[],
    type:1,
    pageIndex: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    sorter: '',
  };
  data: any[] = [];
  loading = false;
  ST_PAGE: any = ST_PAGE;
  DEVICE_RANGE_TYPE: any = DEVICE_RANGE_TYPE;
  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    // { title: '', index: 'id', type: 'checkbox' },
    {
      title: '设备编号', index: 'deviceNo'
      ,sort: true
    },
    {
      title: '设备名称', index: 'deviceName'
      ,sort: true
    },
    {
      title: '上报时间', index: 'time'
      ,format: (item: any) => item.time ? this.datePipe.transform(item.time, 'yyyy-MM-dd HH:mm:ss') : ''
      ,sort: true
    },
    {
      title: '溶解氧（mg/l）', index: 'dissolvedOxygen'
      ,iif: (item:any) => this.isChoose('1')
      ,sort: true
    },
    {
      title: '浊度（NTU）', index: 'turbidity'
      ,iif: (item:any) => this.isChoose('4')
      ,sort: true
    },
    {
      title: '电导率（mS/cm）', index: 'conductivity'
      ,iif: (item:any) => this.isChoose('3')
      ,sort: true
    },
    {
      title: '叶绿素（cells/mL）', index: 'chlorophyll'
      ,iif: (item:any) => this.isChoose('13')
      ,sort: true
    },
    {
      title: '化学需氧量（mg/m³）', index: 'chemicalOxygen'
      ,iif: (item:any) => this.isChoose('6')
      ,sort: true
    },
    {
      title: '酸碱度（ph）', index: 'ph'
      ,iif: (item:any) => this.isChoose('2')
      ,sort: true
    },
    {
      title: '氨氮（μg/l）', index: 'ammoniaNitrogen'
      ,iif: (item:any) => this.isChoose('5')
      ,sort: true
    },
    {
      title: '温度（℃）', index: 'temperature'
      ,iif: (item:any) => this.isChoose('0')
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
    private waterQualityService: WaterQualityService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.query.deviceType = this.DEVICE_RANGE_TYPE.map(item => item.value);
    this.setTime(1);
    //过去一天
    // let dateOneAgo = new Date(new Date().setDate((new Date().getDate() - 1)));
    // this.query.startTime = dateOneAgo ;
    // this.query.endTime = new Date();
    //this.load();
  }
  
  isChoose(value: string): boolean {
    return !!this.query.deviceType.find(item => item === value);
  }

  resetColumns(){
    if(this.st) {
      this.st.resetColumns();
    }
  }

  ngOnDestroy() {

  }
  load() {
    this.loading = true;
    this.waterQualityService.query(
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

  setTime(type){
     this.query.type = type;
     //今天
     let now = new Date();
     //过去一小时
     let hourAgo = new Date(new Date().setHours((new Date().getHours() - 1)));
     //过去一天
     let dateOneAgo = new Date(new Date().setDate((new Date().getDate() - 1)));
     //过去七天
     let dateSevenAgo = new Date(new Date().setDate((new Date().getDate() - 7)));
     //过去一个月
     let monthAgo = new Date(new Date().setMonth((new Date().getMonth() - 1)));
    if (type == 1) {
        this.query.startTime =  hourAgo;
        this.query.endTime = now;
    }
    if (type == 2) {
        this.query.startTime =  dateOneAgo;
        this.query.endTime = now;
    }
    if (type == 3) {
        this.query.startTime =  dateSevenAgo;
        this.query.endTime = now;
    }
    if (type == 4) {
        this.query.startTime =  monthAgo;
        this.query.endTime = now;
    }
    this.loadChart();
    this.load();
  }

  /**
   * 加载echarts
   */
  loadChart(){
    if(this.loading) {
      return;
    }
    if(this.query.deviceType == null || (this.query.deviceType != null && this.query.deviceType.length ==0)) {
      this.msg.error('请选择设备类型');
      return;
    }
    this.loading = true;
    this.waterQualityService.findList(this.query).subscribe(res => {
      this.loading = false;
      if (res.code == 200) {
        let list:any[] = res.data;
        let xDatas = [];
        //溶解氧("1","溶解氧","mg/l"),
        //浊度("4","浊度","NTU"),
        //电导率("3","电导率","mS/cm"),
        //叶绿素("13","叶绿素","cells/mL"),
        //化学需氧量("6","化学需氧量","mg/m³"),
        //酸碱度("2","酸碱度","ph"),
        //氨氮("5","氨氮","μg/l"),
        //温度("0","温度","℃")
        let yDatas = {
          dissolvedOxygen:[],
          turbidity:[],
          conductivity:[],
          chlorophyll:[],
          chemicalOxygen:[],
          ph:[],
          ammoniaNitrogen:[],
          temperature:[],
        };
        if(list != null && list.length>0) {
          for(let i=list.length-1; i>=0; i--){
            let realTimeMonitor = list[i];
            xDatas.push(realTimeMonitor.time ? this.datePipe.transform(realTimeMonitor.time, 'yyyy-MM-dd HH:mm:ss') : '' );
            yDatas.dissolvedOxygen.push(realTimeMonitor.dissolvedOxygen);
            yDatas.turbidity.push(realTimeMonitor.turbidity);
            yDatas.conductivity.push(realTimeMonitor.conductivity);
            yDatas.chlorophyll.push(realTimeMonitor.chlorophyll);
            yDatas.chemicalOxygen.push(realTimeMonitor.chemicalOxygen);
            yDatas.ph.push(realTimeMonitor.ph);
            yDatas.ammoniaNitrogen.push(realTimeMonitor.ammoniaNitrogen);
            yDatas.temperature.push(realTimeMonitor.temperature);
          }
        }
        let legendDatas = [];
        let seriesDatas = [];
        for(let i=0; i<this.query.deviceType.length; i++){
          let deviceType = this.query.deviceType[i];
          let deviceItem = this.DEVICE_RANGE_TYPE.find(item => item.value == deviceType);
          legendDatas.push(deviceItem.text +'('+deviceItem.unit + ')');
          seriesDatas.push(
            {
              name:deviceItem.text +'('+deviceItem.unit + ')',
              type:'line',
              stack: '水质',
              data:yDatas[deviceItem.column]
          }
          );
        }
        this.options =  {
          // title: {
          //     text: '折线图堆叠'
          // },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:legendDatas
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xDatas
          },
          yAxis: {
              type: 'value'
          },
          series: seriesDatas
        };
        this.cdr.detectChanges();
      }
      else {
        this.msg.error(`未获取到数据！`)
      }
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
    setTimeout(() => this.search());
  }

  search(){
    if(this.loading) {
      return;
    }
    if(this.query.deviceType == null || (this.query.deviceType != null && this.query.deviceType.length ==0)) {
      this.msg.error('请选择设备类型');
      return;
    }
    this.loadChart();
    this.load();
  }


  /**
   * 修改
   * @param item 
   */
  edit(item) {
    this.waterQualityService.find(item.id).subscribe(res => {
      if (res.code == 200) {
        let waterQuality = res.data;
        this.modal
          .createStatic(WaterQualityEditComponent, { waterQuality }, { size: 800 })
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
      nzContent: '你确定要删除“' + (item ? item.deviceName + ( item.time ? this.datePipe.transform(item.time, 'yyyy-MM-dd HH:mm:ss') : '') : '') + '”的数据吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        if (item.id == null || item.id == '0') {
          this.msg.error(`角色ID不能为空！`)
        }
        else {
          this.waterQualityService.delete(item.id).subscribe(res => {
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
    let waterQuality: any = {};
    this.modal
      .createStatic(WaterQualityEditComponent, { waterQuality }, { size: 800 })
      .subscribe(res => {
        this.load();
      });
  }

}



