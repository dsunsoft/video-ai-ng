import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';

@Component({
  selector: 'selectProvince',
  template: `
  <nz-select [(ngModel)]="provinceId" [nzMaxTagCount]="1" name="provinceId" [nzAllowClear]="true" [required]="required" (ngModelChange)="ngModelChange($event)" nzMode="multiple" [nzPlaceHolder]="'请选择'">
    <nz-option *ngFor="let p of dataList" [nzLabel]="p.text" [nzValue]="p.value"></nz-option>
  </nz-select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectProvinceComponent),
      multi: true
    }
  ]
})
export class SelectProvinceComponent implements OnInit {
  // 资源地址
  private resourceUrl = `${API_URL}/video-ai/sysArea/getProvinces`;

  @Output() onSelectChange = new EventEmitter();

  
  @Input() required: any = false;
  
  @Input() provinceId:any;
  

  dataList: any[] = [];

  constructor(
    public http: _HttpClient,
    public msg: NzMessageService,
  ) { }

  ngOnInit() {
    this.load();
  }

  load() { 
    this.http.get(`${this.resourceUrl}`)
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
    this.provinceId = e;
    this.onSelectChange.emit(e);
  }

  onError(error) {
    this.msg.error(error.error);
  }
}
