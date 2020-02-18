//是否启用状态
export const ENABLE_STATUS = [
    { index: 0, text: '启用', value: '0', type: 'success', checked: false },
    { index: 1, text: '停用', value: '1', type: 'error', checked: false },
];

// 直播状态
export const LIVE_STATUS = [
    { index: 0, text: '开启', value: 1, type: 'success', checked: false },
    { index: 1, text: '暂停', value:2, type: 'warning', checked: false },
    { index: 1, text: '流量不足', value:2, type: 'error', checked: false },
];
// 设备状态
export const DEVICE_STATUS = [
    { index: 0, text: '正常', value: '0', type: 'success', checked: false },
    { index: 1, text: '异常', value: '1', type: 'error', checked: false },
];

//（1：含有最大值，2：含有最小值，3：区间内【有最小值，也有最大值】 ，4：其他【特殊计算，比如水温】）
export const WATER_QUALITY_RANGE_TYPE = [
    { index: 0, text: '含有最大值', value: 1, type: 'success', checked: false },
    { index: 1, text: '含有最小值', value: 2, type: 'success', checked: false },
    { index: 1, text: '区间内【有最小值，也有最大值】', value: 3, type: 'success', checked: false },
    { index: 1, text: '其他【特殊计算，比如水温】', value: 4, type: 'success', checked: false },
];

//设备指标类型
// ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
export const DEVICE_RANGE_TYPE: any = [
    { index: 0, text: '溶解氧', value: '1', unit: 'mg/l', color: '#c23531', column: 'dissolvedOxygen', type: 'default', checked: false },
    { index: 1, text: '浊度', value: '4', unit: 'NTU', color: '#2f4554', column: 'turbidity', type: 'default', checked: false },
    { index: 2, text: '电导率', value: '3', unit: 'mS/cm', color: '#61a0a8', column: 'conductivity', type: 'default', checked: false },
    { index: 3, text: '叶绿素', value: '13', unit: 'cells/mL', color: '#d48265', column: 'chlorophyll', type: 'default', checked: false },
    { index: 4, text: '化学需氧量', value: '6', unit: 'mg/m³', color: '#91c7ae', column: 'chemicalOxygen', type: 'default', checked: false },
    { index: 5, text: '酸碱度', value: '2', unit: 'ph', color: '#749f83', column: 'ph', type: 'default', checked: false },
    { index: 6, text: '氨氮', value: '5', unit: 'μg/l', color: '#ca8622', column: 'ammoniaNitrogen', type: 'default', checked: false },
    { index: 7, text: '温度', value: '0', unit: '℃', color: '#bda29a', column: 'temperature', type: 'default', checked: false },
];

//设备类型
export const DEVICE_TYPE: any = [
    { index: 0, text: '视频AI设备', value: 1,  type: 'success', checked: false },
    { index: 1, text: '四信RTU设备', value: 2,  type: 'success', checked: false }
];

//pageSize
export const PAGE_SIZE: number = 20;
//弹出窗选择分页
export const PAGE_SIZE_CHOOSE: number = 10;
//分页器
export const ST_PAGE: any = {
    total: true,
    front: false,
    showSize: true,
    pageSizes: [10, 20, 30, 40, 50],
    showQuickJumper: true
};
//分页器
export const ST_PAGE_ORDER: any = {
    total: true,
    front: false,
    showSize: true,
    pageSizes: [20, 30, 50, 100, 150],
    showQuickJumper: false
};
//交易平台
export const TRADE_PLATFORM = [
    { index: 0, text: '淘宝', value: 1, checked: false },
    { index: 1, text: '京东', value: 2, checked: false },
    { index: 2, text: '亚马逊', value: 3, checked: false },
    { index: 3, text: '苏宁', value: 4, checked: false },
    { index: 4, text: '拼多多', value: 5, checked: false },
    { index: 5, text: '小红书', value: 6, checked: false },
];
// 订单状态
export const ORDER_STATUS = [
    { index: 0, text: '待配货', value: '1', type: 'default', checked: false },
    { index: 1, text: '已配货', value: '2', type: 'processing', checked: false },
    { index: 2, text: '未发货', value: '4', type: 'warning', checked: false },
    { index: 3, text: '已发货', value: '5', type: 'success', checked: false },
    { index: 4, text: '交易关闭', value: '-1', type: 'error', checked: false },
];
//订单锁定类型
export const ORDER_LOCK_TYPE = [
    { index: 0, text: '是', value: '1', type: 'default', checked: false },
    { index: 1, text: '否', value: '0', type: 'error', checked: false },
];
//配货单状态
export const ORDER_PICK_STATUS = [
    { index: 0, text: '未打印', value: '1', type: 'default', checked: false },
    { index: 1, text: '已打印', value: '2', type: 'success', checked: false },
    { index: 2, text: '作废', value: '-1', type: 'error', checked: false },
];
//区域类型
export const AREA_TYPES = [
    { index: 0, text: '国家', value: '1', type: 'success', checked: false },
    { index: 1, text: '省份、直辖市', value: '2', type: 'success', checked: false },
    { index: 2, text: '地市', value: '3', type: 'success', checked: false },
    { index: 3, text: '区县', value: '4', type: 'success', checked: false },
];
//是否
export const SHI_FOU = [
    { index: 0, text: '是', value: '1', type: 'success', checked: false },
    { index: 1, text: '否', value: '0', type: 'default', checked: false },
];

