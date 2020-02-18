import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DeviceService } from './device.service';
import { DEVICE_TYPE }  from '@shared';

@Component({
  selector: 'app-device-list-edit',
  templateUrl: './edit.component.html',
})
export class DeviceEditComponent implements OnInit{
  device: any = {};
  DEVICE_TYPE: any = DEVICE_TYPE;
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private msgSrv: NzMessageService) {}

  ngOnInit(){
    this.device.connDate = this.device.connDate? new Date(this.device.connDate) : null;
  }

  save() {
    //修改
    if(this.device.id && this.device.id != null) {
      this.deviceService.update(this.device).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.device);
        } 
        else {
          this.msgSrv.error('保存失败');
        }
      });
    }
    //新增
    else {
      this.deviceService.create(this.device).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.device);
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
