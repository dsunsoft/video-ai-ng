/**
 * 描述:[ST_RIVER_R][河道水情表]模块
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule} from '@shared';
import { StRiverRService } from './stRiverR.service';
import { StRiverRListComponent } from './list.component';
/**
 * 组件页面
 */
const COMPONENTS = [
  StRiverRListComponent,
];
/**
 * service
 */
const SSERVICES = [
  StRiverRService
];

@NgModule({
  imports: [SharedModule, SharedCommonComponentModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES],
  exports:[...COMPONENTS]
})
export class StRiverRSharedModule {}