export const SHI_FOU_INT = [
    { index: 0, text: '是', value: 1, type: 'success', checked: false },
    { index: 1, text: '否', value: 0, type: 'default', checked: false },
];


//lodop配置
export const LODOP_COG: any = {
    url: 'http://127.0.0.1:8000/CLodopfuncs.js',
    companyName: "武汉鼎盛数码科技有限公司",
    license: "2A75DA258EE17DE8CFDB9EE8A683CAE0",
};

//入库业务类型
export const BIZ_ORDER_TYPE: any = [
    { index: 0, text: '仓库入库', value: 'WMS', type: 'default', checked: false },
    { index: 1, text: '调拨入库', value: 'DBRK', type: 'default', checked: false },
    { index: 2, text: '残次品入库', value: 'CCRK', type: 'default', checked: false },
    { index: 3, text: '退货入库', value: 'THRK', type: 'default', checked: false },
    { index: 4, text: '换货入库', value: 'HHRK', type: 'default', checked: false },
    { index: 5, text: '采购入库', value: 'CGRK', type: 'default', checked: false },
    { index: 6, text: '其他入库', value: 'QTRK', type: 'default', checked: false },
];
//入库单类别
export const INWAREHOUSE_TYPE_LIST: any = [
    { index: 0, text: '正常入库', value: 1, type: 'default', checked: false },
    { index: 1, text: '刷单入库', value: 2, type: 'default', checked: false },
    { index: 2, text: '残次换包装维修入库', value: 3, type: 'default', checked: false }
];
//入库单类别新增页面
export const INWAREHOUSE_TYPE_LIST_ADD: any = [
    { index: 0, text: '正常入库', value: 1, type: 'default', checked: false },
    { index: 1, text: '刷单入库', value: 2, type: 'default', checked: false },
];
export const INWAREHOUSE_TYPE_LIST_EDIT: any = [
    { index: 0, text: '正常入库', value: 1, type: 'default', checked: false },
    { index: 1, text: '刷单入库', value: 2, type: 'default', checked: false },
    { index: 2, text: '残次换包装维修入库', value: 3, type: 'default', checked: false },
    { index: 3, text: '残次入库', value: 4, type: 'default', checked: false }
];
//出库类型
export const OUT_BIZ_ORDER_TYPE: any = [
    { index: 0, text: '仓库出库', value: 'WMS', type: 'default', checked: false },
    { index: 1, text: '交易出库', value: 'JYCK', type: 'default', checked: false },
    { index: 2, text: '普通出库', value: 'PTCK', type: 'default', checked: false },
    { index: 3, text: '调拨出库', value: 'DBCK', type: 'default', checked: false },
    { index: 4, text: '换货出库', value: 'HHCK', type: 'default', checked: false },
    { index: 5, text: '补发出库', value: 'BFCK', type: 'default', checked: false },
    { index: 6, text: '采购退货出库', value: 'CGTH', type: 'default', checked: false },
    { index: 7, text: '其他出库', value: 'QTCK', type: 'default', checked: false },
];

//是否入库单，出库单使用状态
export const USEFLAG_STATUS = [
    { index: 0, text: '正常', value: '0', type: 'success', checked: false },
    { index: 1, text: '作废', value: '1', type: 'error', checked: false },
];
//发货类型
export const LOGIS_TYPE = [
    { index: 0, text: '正常发货', value: 1, type: 'success', checked: false },
    { index: 1, text: '补发漏发', value: 2, type: 'warning', checked: false },
    { index: 2, text: '日常快递', value: 3, type: 'processing', checked: false },
];
//快递公司
export const LOGIS_COMPANY = [
    { index: 0, text: '邮政', value: 1, type: 'default', checked: false },
    { index: 1, text: '顺丰', value: 2, type: 'default', checked: false },
    { index: 2, text: '中通', value: 3, type: 'default', checked: false },
    { index: 3, text: '申通', value: 4, type: 'default', checked: false },
    { index: 4, text: '圆通', value: 5, type: 'default', checked: false },
    { index: 5, text: '韵达', value: 6, type: 'default', checked: false },
    { index: 7, text: 'EMS', value: 8, type: 'default', checked: false },
    { index: 8, text: '德邦', value: 9, type: 'default', checked: false },
];
// 截单/退货状态
export const RETURN_STATUS = [
    { index: 0, text: '成功', value: '2', type: 'success', checked: false },
    { index: 1, text: '失败', value: '-1', type: 'default', checked: false },
];
//退货责任方
export const RETURN_REASON = [
    { index: 0, text: '仓库原因退货', value: '1', type: 'default', checked: false },
    { index: 1, text: '买家退货', value: '2', type: 'default', checked: false },
    { index: 2, text: '快递原因退货', value: '3', type: 'default', checked: false },
    { index: 3, text: '其他仓库退货', value: '4', type: 'default', checked: false },
];
//仓储服务管理 计算类别
export const DISCOUNT_TYPE_LIST = [
    { index: 0, text: '体积法', value: 1, type: 'default', checked: false },
    { index: 1, text: '托盘法', value: 2, type: 'default', checked: false },
    { index: 2, text: '估算法', value: 3, type: 'default', checked: false },
];
//收费类型
export const CHARGE_TYPE = [
    { index: 0, text: '复新率', value: 1, type: 'default', checked: false },
    { index: 1, text: '阶梯价', value: 2, type: 'default', checked: false },
];
//计算方式
export const COMPUTE_TYPE = [
    { index: 0, text: '按台', value: 1, type: 'default', checked: false },
    { index: 1, text: '按体积', value: 2, type: 'default', checked: false },
];
//奇门日志处理状态
export const LOG_STATUS = [
    { index: 0, text: '成功', value: 1, type: 'success', checked: false },
    { index: 1, text: '失败', value: 0, type: 'error', checked: false },
    { index: 2, text: '待处理', value: 2, type: 'default', checked: false },
];

