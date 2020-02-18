import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SysUserListComponent } from './sysUser/list.component';
import { SysMenuListComponent } from './sysMenu/list.component';
import { SysRoleListComponent } from './sysRole/list.component';
import { SysDicListComponent } from './sysDic/list.component';
import { AreaListComponent } from './area/list.component';
import { OfficeListComponent } from './office/list.component';
import { ScheduleJobListComponent } from './scheduleJob/list.component';
import { SysLogListComponent } from './sysLog/list.component';

const routes: Routes = [
  {
    path: 'sysUser',
    children: [
      {
        path: '',
        component: SysUserListComponent
      },
    ],
  },
  {
    path: 'sysMenu',
    children: [
      {
        path: '',
        component: SysMenuListComponent
      },
    ],
  },
  {
    path: 'sysRole',
    children: [
      {
        path: '',
        component: SysRoleListComponent
      },
    ],
  },
  {
    path: 'sysDic',
    children: [
      {
        path: '',
        component: SysDicListComponent
      },
    ],
  },
  {
    path: 'area',
    children: [
      {
        path: '',
        component: AreaListComponent
      },
    ],
  },
  {
    path: 'office',
    children: [
      {
        path: '',
        component: OfficeListComponent
      },
    ],
  },
  {
    path: 'scheduleJob',
    children: [
      {
        path: '',
        component: ScheduleJobListComponent
      },
    ],
  },
  {
    path: 'sysLog',
    children: [
      {
        path: '',
        component: SysLogListComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
