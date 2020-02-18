import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { API_URL } from '../../../app.constants';

@Component({
  selector: 'app-shared-chooseCustomArea',
  styles: [`
  .active {
    background: #1890FF;
    color: #fff;
  }
  `],
  templateUrl: './chooseCustomArea.html',
})
export class ChooseCustomAreaComponent implements OnInit, OnDestroy {
  sysAreas: any[] = [];
  customArea: any[] = [];

  nzSelectedIndex = 0;
  loading = false;
  resourceUrl: string = `${API_URL}/video-ai/customArea`;

  selectedRows = [];
  selectedSysRows = [];

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: NzModalRef,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {

  }

  /**
   * 加载列表数据
   */
  load() {
    this.loading = true;
    this.queryList().pipe(
      map((res: any) => {
        return res;
      }
      ),
      tap(() => (this.loading = false)),
    )
      .subscribe(res => {
        this.sysAreas = res.data.sysAreas;
        this.customArea = res.data.customArea;
        console.log(res);
      });
  }


  /**
   * 提交
   */
  submit() {
    let areaNames = "";
    let areaCodes = [];
    if (this.nzSelectedIndex == 0) {
      let list = this.sysAreas.filter(p => p.checked);
      list.forEach(i => {
        areaNames += i.text + ",";
        areaCodes.push(i.value);
      });
    } else {
      let selected = this.customArea.filter(p => p.checked);
      if (selected != null && selected.length == 1) {
        areaNames = selected[0].text;
        let list = selected[0].value.split(",");
        list.forEach(i => {
          areaCodes.push(i);
        });
      } else {
        this.msg.error("自定义区域只能选择一个！");
        return;
      }
    }
    console.log(areaCodes);
    if (areaCodes == null || (areaCodes != null && areaCodes.length == 0)) {
      this.msg.error("请选择");
      return;
    }
    let result = {
      areaNames,
      areaCodes
    };
    this.modal.close(result);
  }

  checkChange(e, index) {
    if (e) {
      this.customArea[index].checked = true;
    } else {
      this.customArea[index].checked = false;
    }
  }

  checkSysChange(e, index) {
    if (e) {
      this.sysAreas[index].checked = true;
    } else {
      this.sysAreas[index].checked = true;
    }
  }

  close() {
    this.modal.destroy();
  }

  queryList(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/get`);
  }
}

