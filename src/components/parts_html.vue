<template>
	<div>
		<div class="msgTopBox">
			<div class="masgMiniTop">
				<span>[非金属类]中网</span>
				<span>一个</span>
			</div>
			<div class="masgMiniBottom">
				<span>JS114B056AA</span>
				<span>2020-09-19 9:24:56</span>
			</div>
		</div>
		<van-tabs v-model="active" class="tab_text" swipeable background="#fff" title-active-color="#3C4147"
		 title-inactive-color="#AEAEAE" color="#45A4FE" @change="tabsChange(active)">
			<van-tab title="入厂诊断" class="tab_box">
				<!-- 入厂诊断-外观质量 -->
				<div class="tab1_box" v-if="rc_dataObjArr.colourDataDtoList!=null">
					<div class="diagnose_wg" v-for="item in rc_dataObjArr.colourDataDtoList" :key="item.id">
						<div class="diagnose_left">
							<span class="diagnose_text_31">外观质量：已记录</span>
							<span class="diagnose_text_26">检测位{{item.site}}：{{item.addTime}}</span>
							<span class="diagnose_text_26">层色值：{{item.standardL}} {{item.standardA}} {{item.standardB}}</span>
						</div>
						<div class="diagnose_rigt">
							<span class="diagnose_text_21" style="text-align: right;margin-bottom: 3px;">差值：{{item.difference}}</span>
							<img :src="item.colourImagesList[0]" alt="">
						</div>
					</div>
				</div>
				<!-- 入厂诊断-变形检测 -->
				<div class="tab1_box">
					<div class="diagnose_bx">
						<div class="diagnose_left">
							<span class="diagnose_text_31">变形检测：{{rc_dataObjArr.dialgaugeState==1?'建议修复':'不可修复'}}</span>
							<span class="diagnose_text_28">径向：{{rc_dialgaugeDataDto.diameter}}</span>
							<span class="diagnose_text_28">轴向：{{rc_dialgaugeDataDto.axis}}</span>
						</div>
						<div class="diagnose_rigt">
							<img src="../assets/img/phon.png" alt="" style="margin-right: 10px;">
							<img src="../assets/img/phon.png" alt="">
						</div>
					</div>
				</div>
				<!-- 入厂诊断-内部检测 -->
				<div class="tab1_box diagnose_nb" v-if="rc_dataObjArr.detectorDataDtoList!=null">
					<div class="diagnose_wg" v-for="item in rc_dataObjArr.detectorDataDtoList" :key="item.id">
						<div class="diagnose_left">
							<span class="diagnose_text_31" style="margin-bottom: 3px;">内部检测：{{rc_dataObjArr.detectorState==1?'建议修复':'不可修复'}}</span>
							<span class="diagnose_text_21">检测位{{item.site}}：{{item.addTime|formatDate}}</span>
							<span class="diagnose_text_21">{{item.flawType==1?'平底孔':'长条状'}}：{{rc_dataObjArr.detectorDataDtoList.length}}</span>
							<span class="diagnose_text_21">间距：{{item.interval}}</span>
						</div>
						<div class="diagnose_rigt">
							<img :src="item.detectorImages" alt="" style="margin-right: 10px;">
							<img :src="item.partsImagesList[0]" alt="">
						</div>
					</div>
				</div>
				<!-- 入厂诊断-边缘缺失/刮伤 -->
				<div class="tab1_box diagnose_qs">
					<span class="diagnose_text_29">边缘缺失：{{rc_dataObjArr.hupDeficiencyDtoList != null ? (rc_dataObjArr.deficiencyState == 1 ? "建议修复":"不可修复"):"无损伤"}}</span>
					<span class="diagnose_text_29">刮伤：{{rc_dataObjArr.hupScratchDtoList!= null? (rc_dataObjArr.scratchState == 1 ? "建议修复":"不可修复") : "无损伤"}}</span>
				</div>
				<!-- 入厂诊断-诊断结果 -->
				<div class="tab1_box">
					<div class="diagnose_jg">
						<span class="diagnose_text_31">诊断结果：建议维修</span>
						<span class="diagnose_text_26">质检员：胡得力</span>
						<span class="diagnose_text_26">诊断时间：2020-09-20</span>
					</div>
				</div>
				<!-- 入厂诊断-诊断照片 -->
				<div class="phoneList" v-if="rc_dataObjArr.partsImagesList!=null">
					<span class="phone_title">诊断照片:</span>
					<van-grid :column-num="3" square :border="false">
						<van-grid-item v-for="(item,index) in phone_list" :key="item.url" @click="preview(index)" data-url="rrrrrrrrrr"
						 :icon="item.url" />
					</van-grid>
				</div>
				<div style="width: 100px;height: 25px;"></div>
			</van-tab>
			<van-tab title="工艺记录" class="tab_box">
				<van-steps :active="seeps_active" direction="vertical" active-color="#45A4FE">
					<!-- 	<van-step>买家下单</van-step> -->
					<van-step v-for="(item,index) in arrList" :key="item.name">
						<div class="li_box" @click="clickCheck(index,item)" :class="{new_li_box:index==current}">
							<div class="li_box_left">
								<span class="span_1">{{item.stepName}}</span>
								<span class="span_2" v-if="item.maintainTime">{{item.maintainTime|formatDate}}</span>
								<span class="span_2" v-else>未完成</span>
							</div>
							<span class="diagnose_text_24" @click="checkDetails(item)">{{index==current?'查看详情':''}}</span>
						</div>
					</van-step>
					<!-- 	<van-step>买家提货</van-step>
					<van-step>交易完成</van-step> -->
				</van-steps>
			</van-tab>
			<van-tab title="质检" class="tab_box">
				<!-- 质检-外观质量 -->
				<div class="tab1_box" v-if="zj_dataObjArr.colourDataDtoList!=null">
					<div class="diagnose_wg" v-for="item in zj_dataObjArr.colourDataDtoList" :key="item.id">
						<div class="diagnose_left">
							<span class="diagnose_text_31">外观质量：{{zj_dataObjArr.colourResult}}</span>
							<span class="diagnose_text_26">检测位{{item.site}}：{{item.addTime}}</span>
							<span class="diagnose_text_26">层色值：{{item.standardL}} {{item.standardA}} {{item.standardB}}</span>
						</div>
						<div class="diagnose_rigt">
							<span class="diagnose_text_21" style="text-align: right;margin-bottom: 3px;">差值：{{item.difference}}</span>
							<img :src="item.colourImagesList[0]" alt="">
						</div>
					</div>
				</div>
				<!-- 质检-变形检测 -->
				<div class="tab1_box">
					<div class="diagnose_bx">
						<div class="diagnose_left">
							<span class="diagnose_text_31">变形检测：{{zj_dataObjArr.dialgaugeResult}}</span>
							<span class="diagnose_text_28">径向：{{dialgaugeDataDto.diameter}}</span>
							<span class="diagnose_text_28">轴向：{{dialgaugeDataDto.axis}}</span>
						</div>
						<div class="diagnose_rigt">
							<img src="../assets/img/phon.png" alt="" style="margin-right: 10px;">
							<img src="../assets/img/phon.png" alt="">
						</div>
					</div>
				</div>
				<!-- 质检-内部检测 -->
				<div class="tab1_box diagnose_nb" v-if="zj_dataObjArr.detectorDataDtoList!=null">
					<div class="diagnose_wg" v-for="item in zj_dataObjArr.detectorDataDtoList" :key="item.id">
						<div class="diagnose_left">
							<span class="diagnose_text_31" style="margin-bottom: 3px;">内部检测：{{zj_dataObjArr.detectorResult}}</span>
							<span class="diagnose_text_21">检测位{{item.site}}：{{item.addTime|formatDate}}</span>
							<span class="diagnose_text_21">{{item.flawType==1?'平底孔':'长条状'}}：{{zj_dataObjArr.detectorDataDtoList.length}}</span>
							<span class="diagnose_text_21">间距：{{item.interval}}</span>
						</div>
						<div class="diagnose_rigt">
							<img :src="item.detectorImages" alt="" style="margin-right: 10px;">
							<img :src="item.partsImagesList[0]" alt="">
						</div>
					</div>
				</div>
				<!-- 质检-诊断结果 -->
				<div class="tab1_box tab1_boxrrr">
					<div class="diagnose_jg new_diagnose_jg">
						<div class="texe_left">
							<span class="diagnose_text_31">诊断结果：{{zj_dataObjArr.pimplingResult}}</span>
						</div>
						<div style="display: flex;justify-content: space-between;flex-grow: 1;">
							<div style="display: flex;flex-direction: column;  ">
								<span class="diagnose_text_26" style="flex-grow: 99;display: flex; align-items: flex-end;">质检员:{{shopOrderUserDto.name}}</span>
								<span class="diagnose_text_26">审核员:{{shopOrderUserDto.zjname}} </span>
								<span class="diagnose_text_26" style="flex-grow: 99;display: flex;align-items: flex-end;">远程审核视频</span>
							</div>
							<div style="display: flex;flex-direction: column;">
								<span class="diagnose_text_26" style="flex-grow: 99;display: flex;align-items: flex-end;">质检时间:{{shopOrderUserDto.submitDate|formatDate}}</span>
								<span class="diagnose_text_26">审核时间:{{shopOrderUserDto.auditDate|formatDate}}</span>
								<div style="flex-grow: 99;    display: flex;    align-items: flex-end;">
									<span class="diagnose_text_26 button_pay" @click="examineLive">播放视频</span></div>
							</div>
						</div>
						<!-- <div class=" between">
						</div>
						<div class="between">
						</div>
						<div class="between">
						</div> -->
					</div>
				</div>
				<van-popup v-model="isPopupShow" bind:close="onClose" style="width: 100%;height: 50%;" round closeable>
					<nut-video :sources="sources" :options="options"> </nut-video>
				</van-popup>
				<!-- 质检-质检结果 -->
				<div style="width: 100px;height: 25px;"></div>
			</van-tab>
		</van-tabs>
	</div>
