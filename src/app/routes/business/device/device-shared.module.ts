import { NgModule } from '@angular/core';

import { SharedModule,SharedCommonComponentModule} from '@shared';
import { DeviceService } from './device.service';
import { DeviceListComponent } from './list.component';
import { DeviceEditComponent } from './edit.component';
/**
 * 组件页面
 */
const COMPONENTS = [
  DeviceListComponent,
  DeviceEditComponent
];
/**
 * service
 */
const SSERVICES = [
  DeviceService
];

@NgModule({
  imports: [SharedModule, SharedCommonComponentModule],
  declarations: [ ...COMPONENTS ],
  entryComponents: [...COMPONENTS],
  providers:[ ...SSERVICES],
  exports:[...COMPONENTS]
})
export class DeviceSharedModule {}
