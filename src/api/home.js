import http from './index'

export const materialList = (parameter) => http.post('/PersonalCenterHandler.ashx?api=GetMaterialList', parameter)
