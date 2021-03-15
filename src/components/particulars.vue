<template>
	<div>
		<div class="topNavgtion">
			<van-icon name="arrow-left" class="topNavgtion_icon" color="#fff" @click="returnPage" />
			<span class="topNavgtion_title">工艺详情</span>
		</div>
		<div class="magStateBox">
			<div class="msgName">
				<div class="msgName_top">
					<span>名称</span>
					<span>{{titleObj.stepName}}</span>
					<span>价格</span>
				</div>
				<div class="msgName_bottom">
					<span>类型</span>
					<span>分类</span>
					<span>修复技师</span>
				</div>
			</div>
			<div style="flex-grow: 0.15;"></div>
			<div class="stateName">
				
				<span class="stateName_tetx" v-if="!titleObj.maintainTime">待完成</span>
				<span class="new_stateName_tetx" v-else>已完成</span>
			</div>
		</div>
		<div class="particulars_li_box">
			<span>工位：{{GWObjCompilations.stationName}}</span>
			<div @click="examineLive">查看直播</div>
		</div>
		<div class="particulars_li_box">
			<span>当前工序：{{titleObj.stepName}}</span>
			<div @click="examineManual">查看操作手册</div>
		</div>
		<div class="particulars_phoneList">
			<van-row>
				<van-col span="12" class="imageBox" v-for="(item,index) in phone_list" :key="item.url" @click="preview(index)">
					<van-image height="100%" widthFix :src="item.url" class="col_image"/>
				</van-col>
			</van-row>
			<!-- <div class="imageBox"></div>
			<div class="imageBox"></div> -->
		</div>
		<van-popup v-model="isPopupShow" bind:close="onClose" style="width: 100%;height: 50%;" round closeable>
			<video src="movie.ogg"
			 controls="controls" style="width: 100%;height: 100%;">
				您的浏览器不支持 video 标签。
			</video></van-popup>
	</div>
</template>
<script>
	import {
		ImagePreview
	} from 'vant';

	export default {

		data() {
			return {
				isPopupShow: false,
				active: 0,
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
				titleObj:{},	//上个页面传来的数据
				GWObjCompilations:{}
				
			}
		},
		methods: {
			// 查看工位信息
			index_getGWMSg(){
				this.$api.index_getGWMSg()
					.then(res => {
						if (res.code === '0') {
							this.GWObjCompilations =res.data
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
			// 查看直播
			examineLive() {
				this.isPopupShow = true;

			},
			onClose() {
				this.isPopupShow = false;

			},
			// 查看操作手册
			examineManual() {

			},
			// 跳转回去
			returnPage() {
				this.$router.push({
					path: '/'
				})
			}

		},
		created(){
			// 查看工位信息
			this.index_getGWMSg()
			console.log(this.$route.query)
			this.titleObj=this.$route.query;
			
		}

	}
</script>
<style >
	
</style>
