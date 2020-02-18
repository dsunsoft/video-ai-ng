import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { WaterQualityService } from './waterQuality.service';

@Component({
  selector: 'app-waterQuality-list-edit',
  templateUrl: './edit.component.html',
})
export class WaterQualityEditComponent implements OnInit{
  waterQuality: any = {};
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private waterQualityService: WaterQualityService,
    private msgSrv: NzMessageService) {}

  ngOnInit(){
    this.waterQuality.time = this.waterQuality.time? new Date(this.waterQuality.time) : null;
  }

  save() {
    //修改
    if(this.waterQuality.id && this.waterQuality.id != null) {
      this.waterQualityService.update(this.waterQuality).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.waterQuality);
        } 
        else {
          this.msgSrv.error('保存失败');
        }
      });
    }
    //新增
    else {
      this.waterQualityService.create(this.waterQuality).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.waterQuality);
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
