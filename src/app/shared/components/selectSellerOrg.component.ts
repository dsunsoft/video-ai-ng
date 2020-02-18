import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';

@Component({
  selector: 'selectSellerOrg',
  template: `
  <nz-select [(ngModel)]="orgId"  name="orgId"  [nzShowSearch]="true" [nzAllowClear]="true" [required]="required" (ngModelChange)="ngModelChange($event)" [nzPlaceHolder]="'请选择'">
    <nz-option *ngFor="let p of dataList" [nzLabel]="p.text" [nzValue]="p.value"></nz-option>
  </nz-select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectSellerOrgComponent),
      multi: true
    }
  ]
})
export class SelectSellerOrgComponent implements OnInit {
  // 资源地址
  private resourceUrl = `${API_URL}/video-ai/sellerOrg`;

  @Output() onSelectChange = new EventEmitter();


  @Input() required: any = false;

  @Input() orgId: any;

  dataList: any[] = [];

  constructor(
    public http: _HttpClient,
    public msg: NzMessageService,
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get(`${this.resourceUrl}/getSelectList`)
      .pipe(
        map((res: any) => {
          return res;
        }),
      )
      .subscribe(res => {
        this.dataList = res.data;
      });
  }

  ngModelChange(e) {
    this.orgId = e;
    this.onSelectChange.emit(e);
  }

  onError(error) {
    this.msg.error(error.error);
  }
}
