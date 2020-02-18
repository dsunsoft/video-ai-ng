/**
 * 描述:[water_quality_range][水质指标正常范围]模块
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule} from '@shared';
import { WaterQualityRangeService } from './waterQualityRange.service';
import { WaterQualityRangeListComponent } from './list.component';
import { WaterQualityRangeEditComponent } from './edit.component';
/**
 * 组件页面
 */
const COMPONENTS = [
  WaterQualityRangeListComponent,
  WaterQualityRangeEditComponent
];
/**
 * service
 */
const SSERVICES = [
  WaterQualityRangeService
];

@NgModule({
  imports: [SharedModule, SharedCommonComponentModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES],
  exports:[...COMPONENTS]
})
export class WaterQualityRangeSharedModule {}

