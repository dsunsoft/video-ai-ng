import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SysMenuService } from './sysMenu.service';

@Component({
  selector: 'app-sysmenu-list-edit',
  templateUrl: './edit.component.html',
})
export class SysMenuEditComponent implements OnInit{
  sysMenu: any = {};
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private sysMenuService: SysMenuService,
    private msgSrv: NzMessageService) {}

  ngOnInit(){

  }

  save() {
    //修改
    if(this.sysMenu.menuId && this.sysMenu.menuId != null) {
      this.sysMenuService.update(this.sysMenu).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.sysMenu);
        } 
        else {
          this.msgSrv.error('保存失败');
        }
      });
    }
    //新增
    else {
      this.sysMenuService.create(this.sysMenu).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.sysMenu);
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
