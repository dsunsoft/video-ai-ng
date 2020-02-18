import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { SysUserService } from './sysUser.service';
import { PAGE_SIZE, ST_PAGE } from '@shared';
import { SysUserListEditComponent } from './edit.component';
import { API_URL, FILE_URL } from '../../../app.constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
})
export class SysUserListComponent implements OnInit, OnDestroy {
  query: any = {
    pageIndex: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    sorter: '',
    status: null,
    statusList: [],
  };
  data: any[] = [];
  loading = false;
  ST_PAGE: any = ST_PAGE;
  FILE_URL = FILE_URL;

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '序号', type: 'no', width: '4%' },
    // {
    //   title: '头像', index: 'photoUrl', type: 'img', width: '10%',
    // },
    { title: '用户名', index: 'loginName', width: '10%' },
    {
      title: '姓名', index: 'name', width: '10%',
      sorter: (a: any, b: any) => true
    },
    { title: '角色', index: 'roleNames', width: '8%' },
    {
      title: '电话', index: 'phone', width: '12%',
      sorter: (a: any, b: any) => true
    },
    {
      title: '手机', index: 'mobile', width: '12%',
      sorter: (a: any, b: any) => true
    },
    {
      title: '归属公司', index: 'company.name', width: '10%',
      sorter: (a: any, b: any) => true
    },
    {
      title: '归属部门', index: 'office.name', width: '10%',
      sorter: (a: any, b: any) => true
    },
    {
      title: '操作', width: '8%',
      buttons: [
        {
          text: '修改',
          click: (item: any) => this.edit(item),
        },
        {
          text: '删除',
          click: (item: any) => this.del(item),
          iif: (item:any) => item.loginName != 'admin'
        }
      ],
    },
  ];
  selectedRows: STData[] = [];

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private sysUserService: SysUserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // this.getData();
    this.load();
  }
  ngOnDestroy() {

  }

  load() {
    this.loading = true;
    this.sysUserService.query(
      {
        query: this.query
      }
    ).pipe(
      map((res: any) => {
        return res.data;
      }
      ),
      tap(() => (this.loading = false)),
    )
      .subscribe(res => {
        this.data = res.list;
        this.data.map(ele => {
          ele.photoUrl = this.FILE_URL + ele.photo;
          return ele;
        });
        this.query.total = res.total;
        this.cdr.detectChanges();
      });
  }

  edit(sysUser: any = {}) {
    this.modal
      .createStatic(SysUserListEditComponent, { sysUser }, { size: 1000 })
      .subscribe(res => {
        if (sysUser.id) {
          sysUser = Object.assign(sysUser, { id: sysUser.id }, res);
          //刷新列表
          this.st.reload();
        } else {
          this.load();
        }
        this.cdr.detectChanges();
      });
  }

  /**
  * 新增
  * @param item 
  */
  add() {
    let sysUser: any = { company: {}, office: {} };
    this.modal
      .createStatic(SysUserListEditComponent, { sysUser }, { size: 1000 })
      .subscribe(res => {
        this.load();
      });
  }

  /**
   * 删除
   * @param item 
   */
  del(item?: any): void {
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '你确定要删除“' + (item ? item.name : '') + '”吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        this.sysUserService.delete(item.id).subscribe(res => {
          // 
          this.msg.success(`删除成功！`)
          this.load();
        });;
      }
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

  reset() {
    // wait form reset updated finished
    setTimeout(() => this.load());
  }
}

