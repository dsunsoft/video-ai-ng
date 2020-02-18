import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoStationListComponent } from './list.component';


const routes: Routes = [
  {
    path: '',
    component: VideoStationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoStationRoutingModule {}
