import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule} from '@shared';
import { RealTimeMonitorService } from './realTimeMonitor.service';
import { RealTimeMonitorListComponent } from './list.component';

/**
 * 组件页面
 */
const COMPONENTS = [
  RealTimeMonitorListComponent
];
/**
 * service
 */
const SSERVICES = [
  RealTimeMonitorService
];

@NgModule({
  imports: [SharedModule, SharedCommonComponentModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES],
  exports:[...COMPONENTS]
})
export class RealTimeMonitorSharedModule {}
