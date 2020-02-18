import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { VideoStationService } from './videoStation.service';

@Component({
  selector: 'app-videoStation-list-edit',
  templateUrl: './edit.component.html',
})
export class VideoStationEditComponent implements OnInit{
  videoStation: any = {};
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private videoStationService: VideoStationService,
    private msgSrv: NzMessageService) {}

  ngOnInit(){
    this.videoStation.connDate = this.videoStation.connDate? new Date(this.videoStation.connDate) : null;
  }

  save() {
    //修改
    if(this.videoStation.id && this.videoStation.id != null) {
      this.videoStationService.update(this.videoStation).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.videoStation);
        } 
        else {
          this.msgSrv.error('保存失败');
        }
      });
    }
    //新增
    else {
      this.videoStationService.create(this.videoStation).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.videoStation);
        }
        else {
          this.msgSrv.error('保存失败');
        }
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
