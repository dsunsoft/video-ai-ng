import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService, NzModalRef } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { Lodop, LodopService } from '@delon/abc';
import { LODOP_COG } from '../../contants/common.constants';

@Component({
  selector: 'app-shared-choose-printer',
  styles: [`
  .active {
    background: #1890FF;
    color: #fff;
  }
  `],
  templateUrl: './choosePrinter.html',
})
export class ChoosePrinterComponent implements OnInit, OnDestroy {
  query: any = {};
  loading = false;

  lodopCog = LODOP_COG;
  error = false;
  lodop: Lodop = null;
  printer: any[] = [];

  constructor(
    private modal: NzModalRef,
    public msg: NzMessageService,
    public lodopSrv: LodopService
  ) {
    this.lodopSrv.cog = this.lodopCog;
    this.lodopSrv.lodop.subscribe(({ lodop, ok }) => {
      if (!ok) {
        this.error = true;
        this.msg.error(`打印机加载失败！`);
        return;
      }
      this.error = false;
      this.lodop = lodop;
      this.printer = this.lodopSrv.printer;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  /**
   * 提交
   */
  submit() {
    if (this.query.printer == null || this.query.printer == "") {
      this.msg.error("请选择打印机！");
      return;
    }
    this.modal.close(this.query.printer);
  }

  close() {
    this.modal.destroy();
  }

}

