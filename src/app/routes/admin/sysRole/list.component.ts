/**
 * 菜单管理
 * @zb
 * 2019-03-14 11:43
 */
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { SysRoleService } from './sysRole.service';
import { DatePipe } from '@angular/common';
import { SysRoleEditComponent } from './edit.component';
import { PAGE_SIZE, ST_PAGE, ChooseMenuComponent } from '@shared';

@Component({
  selector: 'app-sysrole-list',
  templateUrl: './list.component.html',
})
export class SysRoleListComponent implements OnInit, OnDestroy {

  query: any = {
    pageIndex: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    sorter: '',
  };
  data: any[] = [];
  loading = false;
  ST_PAGE: any = ST_PAGE;
  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'roleId', type: 'checkbox' },
    {
      title: '角色名称', index: 'roleName'
      ,sort: true
    },
    {
      title: '英文名称', index: 'roleCode'
      ,sort: true
    },
    {
      title: '角色类型', index: 'roleType'
      ,sort: true
    },
    {
      title: '角色描述', index: 'roleDesc'
      ,sort: true
    },
    {
      title: '操作',
      buttons: [
        {
          text: '修改',
          click: (item: any) => this.edit(item),
        },
        {
          text: '删除',
          click: (item: any) => this.del(item),
        },
        {
          text: '角色权限',
          click: (item: any) => this.setRoleMenu(item),
        }
      ],
    },
  ];
  selectedRows: STData[] = [];

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: ModalHelper,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private sysRoleService: SysRoleService,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * 修改
   * @param item 
   */
  edit(item) {
    this.sysRoleService.find(item.roleId).subscribe(res => {
      if (res.code == 200) {
        let sysRole = res.data;
        this.modal
          .createStatic(SysRoleEditComponent, { sysRole }, { size: 800 })
          .subscribe(res => {
            this.load();
          });
      }
      else {
        this.msg.error(`未获取到数据！`)
      }
    });
  }

  /**
   * 角色菜单权限设置
   * @param item 
   */
  setRoleMenu(item) {
    let query = item;
    query.multiple = true;
    this.modal
      .createStatic(ChooseMenuComponent, { query }, { size: 300 })
      .subscribe(res => {
        let menuIds = [];
        for (let i = 0; i < res.length; i++) {
          menuIds.push(res[i].key);
        }
        let sysRole: any = {};
        sysRole.roleId = item.roleId;
        sysRole.menuIds = menuIds;
        this.sysRoleService.saveRoleMenu(sysRole).subscribe(res => {
          if (+res.code !== 200) {
            this.msg.error('设置角色权限失败！');
            return;
          }
          this.msg.success('设置角色权限成功！');
          this.load();
        }, () => {
          this.msg.error('设置角色权限失败！');
          return;
        });
      });
  }
  /**
   * 删除
   * @param item 
   */
  del(item) {
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '你确定要删除“' + (item ? item.roleName : '') + '”吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        if (item.roleId == null || item.roleId == '0') {
          this.msg.error(`角色ID不能为空！`)
        }
        else {
          this.sysRoleService.delete(item.roleId).subscribe(res => {
            if (res.code == 200) {
              this.msg.success(`删除成功！`)
              this.load();
            }
            else {
              this.msg.error(`删除失败！`)
            }
          });
        }
      }
    });
  }
  /**
   * 新增
   * @param item 
   */
  add() {
    let sysRole: any = {};
    this.modal
      .createStatic(SysRoleEditComponent, { sysRole }, { size: 800 })
      .subscribe(res => {
        this.load();
      });
  }


  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {

  }
  load() {
    this.loading = true;
    this.sysRoleService.query(
      {
        query: this.query
      }
    )
      .pipe(
        map((res: any) => {
          return res.data;
        }
        ),
        tap(() => (this.loading = false)),
      )
      .subscribe(res => {
        this.data = res.list;
        this.query.total = res.total;
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

  reset() {
    // wait form reset updated finished
    setTimeout(() => this.load());
  }

}



