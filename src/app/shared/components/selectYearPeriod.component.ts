import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';

@Component({
  selector: 'selectYearPeriod',
  template: `
  <nz-select [(ngModel)]="yearPeriod" name="yearPeriod"  [nzShowSearch]="true" [nzAllowClear]="true" [required]="required" (ngModelChange)="ngModelChange($event)" [nzPlaceHolder]="'请选择'">
    <nz-option *ngFor="let p of dataList" [nzLabel]="p" [nzValue]="p"></nz-option>
  </nz-select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectYearPeriodComponent),
      multi: true
    }
  ]
})
export class SelectYearPeriodComponent implements OnInit {
  // 资源地址
  private resourceUrl = `${API_URL}/video-ai/sysYearPeriod`;

  @Output() onSelectChange = new EventEmitter();

  @Input() required: any = false;

  @Input() yearPeriod: any;

  dataList: any[] = [];

  constructor(
    public http: _HttpClient,
    public msg: NzMessageService,
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get(`${this.resourceUrl}/getYears`)
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
    this.yearPeriod = e;
    this.onSelectChange.emit(e);
  }

  onError(error) {
    this.msg.error(error.error);
  }
}
