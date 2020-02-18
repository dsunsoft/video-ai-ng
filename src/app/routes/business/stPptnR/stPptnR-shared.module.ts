/**
 * 描述:[ST_PPTN_R][降水量表]模块
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule} from '@shared';
import { StPptnRService } from './stPptnR.service';
import { StPptnRListComponent } from './list.component';
/**
 * 组件页面
 */
const COMPONENTS = [
  StPptnRListComponent,
];
/**
 * service
 */
const SSERVICES = [
  StPptnRService
];

@NgModule({
  imports: [SharedModule, SharedCommonComponentModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES],
  exports:[...COMPONENTS]
})
export class StPptnRSharedModule {}

