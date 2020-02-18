/**
 * 描述:[water_quality_warning][水质超指标预警详细记录]模块
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule} from '@shared';
import { WaterQualityWarningService } from './waterQualityWarning.service';
import { WaterQualityWarningListComponent } from './list.component';
import { WaterQualityWarningEditComponent } from './edit.component';
/**
 * 组件页面
 */
const COMPONENTS = [
  WaterQualityWarningListComponent,
  WaterQualityWarningEditComponent
];
/**
 * service
 */
const SSERVICES = [
  WaterQualityWarningService
];

@NgModule({
  imports: [SharedModule, SharedCommonComponentModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES],
  exports:[...COMPONENTS]
})
export class WaterQualityWarningSharedModule {}

