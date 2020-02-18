import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AreaService } from './area.service';
import { AREA_TYPES } from '@shared';

@Component({
  selector: 'app-area-list-edit',
  templateUrl: './edit.component.html',
})
export class AreaEditComponent implements OnInit{
  area: any = {};
  AREA_TYPES = AREA_TYPES;
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private areaService: AreaService,
    private msgSrv: NzMessageService) {}

  ngOnInit(){

  }

  save() {
    //修改
    if(this.area.id && this.area.id != null) {
      this.areaService.update(this.area).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.area);
        } 
        else {
          this.msgSrv.error('保存失败');
        }
      });
    }
    //新增
    else {
      this.areaService.create(this.area).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.area);
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
