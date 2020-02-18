/**
 * 描述:[ST_RIVER_R][河道水情表]路由
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StRiverRListComponent } from './list.component';


const routes: Routes = [
  {
    path: '',
    component: StRiverRListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StRiverRRoutingModule {}

