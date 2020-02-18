import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';

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
  imports: [SharedModule],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  providers: [...SSERVICES],
  exports: [...COMPONENTS]
})
export class BusinessSharedModule { }
