import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SysRoleService } from './sysRole.service';

@Component({
  selector: 'app-sysrole-list-edit',
  templateUrl: './edit.component.html',
})
export class SysRoleEditComponent implements OnInit{
  sysRole: any = {};
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private sysRoleService: SysRoleService,
    private msgSrv: NzMessageService) {}

  ngOnInit(){

  }

  save() {
    //修改
    if(this.sysRole.roleId && this.sysRole.roleId != null) {
      this.sysRoleService.update(this.sysRole).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.sysRole);
        } 
        else {
          this.msgSrv.error('保存失败');
        }
      });
    }
    //新增
    else {
      this.sysRoleService.create(this.sysRole).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.sysRole);
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
