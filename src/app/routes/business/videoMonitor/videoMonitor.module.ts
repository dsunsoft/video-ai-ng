/**
 * 设备信息
 */
import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule } from '@shared';
import { VideoMonitorRoutingModule } from './videoMonitor-routing.module';
import { VideoMonitorSharedModule } from './videoMonitor-shared.module';



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
  imports: [SharedModule, SharedCommonComponentModule,VideoMonitorRoutingModule,VideoMonitorSharedModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES]
})
export class VideoMonitorModule {}
