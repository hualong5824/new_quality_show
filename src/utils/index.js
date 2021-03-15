import {
	post
} from './request.js' //引入封装的文件中的post方法
import {
	get
} from './request.js' //引入封装的文件中的get方法
import {
	deletefn
} from './request.js' //引入封装的文件中的get方法
import {
	put
} from './request.js' //引入封装的文件中的get方法
export default {
	login(params) {
		return get('./table.json', params)
	},
	// 根据详情id查询入厂诊断结果
	index_getRcData(params){
		return get('/m/jlapp/assess?detailId=46', params)
	},
	// 根据详情id查询工艺记录
		index_getGyData(params){
		return get('/m/jlapp/craftstep?detailId=46', params)
	},
	// 根据详情id查询质检信息和结果
		index_getZjData(params){
		return get('/m/jlapp/quality?detailId=46', params)
	},
	// 查询全部步骤
		index_getAllStep(params){
		return get('/m/jlapp/craft/craftstep?craftId=65', params)
	},
	// 根据车间id 配件id 步骤id 	查询工位信息
	index_getGWMSg(params){
		return get('/m/jlapp/station?workshopId=24&partsId=47&craftStepId=7', params)
	}
}
