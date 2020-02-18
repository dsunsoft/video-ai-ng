import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';

@Component({
  selector: 'dic',
  template: `
  <nz-select [(ngModel)]="dicId"  name="type" [required]="required" (ngModelChange)="ngModelChange($event)" [nzAllowClear]="true" [nzPlaceHolder]="placeHolder">
    <nz-option *ngFor="let p of dicList" [nzLabel]="p.label" [nzValue]="p.value"></nz-option>
  </nz-select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DicComponent),
      multi: true
    }
  ]
})
export class DicComponent implements OnInit {
  // 资源地址
  private resourceUrl = `${API_URL}/video-ai/sysDict`;

  get valid_dic() {      // 父组件的formControlName接收这块return的数据 get的auto_off_date名称和下面this.change(this.auto_off_date);括号中的值名称一样
    if (this.required) {
      if(this.dicId == null || this.dicId == '') {
        return {
          valid: false
        }
      }
      else {
        return {
          valid: true
        }
      }
    }
    else {
      return {
        valid: true
      }
    }
  }
  
  @Input() pid: string;
  @Input() type: string;

  @Input() style: any;

  @Input() required: any = false;

  @Input() disabled: any;

  @Input() emptyText: string;

  @Input() placeHolder :string;
  
  //通过value排除不需要的选项
  @Input() removeOptionByValue: any;
  
  // 数据字典被选中的值
  // dicIdValue: string;

  @Input() dicId:any;
  // @Input()
  // get dicId() {
  //     return this.dicIdValue;
  // }
  // set dicId(val) {
  //     this.dicIdValue = val;
  //     this.onSelectChange.emit(this.dicIdValue);
  // }


  @Output() onSelectChange = new EventEmitter();

  @Output() onSelectChangeItem = new EventEmitter();

  
  ngModelChange(e){
    this.dicId = e;
    this.onSelectChange.emit(e);
    let selectedItem = this.dicList.filter(element => element.value == e);
    this.onSelectChangeItem.emit(selectedItem);
  }

  dicList = [];

  constructor(
    public http: _HttpClient,
    public msg: NzMessageService,
    ) { }

  ngOnInit() {
    // 根据pid获取数据字典的数据
    this.loadAll();
  }

  loadAll() {
      if((!this.pid) && (!this.type)) {
        return;
      }
      let body = {
        dictTypeId: this.pid,
        type: this.type,
      };
      let options = {
      };
      this.http.post(`${this.resourceUrl}/getDictValues`, body, options )
      .subscribe(
        (res) => this.onSuccess(res),
        (res) => this.onError(res)
      );
  }

  onSuccess(data) {
    if (+data.code !== 200) {
      this.msg.error(data.message);
      return;
    }
    this.dicList = data.data; 
    //排除不必要的选项
    this.refreshOptions();
    // 如果空文字有值，则在第一项上加，比如全部等选项，值为空
    if(this.emptyText != null) {
      var emptyItem = {label : this.emptyText, value : null};
      this.dicList.unshift(emptyItem);
    }
  }

  onError(error) {
    this.msg.error(error.error);
  }

  //排除不必要的选项
  refreshOptions(removeOptionByValue?:any){
    this.removeOptionByValue = removeOptionByValue?removeOptionByValue:this.removeOptionByValue;
    if(this.removeOptionByValue && this.removeOptionByValue != null && this.dicList != null && this.dicList.length>0){
      for (let i=0;i<this.dicList.length;i++) {
          if(this.dicList[i].value === this.removeOptionByValue) {
            this.dicList.splice(i,1);
            break;
          }
      }
    }
  }

  // onChange(event) {
  //   this.onSelectChange.emit(this.dicIdValue);
  // }
}
