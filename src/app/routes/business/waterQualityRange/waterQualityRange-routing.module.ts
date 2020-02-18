/**
 * 描述:[water_quality_range][水质指标正常范围]路由
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaterQualityRangeListComponent } from './list.component';


const routes: Routes = [
  {
    path: '',
    component: WaterQualityRangeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaterQualityRangeRoutingModule {}

