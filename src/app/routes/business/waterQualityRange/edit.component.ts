/**
 * 描述:[water_quality_range][水质指标正常范围]表的新增或修改组件
 * @version:1.0.0
 * @author:  administrator
 * @创建时间: ${date}
 */
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { WaterQualityRangeService } from './waterQualityRange.service';
import { WATER_QUALITY_RANGE_TYPE } from '@shared';

@Component({
  selector: 'app-waterQualityRange-list-edit',
  templateUrl: './edit.component.html',
})
export class WaterQualityRangeEditComponent implements OnInit{
  waterQualityRange: any = {};
  WATER_QUALITY_RANGE_TYPE:any [] = WATER_QUALITY_RANGE_TYPE;
  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private waterQualityRangeService: WaterQualityRangeService,
    private msgSrv: NzMessageService) {}

  ngOnInit(){

  }

  save() {
    if(this.waterQualityRange.rangeType == null) {
      this.msgSrv.error('请选择水质指标类型！');
      return;
    }
    if(this.waterQualityRange.rangeType == 1 
      && (this.waterQualityRange.max == null || this.waterQualityRange.max == '')) {
        this.msgSrv.error('请输入最大值！');
        return;
    }
    if(this.waterQualityRange.rangeType == 2 
      && (this.waterQualityRange.min == null || this.waterQualityRange.min == '')) {
        this.msgSrv.error('请输入最小值！');
        return;
    }
    if(this.waterQualityRange.rangeType == 3 
      && (this.waterQualityRange.max == null || this.waterQualityRange.max == '')
      && (this.waterQualityRange.min == null || this.waterQualityRange.min == '')) {
        this.msgSrv.error('请输入最大值和最小值！');
        return;
    }
    if(this.waterQualityRange.rangeType == 4 
      && (this.waterQualityRange.other == null || this.waterQualityRange.other == '')
      ) {
        this.msgSrv.error('请输入其他！');
        return;
    }
    //修改
    if(this.waterQualityRange.id && this.waterQualityRange.id != null) {
      this.waterQualityRangeService.update(this.waterQualityRange).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.waterQualityRange);
        } 
        else {
          this.msgSrv.error('保存失败');
        }
      });
    }
    //新增
    else {
      this.waterQualityRangeService.create(this.waterQualityRange).subscribe(res => {
        if(res.code == 200) {
          this.msgSrv.success('保存成功');
          this.modal.close(this.waterQualityRange);
        }
        else {
          this.msgSrv.error('保存失败');
        }
      });
    }
  }

  rangeChange(rangeType){
    this.waterQualityRange.rangeType = rangeType;
    if(this.waterQualityRange.rangeType == null) {
      this.msgSrv.error('请选择水质指标类型！');
      return;
    }
    if(this.waterQualityRange.rangeType == 1) {
      this.waterQualityRange.min = null;
      this.waterQualityRange.other = null;
      return;
    }
    if(this.waterQualityRange.rangeType == 2) {
      this.waterQualityRange.max = null;
      this.waterQualityRange.other = null;
      return;
    }
    if(this.waterQualityRange.rangeType == 3) {
      this.waterQualityRange.other = null;
      return;
    }
    if(this.waterQualityRange.rangeType == 4) {
      this.waterQualityRange.min = null;
      this.waterQualityRange.max = null;
      return;
    }
  }

  close() {
    this.modal.destroy();
  }
}
