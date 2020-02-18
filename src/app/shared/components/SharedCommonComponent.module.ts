import { NgModule } from '@angular/core';

import { SharedModule } from '../shared.module';
import { ChooseMenuComponent } from './menu';
import { ChooseOfficeComponent } from './office';
import { ChooseGoodsComponent } from './goods';
import { ChooseSellerComponent } from './seller';
import { ChooseSellerMultipleComponent } from './sellerMultiple';
import { PrinterSettingComponent } from './printerSetting';
import { DicComponent } from './dic.component';
import { SelectWarehouseComponent } from './selectWarehouse.component';
import { SelectSellerOrgComponent } from './selectSellerOrg.component';
import { SelectLogisticsCompanyComponent } from './selectLogisticsCompany.component';
import { JsonPipe } from './json.pipe';
import { BaseService } from './base.service';
import { BaseInterfaceService } from './baseInterface.service';
import { ImportExcelComponent } from './importExcel'
import { SelectFullAreaComponent } from './selectFullArea.component';
import { SelectProvinceComponent } from './selectProvince.component';
import { SelectCityAreaComponent } from './selectCityArea.component';
import { ChooseUserComponent } from './user';
import { ChooseCustomAreaComponent } from './customArea/chooseCustomArea'
import { ChoosePrinterComponent } from './choosePrinter';
import { SelectYearPeriodComponent } from './selectYearPeriod.component';

/**
 * 组件页面
 */
const COMPONENTS = [
  ChooseMenuComponent,
  ChooseOfficeComponent,
  ChooseGoodsComponent,
  ChooseSellerComponent,
  ChooseSellerMultipleComponent,
  PrinterSettingComponent,
  DicComponent,
  SelectWarehouseComponent,
  SelectSellerOrgComponent,
  SelectLogisticsCompanyComponent,
  ImportExcelComponent,
  SelectFullAreaComponent,
  SelectProvinceComponent,
  SelectCityAreaComponent,
  ChooseUserComponent,
  ChooseCustomAreaComponent,
  ChoosePrinterComponent,
  SelectYearPeriodComponent,
];
/**
 * service
 */
const SSERVICES = [
];

@NgModule({
  imports: [SharedModule],
  declarations: [...COMPONENTS, JsonPipe],
  entryComponents: [...COMPONENTS],
  providers: [...SSERVICES, JsonPipe, BaseService],
  exports: [...COMPONENTS, JsonPipe]
})
export class SharedCommonComponentModule { }
