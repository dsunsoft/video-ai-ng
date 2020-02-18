import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
   //设备信息
   { path: 'device', loadChildren: './device/device.module#DeviceModule' },
   //历史数据
   { path: 'waterQuality', loadChildren: './waterQuality/waterQuality.module#WaterQualityModule' },
   //视频管理
   { path: 'videoStation', loadChildren: './videoStation/videoStation.module#VideoStationModule' },
   //视频监控
   { path: 'videoMonitor', loadChildren: './videoMonitor/videoMonitor.module#VideoMonitorModule' },
   //实时监测
   { path: 'realTimeMonitor', loadChildren: './realTimeMonitor/realTimeMonitor.module#RealTimeMonitorModule' },
   { // 水质指标正常范围
     path: 'waterQualityRange',
     loadChildren: './waterQualityRange/waterQualityRange.module#WaterQualityRangeModule'
   },
   { // 水质超指标预警详细记录
    path: 'waterQualityWarning',
    loadChildren: './waterQualityWarning/waterQualityWarning.module#WaterQualityWarningModule'
   },
   { // 降水量
    path: 'stPptnR',
    loadChildren: './stPptnR/stPptnR.module#StPptnRModule'
   },
   { // 河道水情
    path: 'stRiverR',
    loadChildren: './stRiverR/stRiverR.module#StRiverRModule'
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule { }
