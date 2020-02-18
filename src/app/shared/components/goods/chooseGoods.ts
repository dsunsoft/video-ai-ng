import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService, NzModalRef, NzTreeNode } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { API_URL } from '../../../app.constants';
import { STColumn, STChange, STData } from '@delon/abc';
import { Observable } from 'rxjs';
import { PAGE_SIZE_CHOOSE, ST_PAGE, ENABLE_STATUS, SHI_FOU_INT } from '../../contants/common.constants';

@Component({
  selector: 'app-shared-chooseGoods',
  styles: [`
  .active {
    background: #1890FF;
    color: #fff;
  }
  `],
  templateUrl: './chooseGoods.html',
})
export class ChooseGoodsComponent implements OnInit, OnDestroy {

  resourceUrl: string = `${API_URL}/video-ai/basicGoods`;
  query: any = {
    pageIndex: 1,
    pageSize: 10,
    total: 0,
  };
  //状态
  useFlagList = [...ENABLE_STATUS];
  //赠品
  isGiftList = [...SHI_FOU_INT];
  //贴单
  isStickList = [...SHI_FOU_INT];

  // 商品类别Pid
  goodsTypePid: any = "413d78b788354a0a99d24d0583718cfe";
  ST_PAGE = ST_PAGE;
  loading = false;
  selectedRows: STData[] = [];
  columns: STColumn[] = [
    { title: '选择', type: 'radio' },
    { title: '商品编码', index: 'goodsCode', width: '180px', sort: true },
    { title: '商品名称', index: 'goodsName', render: "goodsName", width: '200px', sort: true },
    { title: '型号', index: 'goodsModel', width: '150px', sort: true },
    { title: '客户', index: 'sellerName', width: '100px', sort: true },
    { title: '商品类别', index: 'goodsTypeName' },
    { title: '体积(m³)', index: 'goodsVolume', sort: true },
    { title: '重量(kg)', index: 'goodsWeight', sort: true }
    //{ title: '赠品', index: 'isGiftName' }

  ];

  data: any[] = [];

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
    this.query.pageSize = 10;
    this.querySellerGoods({ query: this.query }).pipe(
      map((res: any) => {
        res.data.list.forEach(i => {
          i.longGoodsName = i.goodsName;
          i.goodsName = this.cutStr(i.goodsName, 10);
          i.goodsModel = this.cutStr(i.goodsModel, 10);
        });
        return res;
      }
      ),
      tap(() => (this.loading = false)),
    )
      .subscribe(res => {
        this.data = res.data.list;
        this.query.total = res.data.total;
        this.cdr.detectChanges();
      });

  }


  stChange(e: STChange) {
    switch (e.type) {
      case 'radio':
        this.selectedRows = [];
        this.selectedRows.push(e.radio);
        this.cdr.detectChanges();
        break;
      case 'checkbox':
        this.selectedRows = e.checkbox;
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.load();
        break;
      case 'sort':
        this.query.orderBy = e.sort.column.indexKey + ' ' + (e.sort.value == 'descend' ? 'desc' : 'asc');
        this.load();
        break;
      case 'pi':
        this.query.pageIndex = e.pi;
        this.load();
        break;
      case 'ps':
        this.query.pageSize = e.ps;
        this.load();
        break;
    }
  }

  /**
   * 提交
   */
  submit() {
    if (this.selectedRows == null || (this.selectedRows != null && this.selectedRows.length == 0)) {
      this.msg.error("请选择");
      return;
    }
    this.modal.close(this.selectedRows);
  }

  close() {
    this.modal.destroy();
  }

  querySellerGoods(req?: any): Observable<any> {
    let body = req.query || {};
    let options: any = {
    };
    //过滤为null值的条件
    for (const key in body) {
      if (null == body[key]) {
        body[key] = '';
      }
    }
    return this.http.get(`${this.resourceUrl}/get`, body, options);
  }

  reset() {
    setTimeout(() => this.load());
  }

  cutStr(value: string, maxLength: number) {
    if (value == "" || value == null) {
      return "";
    }
    var len = 0;
    var cnLen = 0;
    for (var i = 0; i < value.length; i++) {
      // 判断是否中文字符
      if (value.charCodeAt(i) > 127 || value.charCodeAt(i) == 94) {
        len += 2;
        cnLen += 2;
      } else {
        len++;
      }
    }
    if (len <= maxLength) {
      return value;
    }
    if (cnLen > maxLength) {
      return value.substr(0, maxLength) + "...";
    }
    return value.substr(0, maxLength + 3) + "...";
  }
}

