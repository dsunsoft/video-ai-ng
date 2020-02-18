import { NgModule } from '@angular/core';

import { SharedModule, SharedCommonComponentModule } from '@shared';
import { BusinessRoutingModule } from './business-routing.module';
/**
 * 共享组件
 */
import { BusinessSharedModule } from './business-shared.module';

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
  imports: [SharedModule, BusinessRoutingModule, SharedCommonComponentModule, BusinessSharedModule],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  providers: [...SSERVICES]
})
export class BusinessModule { }
