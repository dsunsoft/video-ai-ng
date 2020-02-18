import { Component, OnInit,OnDestroy, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService,NzModalRef,NzTreeNode } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { API_URL } from '../../../app.constants';

@Component({
  selector: 'app-shared-choosemenu',
  styles:[`
  .active {
    background: #1890FF;
    color: #fff;
  }
  `],
  templateUrl: './chooseMenu.html',
})
export class ChooseMenuComponent implements OnInit, OnDestroy {
  query: any = {};
  
  loading = false;
  treeNodes = [];
  //当前节点
  activedNode: NzTreeNode;
  //指定选中的树节点
  nzSelectedKeys: string[] = [];
  //选中的节点值
  selectedNode: any[] = [];
  selectedAllNode: any[] = [];
  private resourceUrl = `${API_URL}/video-ai/sysMenu`;

  @ViewChild('nzTree')
  private nzTree:any;


  constructor(
    private http: _HttpClient,
    private datePipe: DatePipe,
    private modal: NzModalRef,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if(this.query.menuIdString != null && this.query.menuIdString.length>0) {
      this.nzSelectedKeys = this.query.menuIdString.split(',');
    }
    this.load();
  }
  ngOnDestroy(){

  }
  /**
   * 加载列表数据
   */
  load(){
    this.loading = true;
    let body = this.query
    this.http.post(`${this.resourceUrl}/getTree`, body)
    .pipe(
      map((res: any) =>{
          return res;
        }
      ),
      tap(() => (this.loading = false)),
    )
    .subscribe(res => {
        if(res.code == 200) {
            this.treeNodes = res.data;
            this.setSelected();
            this.cdr.detectChanges();
        }
        else {
            this.msg.error("加载数据失败！");
        }
    });
  }

  setSelected() { 
    if(this.nzSelectedKeys != null && this.nzSelectedKeys.length>0) {
      if(this.treeNodes && this.treeNodes.length>0) {
       for(let n=0;n<this.treeNodes.length;n++){
         this.getChildren(this.treeNodes[n], this.nzSelectedKeys);
       }
     }
    }
 }

  getChildren(node, arrId) {
    if(node) {
      for(let i=0;i<arrId.length;i++) {
        if(node.key == arrId[i] && !this.selectedContansKey(node)) {
          node.selected =true;
          this.selectedNode.push(node);
        }
      }
    }
    if(node && node.children) {
      for(let i=0; i<node.children.length; i++) {
        this.getChildren(node.children[i], arrId); 
      }
    }
  }

  selectedContansKey(node){
    let bl:Boolean = false;
    if(this.selectedNode) {
      for(let i=0;i<this.selectedNode.length;i++) {
        if(this.selectedNode[i].key == node.key) {
          bl = true;
          break;
        }
      }
    }
    return bl;
  }

  getParent(node) {
    if(node) {
      if(!this.contain(node) && node.key != '' && node.key != 'rootKey') {
        this.selectedAllNode.push(node);
      }
    }
      if(node && node.parentNode) {
        this.getParent(node.parentNode);
      }
  }

  contain(node) {
    let bl:Boolean = false;
    if(this.selectedAllNode) {
      for(let i=0;i<this.selectedAllNode.length;i++) {
        if(this.selectedAllNode[i].key == node.key) {
          bl = true;
          break;
        }
      }
    }
    return bl;
  }

  activeNode(data: any): void {
    data.node.isSelected = !data.node.isSelected;
    this.activedNode = data.node;
    this.selectedNode = this.nzTree.getSelectedNodeList();
  }

    /**
     * 提交
     */
    submit(){
      let nzSelectedNodeList:any[] = this.nzTree.getSelectedNodeList();
      if(nzSelectedNodeList == null  || (nzSelectedNodeList != null && nzSelectedNodeList.length == 0)) {
          this.msg.error("请选择");
          return;
      }
      //如果是多选，也返回半选择的数据
      if(this.query.multiple) {
        var arr = nzSelectedNodeList;
        if(arr != null) {
          for(let i=0; i< arr.length; i++) {
              this.getParent(arr[i]);
          }
        }
        this.selectedNode = this.selectedAllNode;
      }
      this.modal.close(this.selectedNode);
    }

    close() {
       this.modal.destroy();
    }


 



  
}

