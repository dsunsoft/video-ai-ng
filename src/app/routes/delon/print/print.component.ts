import { Component } from '@angular/core';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { Lodop, LodopService } from '@delon/abc';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
})
export class PrintComponent {
  //配置
  cog: any = {
    url: 'http://localhost:8000/CLodopfuncs.js',
    companyName: "武汉鼎盛数码科技有限公司",
    license: "2A75DA258EE17DE8CFDB9EE8A683CAE0",
  };
  context: any = {
    url: 'http://localhost:8000/CLodopfuncs.js',
    printer: '',
    paper: '',
    html: `
      <h1>Title</h1>
      <p>这~！@#￥%……&*（）——sdilfjnvn</p>
      <p>这~！@#￥%……&*（）——sdilfjnvn</p>
      <p>这~！@#￥%……&*（）——sdilfjnvn</p>
      <p>这~！@#￥%……&*（）——sdilfjnvn</p>
      <p>这~！@#￥%……&*（）——sdilfjnvn</p>
    `,
  };
  error = false;
  lodop: Lodop = null;
  pinters: any[] = [];
  papers: string[] = [];

  constructor(
    public lodopSrv: LodopService,
    private msg: NzMessageService,
    private notify: NzNotificationService,
  ) {
    this.lodopSrv.cog = this.cog;
    this.lodopSrv.lodop.subscribe(({ lodop, ok }) => {
      if (!ok) {
        this.error = true;
        return;
      }
      this.error = false;
      this.msg.success(`打印机加载成功`);
      this.lodop = lodop;
      this.pinters = this.lodopSrv.printer;
    });
  }

  reload(options: any = { url: 'http://localhost:8000/CLodopfuncs.js' }) {
    this.pinters = [];
    this.papers = [];
    this.context.printer = '';
    this.context.paper = '';

    this.lodopSrv.cog = Object.assign({}, this.context, options);
    this.error = false;
    if (options === null) this.lodopSrv.reset();
  }

  changePinter(name: string) {
    this.papers = this.lodop.GET_PAGESIZES_LIST(name, '\n').split('\n');
  }

  printing = false;
  print(isPrivew = false) {
    const LODOP = this.lodop;
    LODOP.PRINT_INITA(10, 20, 810, 610, '测试C-Lodop远程打印四步骤');
    LODOP.SET_PRINTER_INDEXA(this.context.printer);
    LODOP.SET_PRINT_PAGESIZE(0, 0, 0, this.context.paper);
    LODOP.ADD_PRINT_TEXT(
      1,
      1,
      300,
      200,
      '下面输出的是本页源代码及其展现效果：',
    );
    LODOP.ADD_PRINT_TEXT(20, 10, '90%', '95%', this.context.html);
    LODOP.SET_PRINT_STYLEA(0, 'ItemType', 4);
    LODOP.NewPageA();
    LODOP.ADD_PRINT_HTM(20, 10, '90%', '95%', this.context.html);
    if (isPrivew) LODOP.PREVIEW();
    else LODOP.PRINT();
  }

  code = `LODOP.PRINT_INITA(10,10,762,533,"测试套打");
  LODOP.ADD_PRINT_TEXT(38,78,408,30,"{{标题}}");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
  LODOP.SET_PRINT_STYLEA(0,"FontColor","#800000");
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(259,579,100,23,"{{费用}}");
  LODOP.ADD_PRINT_TEXT(260,520,58,24,"合计：");`;
  doing = false;

  design() {
    this.lodopSrv.attachCode(this.code);
    this.doing = true;
    this.lodopSrv.design().then((code) => {
      this.code = code;
      this.doing = false;
    });
  }

  setup() {
    this.lodopSrv.attachCode(this.code);
    this.lodop.PRINT_SETUP();
  }

  print1() {
    this.lodopSrv.attachCode(this.code, this.context);
    this.lodop.PREVIEW();
  }

  printBatch() {
    this.doing = true;
    const data = new Array(3).fill({}).map((item, index) => Object.assign({ index: index + 1 }, this.context));
    this.lodopSrv.print(this.code + `
    LODOP.ADD_PRINT_TEXT(10,10,100,100,"第{{index}}张");
    `, data);
    const batch$ = this.lodopSrv.events.subscribe((res) => {
      console.log('finish', res);
      if (res.item.index === data.length - 1) {
        this.msg.success(`全部打印完成`);
        this.doing = false;
        batch$.unsubscribe();
      }
    });
  }
}
