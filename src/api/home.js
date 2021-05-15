import createAjax from './index'

const erpUrl = process.env.VUE_APP_ERP_BASE_API
const cbsUrl = process.env.VUE_APP_CBS_BASE_API

const erpHttp = createAjax(erpUrl)
const cbsHttp = createAjax(cbsUrl)

// 物料列表
export const materialList = (parameter) => erpHttp.post('/Webapi/API/PersonalCenterHandler.ashx?api=GetMaterialList', parameter)
// 识别国际码
export const materialCodeOcr = (parameter) => cbsHttp.postFormData('/cbs-message-center/sms/recognize-image', parameter)
// 物料更新
export const materialUpdate = (parameter) => erpHttp.post('/Webapi/API/PersonalCenterHandler.ashx?api=UpdateMaterial', parameter)
