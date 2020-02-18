/**
 * 设备信息
 */
import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule } from '@shared';
import { WaterQualityRoutingModule } from './waterQuality-routing.module';
import { WaterQualitySharedModule } from './waterQuality-shared.module';


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
  imports: [SharedModule, SharedCommonComponentModule,WaterQualityRoutingModule,WaterQualitySharedModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES]
})
export class WaterQualityModule {}
