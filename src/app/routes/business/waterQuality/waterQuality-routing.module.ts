import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WaterQualityListComponent } from './list.component';


const routes: Routes = [
  {
    path: '',
    component: WaterQualityListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaterQualityRoutingModule {}
