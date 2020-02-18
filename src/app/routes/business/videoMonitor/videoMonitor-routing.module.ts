import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoMonitorListComponent } from './list.component';


const routes: Routes = [
  {
    path: '',
    component: VideoMonitorListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoMonitorRoutingModule {}
