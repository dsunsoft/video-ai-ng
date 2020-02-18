import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule } from '@shared';


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
  imports: [SharedModule, SharedCommonComponentModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES],
  exports:[...COMPONENTS]
})
export class AdminSharedModule {}
