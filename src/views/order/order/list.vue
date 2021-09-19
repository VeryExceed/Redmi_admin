<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1rem; margin-bottom: 0!important;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<el-tab-pane :label="tab.name" v-for="(tab,tabI) in tabbars" :key="tabI">
			</el-tab-pane>
		</el-tabs>
		<buttomn-search ref="buttonSearch" placeholder="要搜索的订单编号" @search="searchEvent">
			<!-- 左边 -->
			<template #left>
				<el-button type="success" size="mini">导出数据</el-button>
				<el-button type="danger" size="mini" @click="deleteAll">批量删除</el-button>
			</template>
			<!-- 高级搜索表单 -->
			<template #form>
				<el-form inline ref="form" :model="form" label-width="80px">
					<el-form-item label="订单编号" class="mb-0">
						<el-input v-model="form.no" placeholder="订单编号" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="下单时间" class="mb-0">
						<el-date-picker 
						v-model="form.time" 
						type="daterange" 
						range-separator="至"
						start-placeholder="开始日期" 
						end-placeholder="结束日期"
						value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="收货人" class="mb-0">
						<el-input v-model="form.name" placeholder="收货人" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="手机号" class="mb-0">
						<el-input v-model="form.phone" placeholder="手机号" size="mini"></el-input>
					</el-form-item>
					<el-form-item class="mb-0">
						<el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
						<el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
					</el-form-item>
				</el-form>
			</template>
		</buttomn-search>
		<!-- 商品列表 -->
		<!--
				 商品
					图片 http://static.yoshop.xany6.com/2018071718294208f086786.jpg
					名称 荣耀 V10全网通 标配版 4GB+64GB 魅丽红 
					时间	 2019-07-17 18:34:14
				 	分类  手机
				 商品类型（普通商品）	
				 实际销量（20）
				 商品排序（100）
				 商品状态（上架）
				 总库存（200）
				 价格(元)（1000.00）
				 -->
		<el-table border class="mt-3" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="45" align="center">
			</el-table-column>
			<el-table-column label="商品" width="350">
				<template slot-scope="scope">
					<div class="d-flex">
						<div style="flex: 1;">
							<p class="mb-1">订单编号：</p>
							<p class="mb-1"><small>{{scope.row.no}}</small></p>
						</div>
						<div style="flex: 1;">
							<p class="mb-1">下单时间：</p>
							<p class="mb-1"><small>{{scope.row.create_time}}</small></p>
						</div>
					</div>

					<div class="media border-top py-2" v-for="(item,index) in scope.row.order_items" :key="index">
						<img class="mr-3" style="width: 60px;height: 60px;"
							:src="item.goods_item ? item.goods_item.cover : ''">
						<div class="media-body">
							<p class="mt-0">
								<a class="text-primary">{{item.goods_item ? item.goods_item.cover : '商品已被删除'}}</a>
							</p>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column width="120" label="实付款" align="center">
				<template slot-scope="scope">
					<span>￥{{scope.row.total_price}}</span>
					<p><small>(含运费：￥0.00)</small></p>
				</template>
			</el-table-column>
			<el-table-column width="120" label="买家" align="center">
				<template slot-scope="scope">
					<span>{{scope.row.user.username}}</span>
					<p><small>(用户id：{{scope.row.user.id}})</small></p>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="支付方式" align="center">
				<template slot-scope="scope">
					<span class="badge badge-success" v-if="scope.row.payment_method === 'wechat'">微信支付</span>
					<span class="badge badge-primary" v-else-if="scope.row.payment_method === 'alipay'">支付宝支付</span>
					<span class="badge badge-success" v-else>未支付</span>

				</template>
			</el-table-column>
			<el-table-column label="配送方式" align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.ship_data">
						<div>{{scope.row.ship_data.express_company}}</div>
						<div>{{scope.row.ship_data.express_no}}</div>
					</div>
					<span class="badge badge-default" v-else>未配送</span>
				</template>
			</el-table-column>
			<el-table-column width="170" label="交易状态" align="center">
				<template slot-scope="scope">
					<div>付款状态:
						<span class="badge"
							:class="scope.row.payment_method ? 'badge-success':'badge-secondary'">{{scope.row.payment_method ? '已付款' : '未付款'}}</span>
					</div>
					<div>发货状态:
						<span class="badge"
							:class="scope.row.ship_data ? 'badge-success' : 'badge-secondary'">{{scope.row.ship_data ?'已发货' : '未发货'}}</span>
					</div>
					<div>收货状态:
						<span class="badge"
							:class="scope.row.ship_status === 'received' ? 'badge-success' :'badge-secondary'">{{scope.row.ship_status === 'received' ? '已收货':'未收货'}}</span>
					</div>
				</template>
			</el-table-column>

			<el-table-column label="操作" align="center" width="150">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" plain>订单详情</el-button>
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="height: 60px;"></div>
		<el-footer class="border-top d-flex align-items-center px-0 position-fixed bg-white"
			style="bottom: 0;left: 200px;right: 0;z-index: 100;">
			<!-- 底部 -->
			<div style="flex: 1;" class="px-2">
				<el-pagination :current-page="page.current" :page-sizes="page.sizes" :page-size="page.size"
					layout="total, sizes, prev, pager, next, jumper" :total="page.total" @size-change="handleSizeChange"
					@current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</el-footer>

	</div>
</template>

<script>
	import buttomnSearch from "@/components/common/buttomn-search.vue"
	import common from '@/common/mixins/common.js';
	export default {
		mixins: [common],
		inject: ['layout'],
		components: {
			buttomnSearch
		},
		data() {
			return {
				preUrl: "order",
				tabIndex: 0,
				tabbars: [{
						name: "全部",
						key: "all"
					},
					{
						name: "待付款",
						key: "nopay"
					},
					{
						name: "待发货",
						key: "noship"
					},
					{
						name: "待收货",
						key: "shiped"
					},
					{
						name: "已收货",
						key: "received"
					},
					{
						name: "已完成",
						key: "finish"
					},
					{
						name: "已关闭",
						key: "closed"
					},
					{
						name: "退款中",
						key: "refunding"
					}
				],
				form: {
					no: "",
					time: "",
					name: "",
					phone: ""
				},
				tableData: [],
			}
		},
		computed: {
			tab() {
				return this.tabbars[this.tabIndex].key
			},
			params() {
				let str = ''
				for (let key in this.form) {
					let val = this.form[key]
					if (val) {
						if (Array.isArray(val)) {
							str += `&starttime=${val[0]}`
							str += `&endtime=${val[1]}`
						} else {
							str += `&${key}=${this.form[key]}`
						}
					}
				}
				return str
			}
		},
		methods: {
			// 获取请求列表分页url
			getListUrl(){
				return `/admin/${this.preUrl}/${this.page.current}?limit=${this.page.size}&tab=${this.tab}${this.params}`
			},
			// 处理获取列表结果
			getListResult(e) {
				console.log(e)
				this.tableData = e.list
			},
			// 加载数据
			handleClick(tab, event) {
				this.getList()
			},
			// 搜索事件
			searchEvent(e = false) {
				// 简单搜索
				if (typeof e === 'string') {
					this.form.no = e
					this.getList()
					return console.log('简单搜索', e)
				}
				// 高级搜索
				this.getList()
				console.log('搜索事件')
			},
			// 清空筛选条件
			clearSearch() {
				this.form = {
					no: "",
					time: "",
					name: "",
					phone: "",
				}
			}
		}
	}
</script>

<style>
</style>
