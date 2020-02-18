import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule} from '@shared';
import { VideoMonitorService } from './videoMonitor.service';
import { VideoMonitorListComponent } from './list.component';
/**
 * 组件页面
 */
const COMPONENTS = [
  VideoMonitorListComponent
];
/**
 * service
 */
const SSERVICES = [
  VideoMonitorService
];

@NgModule({
  imports: [SharedModule, SharedCommonComponentModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES],
  exports:[...COMPONENTS]
})
export class VideoMonitorSharedModule {}
