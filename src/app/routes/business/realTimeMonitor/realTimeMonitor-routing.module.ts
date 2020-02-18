import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealTimeMonitorListComponent } from './list.component';


const routes: Routes = [
  {
    path: '',
    component: RealTimeMonitorListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealTimeMonitorRoutingModule {}
