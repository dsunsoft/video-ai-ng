import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';
import { tap, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SysUserService } from './sysUser.service';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { SHI_FOU, ChooseOfficeComponent } from '@shared';
import { API_URL, FILE_URL } from '../../../app.constants';

@Component({
  selector: 'app-sysuser-list-edit',
  styles: [`
  .avatar {
    max-width: 128px;
    max-height: 128px;
    overflow: hidden;
  }
  .avatar img {
    width: 100%;
  }
  `],
  templateUrl: './edit.component.html',
})
export class SysUserListEditComponent implements OnInit {

  sysUser: any = { company: {}, office: {} };
  SHI_FOU = [...SHI_FOU];
  FILE_URL = FILE_URL;
  fileUploadUrl: string = `${API_URL}/video-ai/file/upload`;
  roleIdStrings: any[] = [];

  checkOptions = [];

  updateSingleChecked(): void {
    // if (this.checkOptions.every(item => item.checked === false)) {

    // } else if (this.checkOptions.every(item => item.checked === true)) {

    // } else {

    // }
  }

  getRoleList() {
    this.sysUserService.getRoleList({ pageIndex: 1, pageSize: 9999 })
      .pipe(
        map((res: any) => {
          if (res.code == 200) {
            res.data.list.map(ele => {
              ele.label = ele.roleName;
              ele.value = ele.roleId;
              ele.checked = false;
              if (this.roleIdStrings != null && this.roleIdStrings.length > 0) {
                this.roleIdStrings.forEach(element => {
                  if (element == ele.roleId) {
                    ele.checked = true;
                  }
                });
              }
            });
          }
          return res;
        }
        )
      )
      .subscribe(res => {
        if (res.code == 200) {
          this.checkOptions = res.data.list;
        }
        else {
          this.msgSrv.error(res.message);
        }
      })
  }

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private msgSrv: NzMessageService,
    private modal2: ModalHelper,
    private cdr: ChangeDetectorRef,
    private sysUserService: SysUserService
  ) { }

  ngOnInit() {
    if (this.sysUser.id != null) {
      this.sysUser.oldLoginName = this.sysUser.loginName;
      this.sysUser.newPassword = null;
      this.sysUser.confirmPassword = null;
      if (this.sysUser.roleIdStrings && this.sysUser.roleIdStrings != null && this.sysUser.roleIdStrings != '') {
        this.roleIdStrings = this.sysUser.roleIdStrings.split(',');
      }
    }
    this.getRoleList();
  }

  setPhoto(file) {
    if (file.response.code == 200) {
      this.msgSrv.success("上传成功！");
      this.sysUser.photo = file.response.data.relativeUrl;
    }
    else {
      this.msgSrv.error('文件上传失败！');
    }

  }

  fileUpload(info) {
    switch (info.file.status) {
      case 'uploading':
        break;
      case 'done':
        // Get this url from response in real world.
        this.setPhoto(info.file);
        break;
      case 'error':
        this.msgSrv.error('上传失败！');
        break;
    }
  }

  save() {
    if (this.sysUser.newPassword != this.sysUser.confirmPassword) {
      this.msgSrv.error('确认秘密不一致,请重新输入密码！');
      this.sysUser.newPassword = null;
      this.sysUser.confirmPassword = null;
      return;
    }
    if (this.checkOptions != null && this.checkOptions.length > 0) {
      this.sysUser.roleIds = [];
      let haveSelectRoles: boolean = false;
      for (let i = 0; i < this.checkOptions.length; i++) {
        if (this.checkOptions[i].checked == true) {
          haveSelectRoles = true;
          this.sysUser.roleIds.push(this.checkOptions[i].roleId);
        }
      }
    }
    else {
      this.sysUser.roleIds = [];
    }
    this.sysUserService.save(this.sysUser).subscribe(res => {
      if (res.code == 200) {
        this.msgSrv.success(`保存成功！`)
        this.modal.close(this.sysUser);
      }
      else {
        this.msgSrv.error(res.message);
      }
    });

    // if(this.sysUser.id && this.sysUser.id != null) {
    //   this.sysUserService.update(this.sysUser).subscribe(res => {
    //     if (res.code == 200) {
    //       this.msgSrv.success(`保存成功！`)
    //       this.modal.close(this.sysUser);
    //     }
    //     else {
    //       this.msgSrv.success(res.message);
    //     }
    //   });
    // }
    // else {
    //   this.sysUserService.createStatic(this.sysUser).subscribe(res => {
    //     if (res.code == 200) {
    //       this.msgSrv.success(`保存成功！`)
    //       this.modal.close(this.sysUser);
    //     }
    //     else {
    //       this.msgSrv.success(res.message);
    //     }
    //   });
    // }

  }

  /**
   * 选择公司
   */
  selectCompany() {
    let query = {
      multiple: false,
      type: "1"
    };
    this.modal2.static(ChooseOfficeComponent, { query: query }, 300)
      .subscribe(res => {
        this.sysUser.company.id = res[0].key;
        this.sysUser.company.name = res[0].title;
        this.cdr.detectChanges();
      });
  }
  /**
   * 选择机构
   */
  selectOffice() {
    let query = {
      multiple: false
    };
    this.modal2.createStatic(ChooseOfficeComponent, { query: query }, { size: 300 })
      .subscribe(res => {
        this.sysUser.office.id = res[0].key;
        this.sysUser.office.name = res[0].title;
        this.cdr.detectChanges();
      });
  }

  close() {
    this.modal.destroy();
  }
}
