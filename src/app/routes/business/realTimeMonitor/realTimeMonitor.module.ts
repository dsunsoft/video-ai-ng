/**
 * 设备信息
 */
import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule } from '@shared';
import { RealTimeMonitorRoutingModule } from './realTimeMonitor-routing.module';
import { RealTimeMonitorSharedModule } from './realTimeMonitor-shared.module';


/**
 * 组件页面
 */
const COMPONENTS = [
  
];
/**
 * service
 */
const SSERVICES = [
  
];

@NgModule({
  imports: [SharedModule, SharedCommonComponentModule,RealTimeMonitorRoutingModule,RealTimeMonitorSharedModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES]
})
export class RealTimeMonitorModule {}
