/**
 * 设备信息
 */
import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule } from '@shared';
import { VideoStationRoutingModule } from './videoStation-routing.module';
import { VideoStationSharedModule } from './videoStation-shared.module';



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
  imports: [SharedModule, SharedCommonComponentModule,VideoStationRoutingModule,VideoStationSharedModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES]
})
export class VideoStationModule {}
