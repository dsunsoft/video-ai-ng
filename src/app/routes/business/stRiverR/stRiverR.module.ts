/**
 * 描述:[ST_RIVER_R][河道水情表]模块
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule } from '@shared';
import { StRiverRRoutingModule } from './stRiverR-routing.module';
import { StRiverRSharedModule } from './stRiverR-shared.module';



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
  imports: [SharedModule, SharedCommonComponentModule,StRiverRRoutingModule,StRiverRSharedModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES]
})
export class StRiverRModule {}


