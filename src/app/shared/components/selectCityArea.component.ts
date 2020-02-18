import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { API_URL } from '../../app.constants';

@Component({
  selector: 'selectCityArea',
  template: `
  <nz-cascader [nzOptions]="dataList" [(ngModel)]="areas" [nzPlaceHolder]="'请选择'" name="areas"
       (nzSelect)="ngModelChange($event)">
    </nz-cascader>
  `
})
export class SelectCityAreaComponent implements OnInit {
  // 资源地址
  private resourceUrl = `${API_URL}/video-ai/sysArea/getCascaderAreaList`;

  @Output() onSelectChange = new EventEmitter();

  @Input() required: any = false;

  @Input() areas: any;



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

  ngModelChange(e) {
    this.onSelectChange.emit(e);
  }

  onError(error) {
    this.msg.error(error.error);
  }
}
