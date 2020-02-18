import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SysDicService } from './sysDic.service';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';

@Component({
  selector: 'app-sysdic-list-edit-value',
  templateUrl: './editValue.component.html',
})
export class SysDicListEditValueComponent implements OnInit {

  record: any = {};

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private msgSrv: NzMessageService,
    private cdr: ChangeDetectorRef,
    private sysDicService: SysDicService
  ) { }

  ngOnInit() {

  }

  save() {
    this.sysDicService.saveValue(this.record).subscribe(res => {
      if (res.code == 200) {
        this.msgSrv.success(`保存成功！`)
        this.modal.close(this.record);
      }
      else {
        this.msgSrv.error(res.message);
      }
    });
  }

  close() {
    this.modal.destroy();
  }
}
