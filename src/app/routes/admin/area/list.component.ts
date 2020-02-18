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
import { AreaService } from './area.service';
import { DatePipe } from '@angular/common';
import { AreaEditComponent } from './edit.component';

@Component({
  selector: 'app-area-list',
  templateUrl: './list.component.html',
})
export class AreaListComponent implements OnInit, OnDestroy {

  listOfMapData: any = [

  ];
  mapOfExpandedData = {};
  loading = false;

  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: ModalHelper,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private areaService: AreaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnDestroy() {

  }

  /**
   * 修改
   * @param item 
   */
  edit(item) {
    this.areaService.find(item.data.id).subscribe(res => {
      let area = res;
      this.modal
        .createStatic(AreaEditComponent, { area }, { size: 800 })
        .subscribe(res => {
          this.load();
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
      nzContent: '你确定要删除“' + (item ? item.data.name : '') + '”吗？',
      nzOkText: '确定',
      nzCancelText: '取消',
      nzOnOk: () => {
        if (item.data.id == null || item.data.id == '0') {
          this.msg.error(`区域ID不能为空！`)
        }
        else {
          this.areaService.delete(item.data.id).subscribe(res => {
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
  add(item?: any) {
    //新增下级
    if (item && item != null) {
      this.areaService.find(item.data.id).subscribe(res => {
        let responseData = res;
        let area: any = {};
        area.id = null;
        area.parentId = responseData.id;
        area.parentName = responseData.name;
        area.type = (parseInt(responseData.type + '') + 1) + '';
        this.modal
          .createStatic(AreaEditComponent, { area }, { size: 800 })
          .subscribe(res => {
            this.load();
          });
      });
    }
    //新增
    else {
      let area: any = {};
      area.parentId = '0';
      area.parentName = '国家';
      this.modal
        .createStatic(AreaEditComponent, { area }, { size: 800 })
        .subscribe(res => {
          this.load();
        });
    }
  }

  collapse(array: any[], data: any, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.data.id === d.data.id);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: object): any[] {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: true });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level + 1, expand: false, parent: node });
        }
      }
    }
    return array;
  }

  visitNode(node: any, hashMap: object, array: any[]): void {
    if (!hashMap[node.data.id]) {
      hashMap[node.data.id] = true;
      array.push(node);
    }
  }

  query: any = {};
  ngOnInit() {
    this.load();
  }
  load() {
    this.loading = true;
    this.areaService.query(
      {
        query: this.query
      }
    ).pipe(
      tap(() => (this.loading = false)))
      .subscribe(res => {
        this.listOfMapData = res.data;
        this.listOfMapData.forEach(item => {
          this.mapOfExpandedData[item.data.id] = this.convertTreeToList(item);
        });
      });
  }

  reset() {
    setTimeout(() => this.load());
  }

}



