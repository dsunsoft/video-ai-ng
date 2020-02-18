import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule} from '@shared';
import { WaterQualityService } from './waterQuality.service';
import { WaterQualityListComponent } from './list.component';
import { WaterQualityEditComponent } from './edit.component';

/**
 * 组件页面
 */
const COMPONENTS = [
  WaterQualityListComponent,
  WaterQualityEditComponent
];
/**
 * service
 */
const SSERVICES = [
  WaterQualityService
];

@NgModule({
  imports: [SharedModule, SharedCommonComponentModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES],
  exports:[...COMPONENTS]
})
export class WaterQualitySharedModule {}
