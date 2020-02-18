import { Component } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { NzMessageService, NzModalRef, UploadFile, UploadFilter } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-shared-importExcel',
  styles: [`
  .active {
    background: #1890FF;
    color: #fff;
  }
  `],
  templateUrl: './importExcel.html',
})
export class ImportExcelComponent {
  query: any = {
    importUrl: '',
    templateUrl: ''
  };
  nzSize = 5120;//kb
  uploading = false;
  fileList: UploadFile[] = [];

  constructor(
    private http: HttpClient,
    private modal: NzModalRef,
    public msg: NzMessageService
  ) {
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  filters: UploadFilter[] = [
    {
      name: 'type',
      fn: (fileList: UploadFile[]) => {
        const filterFiles = fileList.filter(w => w.name.indexOf('.xlsx') > 0 || w.name.indexOf('.xls') > 0);
        if (filterFiles.length !== fileList.length) {
          this.msg.error(`包含文件格式不正确，只支持 .xlsx .xls 格式`);
          return filterFiles;
        }
        return fileList;
      }
    },
    {
      name: 'async',
      fn: (fileList: UploadFile[]) => {
        return new Observable((observer: Observer<UploadFile[]>) => {
          // doing
          observer.next(fileList);
          observer.complete();
        });
      }
    }
  ];

  close() {
    this.modal.destroy();
  }

  /**
   * 上传
   */
  handleUpload(): void {
    if (this.fileList.length == 0) {
      this.msg.error("上传文件不能为空");
      return;
    }
    if (this.fileList.length != 1) {
      this.msg.error("最多只能上传1个文件");
      return;
    }
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    this.uploading = true;
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', this.query.importUrl, formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        (res) => this.onSuccess(res),
        (res) => this.onError(res)
      );
  }

  onSuccess(res) {
    this.uploading = false;
    let data: any = res.body;
    if (+data.code !== 200) {
      this.msg.error(data.message);
      return;
    }
    this.fileList = [];
    this.msg.success('上传成功');
    this.modal.close(true);
  }

  onError(res) {
    this.uploading = false;
    this.msg.error('上传失败');
  }
}

