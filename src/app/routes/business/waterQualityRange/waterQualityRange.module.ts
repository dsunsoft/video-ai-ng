/**
 * 描述:[water_quality_range][水质指标正常范围]模块
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule } from '@shared';
import { WaterQualityRangeRoutingModule } from './waterQualityRange-routing.module';
import { WaterQualityRangeSharedModule } from './waterQualityRange-shared.module';



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
  imports: [SharedModule, SharedCommonComponentModule,WaterQualityRangeRoutingModule,WaterQualityRangeSharedModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES]
})
export class WaterQualityRangeModule {}


