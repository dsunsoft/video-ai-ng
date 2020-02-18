import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { OfficeService } from './office.service';
import {SHI_FOU} from '@shared';

@Component({
  selector: 'app-office-list-edit',
  templateUrl: './edit.component.html',
})
export class OfficeEditComponent implements OnInit{
  sysOffice: any = {};
  SHI_FOU = [...SHI_FOU];
  typeValue:string = "sys_office_type";
  gradeValue:string = "sys_office_grade";
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private OfficeService: OfficeService,
    private msgSrv: NzMessageService) {}

  ngOnInit(){

  }

  onSelectTypeChange(e){
    console.log(e);
    this.sysOffice.type = e;
  }
  onSelectGradeChange(e){
    this.sysOffice.grage = e;
  }

  save() {
    //修改
    if(this.sysOffice.id && this.sysOffice.id != null) {
      this.OfficeService.update(this.sysOffice).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.sysOffice);
        } 
        else {
          this.msgSrv.error('保存失败');
        }
      });
    }
    //新增
    else {
      this.OfficeService.create(this.sysOffice).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.sysOffice);
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
