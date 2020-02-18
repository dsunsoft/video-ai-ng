/**
 * 描述:[water_quality_warning][水质超指标预警详细记录]路由
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaterQualityWarningListComponent } from './list.component';


const routes: Routes = [
  {
    path: '',
    component: WaterQualityWarningListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaterQualityWarningRoutingModule {}

