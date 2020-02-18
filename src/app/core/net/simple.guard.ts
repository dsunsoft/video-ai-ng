/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, Inject, Optional, Injectable, Injector } from '@angular/core';
import { DelonAuthConfig,DA_SERVICE_TOKEN, ITokenService,SocialOpenType } from '@delon/auth';
import * as i0 from "@angular/core";
import { SettingsService, _HttpClient,MenuService } from '@delon/theme';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import 'url-search-params-polyfill';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '../startup/startup.service';
import { API_URL } from '../../app.constants';
import { CacheService  } from '@delon/cache';

@Injectable()
export class SimpleGuard {
    /**
     * @param {?} srv
     * @param {?} injector
     * @param {?} cog
     */
    constructor(
        private settingsService: SettingsService,
        private router: Router,
        @Optional()
        @Inject(ReuseTabService)
        private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private startupSrv: StartupService,
        private menuService: MenuService,
        private cacheService: CacheService,
        public http: _HttpClient,
        public msg: NzMessageService,
        @Inject(DA_SERVICE_TOKEN) private srv: ITokenService,
        private injector: Injector,
        @Inject(DelonAuthConfig) private cog:DelonAuthConfig
    ) {
      
        this.cog = Object.assign({}, new DelonAuthConfig(), cog);
    }

    url: any;
    /**
     * @return {?}
     */
    process() {
        /** @type {?} */
        const res = CheckSimple(this.srv.get());
        if (!res) {
            ToLogin(this.cog, this.injector, this.url);
        }
        return res;
    }
    // lazy loading
    /**
     * @param {?} route
     * @param {?} segments
     * @return {?}
     */
    canLoad(route, segments) {
        this.url = route.path;
        return this.process();
    }
    // all children route
    /**
     * @param {?} childRoute
     * @param {?} state
     * @return {?}
     */
    canActivateChild(childRoute, state) {
        this.url = state.url;
        return this.process();
    }
    // route
    /**
     * @param {?} route
     * @param {?} state
     * @return {?}
     */
    canActivate(route, state) {
        this.url = state.url;
        return this.process();
    }

   
}



/**
 * @param {?} model
 * @return {?}
 */
export function CheckSimple(model) {
    return (model != null && typeof model.token === 'string' && model.token.length > 0);
}
/**
 * @param {?} model
 * @param {?} offset
 * @return {?}
 */
export function CheckJwt(model, offset) {
    return model != null && model.token && !model.isExpired(offset);
}
/**
 * @param {?} options
 * @param {?} injector
 * @param {?} url
 * @return {?}
 */
export function ToLogin(options, injector, url) {
    ((/** @type {?} */ (injector.get(DA_SERVICE_TOKEN)))).referrer.url = url;
    if (options.token_invalid_redirect === true) {
        setTimeout(() => {
            if (/^https?:\/\//g.test(options.login_url)) {
                injector.get(DOCUMENT).location.href = options.login_url;
            }
            else {
                injector.get(Router).navigate([options.login_url]);
            }
        });
    }
}