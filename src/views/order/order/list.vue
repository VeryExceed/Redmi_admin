<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1rem; margin-bottom: 0!important;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<el-tab-pane :label="tab.name"
			 v-for="(tab,tabI) in tabbars" 
			 :key="tabI">
				<buttomn-search ref="buttonSearch" placeholder="要搜索的订单编号" @search="searchEvent">
					<!-- 左边 -->
					<template #left>
						<el-button type="success" size="mini">导出数据</el-button>
						<el-button type="danger" size="mini">批量删除</el-button>
					</template>
					<!-- 高级搜索表单 -->
					<template #form>
						<el-form inline ref="form" :model="form" label-width="80px">
							<el-form-item label="订单编号" class="mb-0">
								<el-input v-model="form.code" placeholder="订单编号" size="mini"></el-input>
							</el-form-item>
							<el-form-item label="订单状态" class="mb-0">
								<el-select v-model="form.type" size="mini" placeholder="请选择订单状态">
									<el-option label="区域一" value="shanghai"></el-option>
									<el-option label="区域二" value="beijing"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="下单时间" class="mb-0">
								<el-date-picker v-model="form.time" type="daterange" range-separator="至"
									start-placeholder="开始日期" end-placeholder="结束日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="收货人" class="mb-0">
								<el-input v-model="form.username" placeholder="收货人" size="mini"></el-input>
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
				<el-table border class="mt-3" :data="tableData" style="width: 100%"
					@selection-change="handleSelectionChange">
					<el-table-column type="selection" width="45" align="center">
					</el-table-column>
					<el-table-column label="商品" width="350">
						<template slot-scope="scope">
							<div class="d-flex">
								<div style="flex: 1;">
									<p class="mb-1">订单编号：</p>
									<p class="mb-1"><small>2018080298545157</small></p>
								</div>
								<div style="flex: 1;">
									<p class="mb-1">下单时间：</p>
									<p class="mb-1"><small>2018080298545157</small></p>
								</div>
							</div>

							<div class="media">
								<img class="mr-3" style="width: 60px;height: 60px;" :src="scope.row.cover">
								<div class="media-body">
									<p class="mb-0">
										<a class="text-primary">{{scope.row.title}}</a>
									</p>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column width="120" label="实付款" align="center">
						<template slot-scope="scope">
							<span>￥20</span>
							<p><small>(含运费：￥0.00)</small></p>
						</template>
					</el-table-column>
					<el-table-column width="120" label="买家" align="center">
						<template slot-scope="scope">
							<span>用户名</span>
							<p><small>(用户id：Mew)</small></p>
						</template>
					</el-table-column>
					<el-table-column prop="status" label="支付方式" align="center">
						<template slot-scope="scope">
							<span class="badge badge-success">微信支付</span>

						</template>
					</el-table-column>
					<el-table-column prop="stock" label="配送方式" align="center">


					</el-table-column>
					<el-table-column width="170" label="交易状态" align="center">
						<template slot-scope="scope">
							<div>付款状态:
								<span class="badge badge-success">已付款</span>
							</div>
							<div>发货状态:
								<span class="badge badge-success">待发货</span>
							</div>
							<div>收货状态:
								<span class="badge badge-success">待收货</span>
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
							layout="total, sizes, prev, pager, next, jumper" :total="page.total"
							@size-change="handleSizeChange" @current-change="handleCurrentChange">
						</el-pagination>
					</div>
				</el-footer>
			</el-tab-pane>
		</el-tabs>
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
					code: "",
					type: "",
					time: "",
					username: "",
					phone: ""
				},
				tableData: [],
				multipleSelection: []
			}
		},
		methods: {
			// 获取请求列表分页url
			getListUrl(){
				return `/admin/${this.preUrl}/${this.page.current}?limit=${this.page.size}&tab=${this.tab}`
			},
			// 处理获取列表结果
			getListResult(e){
				console.log(e)
				this.tableData = e.list
			},
			// 生成模拟数据
			__getData() {
				for (let i = 0; i < this.tabbars.length; i++) {
					this.tableData.push({
						currentPage: 1,
						list: []
					})
					for (let j = 0; j < 20; j++) {
						this.tableData[i].list.push({
							id: j,
							title: '荣耀 V10全网通 标配版 4GB+64GB 魅丽红' + i + '-' + j,
							cover: 'http://static.yoshop.xany6.com/2018071718294208f086786.jpg',
							create_time: '2021-08-07 2:12:14',
							category: "手机",
							type: "普通商品",
							sale_count: 20,
							order: 100,
							status: 1,
							stock: 200,
							pprice: 1000,
							ischeck: 1
							// 0未审核，1通过，2不通过
						})
					}
				}
			},
			// 上架/下架
			changeStatus(item) {
				item.status = item.status === 1 ? 0 : 1
			},
			// 删除当前商品
			deleteItem(index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.tableData[this.tabIndex].list.splice(index, 1)
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				})
			},
			// 选中
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			// 加载数据
			handleClick(tab, event) {
				this.getList()
			},
			// 搜索事件
			searchEvent(e) {
				// 简单搜索
				console.log(e)
				if (typeof e === 'string') {
					return console.log('简单搜索', e)
				}
				// 高级搜索
				console.log('搜索事件')
			},
			// 清空筛选条件
			clearSearch() {
				this.form = {
					code: "",
					type: "",
					time: "",
					username: "",
					phone: "",
				}
				this.$refs.buttonSearch[this.tabIndex].closeSuperSearch()
			}
		}
	}
</script>

<style>
</style>
