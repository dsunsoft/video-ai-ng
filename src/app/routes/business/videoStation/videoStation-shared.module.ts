import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule} from '@shared';
import { VideoStationService } from './videoStation.service';
import { VideoStationListComponent } from './list.component';
import { VideoStationEditComponent } from './edit.component';
/**
 * 组件页面
 */
const COMPONENTS = [
  VideoStationListComponent,
  VideoStationEditComponent
];
/**
 * service
 */
const SSERVICES = [
  VideoStationService
];

@NgModule({
  imports: [SharedModule, SharedCommonComponentModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES],
  exports:[...COMPONENTS]
})
export class VideoStationSharedModule {}
