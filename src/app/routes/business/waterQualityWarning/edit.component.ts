/**
 * 描述:[water_quality_warning][水质超指标预警详细记录]表的新增或修改组件
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { WaterQualityWarningService } from './waterQualityWarning.service';

@Component({
  selector: 'app-waterQualityWarning-list-edit',
  templateUrl: './edit.component.html',
})
export class WaterQualityWarningEditComponent implements OnInit{
  waterQualityWarning: any = {};
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private waterQualityWarningService: WaterQualityWarningService,
    private msgSrv: NzMessageService) {}

  ngOnInit(){
                                                                                                      }

  save() {
    //修改
    if(this.waterQualityWarning.id && this.waterQualityWarning.id != null) {
      this.waterQualityWarningService.update(this.waterQualityWarning).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.waterQualityWarning);
        } 
        else {
          this.msgSrv.error('保存失败');
        }
      });
    }
    //新增
    else {
      this.waterQualityWarningService.create(this.waterQualityWarning).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.waterQualityWarning);
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
