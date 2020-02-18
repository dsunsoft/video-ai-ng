import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService, NzModalRef, NzTreeNode } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { Lodop, LodopService } from '@delon/abc';
import { tap, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { API_URL } from '../../../app.constants';
import { LODOP_COG } from '../../contants/common.constants';
import { SHI_FOU } from '../../contants/common.constants';

@Component({
  selector: 'app-shared-printerSetting',
  styles: [`
  .active {
    background: #1890FF;
    color: #fff;
  }
  `],
  templateUrl: './printerSetting.html',
})
export class PrinterSettingComponent implements OnInit, OnDestroy {
  private resourceUrl = `${API_URL}/video-ai/printerSetting`;
  query: any = {};
  loading = false;

  data: any = {};
  lodopCog = LODOP_COG;
  error = false;
  lodop: Lodop = null;
  printer: any[] = [];

  shiFou = [...SHI_FOU];

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: NzModalRef,
    public msg: NzMessageService,
    public lodopSrv: LodopService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef
  ) {
    this.lodopSrv.cog = this.lodopCog;
    this.lodopSrv.lodop.subscribe(({ lodop, ok }) => {
      if (!ok) {
        this.error = true;
        this.msg.success(`打印机加载失败`);
        return;
      }
      this.error = false;
      this.lodop = lodop;
      this.printer = this.lodopSrv.printer;
    });
  }

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
    this.http.get(`${this.resourceUrl}/get`)
      .pipe(
        map((res: any) => {
          res.pickPrinter = this.lodop.GET_PAGESIZES_LIST(res.pickPrinter, '\n').split('\n');
          res.logisticPrinter = this.lodop.GET_PAGESIZES_LIST(res.logisticPrinter, '\n').split('\n');
          return res;
        }
        ),
        tap(() => (this.loading = false)),
      )
      .subscribe(res => {
        this.data = res.data;
      });
  }

  /**
   * 提交
   */
  submit() {
    if (this.data.pickPrinter == null || this.data.logisticPrinter == null || this.data.isPrintlogo == null) {
      this.msg.error("请输入完整信息！");
      return;
    }
    ;
    this.http.post(`${this.resourceUrl}/save`, this.data).subscribe(
      (res) => this.onSuccess(res),
      (res) => this.onError(res)
    );
  }

  onSuccess(res) {
    if (+res.code !== 200) {
      this.msg.error(res.message);
      return;
    }
    this.modal.close(this.data);
  }

  onError(res) {
    this.msg.error(res.error);
  }

  close() {
    this.modal.destroy();
  }

}

