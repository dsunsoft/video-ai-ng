import { SettingsService, _HttpClient,MenuService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import 'url-search-params-polyfill';
import {
  SocialService,
  SocialOpenType,
  ITokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core';
import { API_URL } from '../../../app.constants';
import { CacheService  } from '@delon/cache';
// import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;

  constructor(
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    private menuService: MenuService,
    private cacheService: CacheService,
    public http: _HttpClient,
    public msg: NzMessageService,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // #region fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }

  // #endregion

  switch(ret: any) {
    this.type = ret.index;
  }

  // #region get captcha

  count = 0;
  interval$: any;

  getCaptcha() {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) clearInterval(this.interval$);
    }, 1000);
  }

  // #endregion

  submit() {
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) return;
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) return;
    }

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.http
      .post('/login/account?_allow_anonymous=true', {
        type: this.type,
        userName: this.userName.value,
        password: this.password.value,
      })
      .subscribe((res: any) => {
        if (res.msg !== 'ok') {
          this.error = res.msg;
          return;
        }
        // 清空路由复用信息
        this.reuseTabService.clear();
        // 设置用户Token信息
        this.tokenService.set(res.user);
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        this.startupSrv.load().then(() => {
          let url = this.tokenService.referrer.url || '/';
          if (url.includes('/passport')) url = '/';
          this.router.navigateByUrl(url);
        });
      });
  }


  login() {
    let credentials: any;
    // 如果是手机号登陆则需要验证手机号、密码和短信验证码
    this.error = '';
      if (this.type === 0) {
        this.userName.markAsDirty();
        this.userName.updateValueAndValidity();
        this.password.markAsDirty();
        this.password.updateValueAndValidity();
        if (this.userName.invalid || this.password.invalid) return;
        credentials = {
          tel:this.userName.value,
          pwd: this.password.value,
          isTelLogin: true
         }
        // credentials = {
        //   // AD域用户名
        //   userName: this.userName.value,
        //   pwd: this.password.value,
        //   isTelLogin: false
        //  }
      } else {
        this.mobile.markAsDirty();
        this.mobile.updateValueAndValidity();
        this.captcha.markAsDirty();
        this.captcha.updateValueAndValidity();
        if (this.mobile.invalid || this.captcha.invalid) return;
        credentials = {
          tel:this.userName.value,
          pwd: this.password.value,
          isTelLogin: true
      }
      }
      let data = new URLSearchParams();
      data.append('grant_type', 'password');
      // 如果是ad域用户登录，则给默认密码
      if(!credentials.isTelLogin) {
          data.append('username', credentials.userName);
          data.append('password', credentials.pwd);
          // data.append('password', "cqhzzaduser");
      }
      else {
          data.append('username', credentials.tel);
          data.append('password', credentials.pwd);
          data.append('smsCode', credentials.smsCode);
      }
      let headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
          // 默认使用cqhzz的授权码
          'Authorization' : 'Basic ZHN1bnNvZnQ6ZHN1bnNvZnQ='
      });
      let formData:any = {
        'grant_type': 'password',
        'username': credentials.userName,
        'password': credentials.pwd
      };
      return this.http.post(`${API_URL}/oauth/token?_allow_anonymous=true`,data.toString(), {},  {
        headers
      }).subscribe((resp:any) => {
          let accessToken = resp['access_token'];
          if (accessToken) {
              // 清空路由复用信息
              this.reuseTabService.clear();
              // 设置用户Token信息
              this.tokenService.set({token:'Bearer '+accessToken});
              this.http.post(`${API_URL}/video-ai/sysUser/getMenu`, credentials).subscribe((resp:any) => {
                // if(resp.code == 200) {
                //   let reponseData:any = resp.data;
                //   this.tokenService.set({token:'Bearer '+accessToken,account:reponseData});
                //   console.log(reponseData.menuTreeList);
                //   this.menuService.add(reponseData.menuTreeList);
                // }
                if(resp.code == 200) {
                  let reponseData:any = resp.data;
                  this.tokenService.set({token:'Bearer '+accessToken,account:reponseData});
                  this.menuService.add(reponseData.menuTreeList);
                  this.cacheService.remove("account");
                  this.cacheService.set("account",reponseData,{type:'m',expire:1800});
                    // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
                  this.startupSrv.load().then(() => {
                    let url = this.tokenService.referrer.url || '/';
                    if (url.includes('/passport')) url = '/';
                    this.router.navigateByUrl(url);
                  });
                }
                else {
                  this.msg.error('获取菜单失败！');
                }
              })
          }
      });
}


  // #region social

  open(type: string, openType: SocialOpenType = 'href') {
    let url = ``;
    let callback = ``;
    if (environment.production) {
      callback = 'https://ng-alain.github.io/ng-alain/#/callback/' + type;
    } else {
      callback = 'http://localhost:4200/#/callback/' + type;
    }
    switch (type) {
      case 'auth0':
        url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
      case 'github':
        url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
      case 'weibo':
        url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(
          callback,
        )}`;
        break;
    }
    if (openType === 'window') {
      this.socialService
        .login(url, '/', {
          type: 'window',
        })
        .subscribe(res => {
          if (res) {
            this.settingsService.setUser(res);
            this.router.navigateByUrl('/');
          }
        });
    } else {
      this.socialService.login(url, '/', {
        type: 'href',
      });
    }
  }

  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) clearInterval(this.interval$);
  }
}
