import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { API_URL } from '../../app.constants';

@Component({
  selector: 'selectLogisticsCompany',
  template: `
  <nz-select [(ngModel)]="logisticsCompanyId"  name="logisticsCompanyId"  [nzShowSearch]="true" [nzAllowClear]="true" [required]="required" (ngModelChange)="ngModelChange($event)" [nzAllowClear]="true" [nzPlaceHolder]="'请选择'">
    <nz-option *ngFor="let p of dataList" [nzLabel]="p.logisticsCompanyName" [nzValue]="p.logisticsCompanyId"></nz-option>
  </nz-select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectLogisticsCompanyComponent),
      multi: true
    }
  ]
})
export class SelectLogisticsCompanyComponent implements OnInit {
  // 资源地址
  private resourceUrl = `${API_URL}/video-ai/logisticsCompany`;

  @Output() onSelectChange = new EventEmitter();


  @Input() required: any = false;

  @Input() logisticsCompanyId: any;

  dataList: any[] = [];

  constructor(
    public http: _HttpClient,
    public msg: NzMessageService,
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get(`${this.resourceUrl}/get/1`)
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
    this.logisticsCompanyId = e;
    this.onSelectChange.emit(e);
  }

  onError(error) {
    this.msg.error(error.error);
  }
}
