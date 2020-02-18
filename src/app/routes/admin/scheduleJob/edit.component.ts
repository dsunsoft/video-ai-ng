import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ScheduleJobService } from './scheduleJob.service';

@Component({
  selector: 'app-scheduleJob-list-edit',
  templateUrl: './edit.component.html',
})
export class ScheduleJobEditComponent implements OnInit {
  scheduleJob: any = {};

  statusList = [
    { index: 0, text: '启用', value: '1', type: 'success', checked: false },
    { index: 1, text: '停用', value: '0', type: 'error', checked: false },
  ];

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private scheduleJobService: ScheduleJobService,
    private msgSrv: NzMessageService) { }

  ngOnInit() {

  }

  save() {
    //保存
    this.scheduleJob.group = "1";
    this.scheduleJobService.save(this.scheduleJob).subscribe(res => {
      if (res.code == 200) {
        this.msgSrv.success('保存成功');
        this.modal.close(this.scheduleJob);
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
