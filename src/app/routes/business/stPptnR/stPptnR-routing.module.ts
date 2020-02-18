/**
 * 描述:[ST_PPTN_R][降水量表]路由
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StPptnRListComponent } from './list.component';


const routes: Routes = [
  {
    path: '',
    component: StPptnRListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StPptnRRoutingModule {}

