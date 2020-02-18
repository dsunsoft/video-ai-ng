/**
 * 描述:[water_quality_warning][水质超指标预警详细记录]模块
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule } from '@shared';
import { WaterQualityWarningRoutingModule } from './waterQualityWarning-routing.module';
import { WaterQualityWarningSharedModule } from './waterQualityWarning-shared.module';



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
  imports: [SharedModule, SharedCommonComponentModule,WaterQualityWarningRoutingModule,WaterQualityWarningSharedModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES]
})
export class WaterQualityWarningModule {}


