import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';

@Component({
  selector: 'selectWarehouse',
  template: `
  <nz-select [(ngModel)]="warehouseId" name="warehouseId" [nzAllowClear]="true" [required]="required" (ngModelChange)="ngModelChange($event)" [nzPlaceHolder]="'请选择'">
    <nz-option *ngFor="let p of dataList" [nzLabel]="p.text" [nzValue]="p.value"></nz-option>
  </nz-select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectWarehouseComponent),
      multi: true
    }
  ]
})
export class SelectWarehouseComponent implements OnInit {
  // 资源地址
  private resourceUrl = `${API_URL}/video-ai/warehouse`;

  @Output() onSelectChange = new EventEmitter();

  
  @Input() required: any = false;
  
  // warehouseIdValue:any;
  @Input() warehouseId:any;
  // get warehouseId() {
  //     return this.warehouseIdValue;
  // }
  // set warehouseId(val) {
  //     this.warehouseIdValue = val;
  //     this.onSelectChange.emit(this.warehouseIdValue);
  // }

  dataList: any[] = [];

  constructor(
    public http: _HttpClient,
    public msg: NzMessageService,
  ) { }

  ngOnInit() {
    this.load();
  }

  load() { 
    this.http.get(`${this.resourceUrl}/getSelectList/1`)
      .pipe(
        map((res: any) => {
          return res;
        }),
      )
      .subscribe(res => {
        this.dataList = res.data;
      });
  }

  ngModelChange(e){
    this.warehouseId = e;
    this.onSelectChange.emit(e);
  }

  onError(error) {
    this.msg.error(error.error);
  }
}