export const CALLERS = [
    { index: 0, text: 'erp', value: 'erp', type: 'default', checked: false },
    { index: 1, text: 'wms', value: 'wms', type: 'default', checked: false },
];
// 订单日志操作类型
export const OPER_TYPE = [
    { index: 0, text: '新增', value: 1, type: 'default', checked: false },
    { index: 1, text: '修改', value: 2, type: 'default', checked: false },
    { index: 2, text: '拆分合并', value: 3, type: 'default', checked: false },
    { index: 3, text: '配货', value: 4, type: 'default', checked: false },
    { index: 4, text: '配货打印', value: 5, type: 'default', checked: false },
    { index: 5, text: '预约快递单号', value: 6, type: 'default', checked: false },
    { index: 6, text: '快递单打印', value: 7, type: 'default', checked: false },
    { index: 7, text: '发货', value: 8, type: 'default', checked: false },
    { index: 8, text: '补发漏发', value: 9, type: 'default', checked: false },
    { index: 9, text: '截单', value: 10, type: 'default', checked: false },
    { index: 10, text: '退货', value: 11, type: 'default', checked: false },
    { index: 11, text: '配货单作废', value: 12, type: 'default', checked: false },
    { index: 12, text: '批量修改快递公司', value: 99, type: 'default', checked: false }
];
//仓库库区类型
export const WAREHOUSE_AREA_TYPE = [
    { index: 0, text: '存储区', value: 1, type: 'default', checked: false },
    { index: 3, text: '操作区', value: 5, type: 'default', checked: false },
];

// 物流状态
export const LOGISTICS_STATUS = [
    { index: 0, text: '未发货', value: 1, type: 'warning', checked: false },
    { index: 1, text: '已发货', value: 2, type: 'success', checked: false },
    { index: 2, text: '已签收', value: 3, type: 'processing', checked: false },
    { index: 3, text: '交易关闭', value: -1, type: 'error', checked: false },
];
// 日常快递状态
export const LOGISTICS_SELF_STATUS = [
    { index: 0, text: '未发货', value: 1, type: 'warning', checked: false },
    { index: 1, text: '已发货', value: 2, type: 'success', checked: false },
    { index: 2, text: '已签收', value: 3, type: 'processing', checked: false },
    { index: 3, text: '作废', value: -1, type: 'error', checked: false },
];

//售后问题类型
export const SALE_PROBLEM_TYPE = [
    { index: 0, text: '7天退换', value: 1, type: 'warning', checked: false },
    { index: 1, text: '退货退款', value: 2, type: 'warning', checked: false },
    { index: 2, text: '物品损坏', value: 3, type: 'warning', checked: false },
    { index: 3, text: '退款', value: 4, type: 'warning', checked: false },
    { index: 4, text: '快递截单', value: 5, type: 'warning', checked: false },
];

// 售后责任方 1：仓库;2：快递商;3：买家
export const SERVICE_DUTY = [
    { index: 0, text: '仓库', value: 1, type: 'warning', checked: false },
    { index: 1, text: '快递商', value: 2, type: 'warning', checked: false },
    { index: 2, text: '买家', value: 3, type: 'warning', checked: false },
];
// 售后处理进度 处理结果类型（1：未处理；2：正在处理；3：已经处理）
export const RESULT_TYPE = [
    { index: 0, text: '未处理', value: 1, type: 'error', checked: false },
    { index: 1, text: '正在处理', value: 2, type: 'primary', checked: false },
    { index: 2, text: '已经处理', value: 3, type: 'success', checked: false },
];