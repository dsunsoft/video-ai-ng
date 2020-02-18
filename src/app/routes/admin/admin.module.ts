import { NgModule } from '@angular/core';

import { SharedModule, SharedCommonComponentModule } from '@shared';
import { AdminRoutingModule } from './admin-routing.module';
import { SysUserListComponent } from './sysUser/list.component';
import { SysUserListEditComponent } from './sysUser/edit.component';
import { SysUserService } from './sysUser/sysUser.service';


import { SysMenuListComponent } from './sysMenu/list.component';
import { SysMenuEditComponent } from './sysMenu/edit.component';
import { SysMenuService } from './sysMenu/sysMenu.service';
import { SysRoleListComponent } from './sysRole/list.component';
import { SysRoleEditComponent } from './sysRole/edit.component';
import { SysRoleService } from './sysRole/sysRole.service';
import { ScheduleJobListComponent } from './scheduleJob/list.component';
import { ScheduleJobEditComponent } from './scheduleJob/edit.component';
import { ScheduleJobService } from './scheduleJob/scheduleJob.service';

import { SysDicListComponent } from './sysDic/list.component';
import { SysDicListEditComponent } from './sysDic/edit.component';
import { SysDicListEditValueComponent } from './sysDic/editValue.component';
import { SysDicService } from './sysDic/sysDic.service';

import { AreaListComponent } from './area/list.component';
import { AreaEditComponent } from './area/edit.component';
import { AreaService } from './area/area.service';
import { OfficeListComponent } from './office/list.component';
import { OfficeEditComponent } from './office/edit.component';
import { OfficeService } from './office/office.service';
import { AdminSharedModule } from './admin-shared.module';

/**
 * 操作日志
 */
import { SysLogListComponent } from './sysLog/list.component';
import { SysLogService } from './sysLog/sysLog.service';

/**
 * 组件页面
 */
const COMPONENTS = [
  SysUserListComponent,
  SysUserListEditComponent,
  SysMenuListComponent,
  SysMenuEditComponent,
  SysRoleListComponent,
  SysRoleEditComponent,
  SysDicListComponent,
  SysDicListEditComponent,
  SysDicListEditValueComponent,
  AreaListComponent,
  AreaEditComponent,
  OfficeListComponent,
  OfficeEditComponent,
  ScheduleJobListComponent,
  ScheduleJobEditComponent,
  SysLogListComponent,
];
/**
 * service
 */
const SSERVICES = [
  SysUserService,
  SysMenuService,
  SysRoleService,
  SysDicService,
  AreaService,
  OfficeService,
  ScheduleJobService,
  SysLogService
];

@NgModule({
  imports: [SharedModule, SharedCommonComponentModule, AdminRoutingModule, AdminSharedModule],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  providers: [...SSERVICES]
})
export class AdminModule { }