</template>
<script>
	import {
		ImagePreview
	} from 'vant';

	// 格式化时间组件
	import {
		formatDate
	} from '../utils/common.js';
	export default {

		data() {
			return {
				sources: [{
					src: 'http://jldata.oss-cn-shanghai.aliyuncs.com/9132090901021606986243.avi',
					type: 'video/avi'
				}],
				options: {
					controls: true
				},
				active: 0,
				seeps_active: 0,
				arrList: [{
						name: '步骤名称1',
						start_time: '2020-09-19 10:31:03',
						endeTime: '2020-09-19 10:31:03'
					}, //开始时间和结束时间都有值，显示完成 查看详情
					{
						name: '步骤名称2',
						start_time: '2020-09-19 10:31:03',
						endeTime: ''
					}, //只有开始时间 没有结束时间显示 ”正进行“
					{
						name: '步骤名称3',
						start_time: '',
						endeTime: ''
					} //两个值都没有的话 那就是未开始
				],
				phone_list: [{
						url: 'https://p.qqan.com/up/2020-12/16070652263949384.jpg',
						id: 1
					},
					{
						url: 'https://p.qqan.com/up/2020-12/16070652274615705.jpg',
						id: 2
					},
					{
						url: 'https://p.qqan.com/up/2020-12/16070652272519101.jpg',
						id: 3
					},
					{
						url: 'https://p.qqan.com/up/2020-12/16070652271879148.jpg',
						id: 4
					},
					{
						url: 'https://p.qqan.com/up/2020-12/16070652274028486.jpg',
						id: 5
					},
					{
						url: 'https://p.qqan.com/up/2020-12/16070652272345929.jpg',
						id: 6
					},
					{
						url: 'https://p.qqan.com/up/2020-12/16070652262214093.jpg',
						id: 7
					},
					{
						url: 'https://p.qqan.com/up/2020-12/16070652267848982.jpg',
						id: 8
					},
					{
						url: 'https://p.qqan.com/up/2020-12/16070652268383467.jpg',
						id: 9
					},
				],
				current: 0,

				// 质检所有字段
				zj_dataObjArr: {},
				shopOrderUserDto: {},
				dialgaugeDataDto: {},
				isPopupShow: false,
				// 入厂所有字段
				rc_dataObjArr: {},
				rc_dialgaugeDataDto: {}
			}
		},

		methods: {
			// 获取数据-根据详情id查询入厂诊断结果
			getRcData() {
				this.$api.index_getRcData()
					.then(res => {
						if (res.code === '0') {
							this.rc_dataObjArr = res.data;
							this.rc_dialgaugeDataDto = res.data.dialgaugeDataDto;
							// this.shopOrderUserDto = res.data.shopOrderUserDto;
						}
					})
			},
			// 查看所有步骤
			getAllStep() {
				this.$api.index_getAllStep()
					.then(res => {
						if (res.code === '0') {
							this.arrList = res.data;
							// 获取数据-	根据详情id查询工艺记录
							this.getGyData()
						}
					})

			},
			// 获取数据-根据详情id查询工艺记录
			getGyData() {
				this.$api.index_getGyData()
					.then(res => {
						
						var arr = this.arrList;
						var resArr = res.data;
						function setArr(bbb, aaa) {
							var rrrr =0;
							for (var i = 0; i < bbb.length; i++) {
								for (var j = 0; j < aaa.length; j++) {
									if (bbb[i].craftStepId == aaa[j].craftStepId) {
										aaa.splice(j, 1);
									}else{
										rrrr=aaa.length+1
									}
								}
							}
							bbb = bbb.concat(aaa);
							return [bbb,rrrr]
						}
					
						this.seeps_active=setArr(resArr, arr)[0].length-setArr(resArr, arr)[1];
						this.arrList=setArr(resArr, arr)[0]
						
					})
			},
			// 获取数据-根据详情id查询质检信息和结果
			getZjData() {
				this.$api.index_getZjData()
					.then(res => {
						if (res.code === '0') {
							this.zj_dataObjArr = res.data;
							this.dialgaugeDataDto = res.data.dialgaugeDataDto;
							console.log(this.dialgaugeDataDto)
							this.shopOrderUserDto = res.data.shopOrderUserDto;
						}
					})
			},

			// 入厂诊断 查看大图
			preview(index) {
				var phone_Arr = this.phone_list;
				var phone_NewArr = []
				for (var i = 0; i < phone_Arr.length; i++) {
					phone_NewArr.push(phone_Arr[i].url)
				}
				ImagePreview({
					images: phone_NewArr,
					startPosition: index
				});
			},
			tabsChange(index) {
				if (index == 0) {
					// this.getRcData()
				} else if (index == 1) {
					// 获取数据-	根据详情id查询工艺记录
					// this.getGyData()
				} else {
					// 获取数据-根据详情id查询质检信息和结果
					// this.getZjData()
				}
			},
			checkDetails(item) {
				this.$router.push({
					path: '/particulars',
					query:{
					stepName:item.stepName,	//工艺
					maintainTime:item.maintainTime//时间
				}
				})
			},
			clickCheck(index,item) {
				this.current = index;
			},
			// 查看回放
			examineLive() {
				this.isPopupShow = true;

			},
			activated: function() {
				this.$setgoindex()
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm') //年-月-日 时分
			}
		},
		created() {
			
		
// 查询所有步骤
			this.getAllStep()
			
			// 获取数据-根据详情id查询入厂诊断结果
			this.getRcData()

			// 获取数据-根据详情id查询质检信息和结果
			this.getZjData()


			if (location.href.indexOf("#reloaded") == -1) {
				location.href = location.href + "#reloaded";
				location.reload();
			}


		}
	}
</script>
<style>
</style>
