<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1rem; margin-bottom: 0!important;">

		<buttomn-search ref="buttonSearch" class="pt-3" @search="searchEvent" placeholder="要搜索的商品名称">
			<!-- 高级搜索表单 -->
			<template #form>
				<el-form inline ref="form" :model="form" label-width="80px">
					<el-form-item label="评价用户" class="mb-0">
						<el-input v-model="form.username" placeholder="商品名称" size="mini"></el-input>
					</el-form-item>
					<el-form-item label="评价类型" class="mb-0">
						<el-select v-model="form.type" size="mini" placeholder="评价类型">
							<el-option label="区域一" value="shanghai"></el-option>
							<el-option label="区域一" value="shanghai"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="发布时间" class="mb-0">
						<el-date-picker v-model="form.time" type="datetimerange" size="small" range-separator="至"
							start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</el-form-item>
					<el-form-item class="mb-0">
						<el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
						<el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
					</el-form-item>
				</el-form>
			</template>
		</buttomn-search>

		<el-table border class="mt-3" :data="tableData" style="width: 100%">

			<el-table-column type="expand">
				<template slot-scope="scope">
					<div class="media">
						<img class="mr-3"
							:src="scope.row.user.avatar"
							alt="Generic placeholder image" style="height: 70px;width: 70px;border-radius: 100%;">
						<div class="media-body">
							<h6 class="mt-0 d-flex">{{scope.row.user.username}}
								<small>{{scope.row.review_time}}</small>
								<!-- <el-button class="ml-auto" size="mini" type="danger">删除</el-button> -->
							</h6>
							{{scope.row.review.data}}
							<div class="py-2">
								<img v-for="(item,index) in scope.row.review.image" :key="index" :src="item" style="max-width: 100px;max-height: 100px;" >
							</div>
							<div v-if="scope.row.extra">
								
							
							<div class="media mt-3 bg-light p-2 rounded" v-for="(item,index) in scope.row.extra"
				  :key="index">
								
								<div class="media-body">
									<h6 class="mt-0 d-flex">
										客服
										<!-- <el-button class="ml-auto" type="danger" size="mini">删除</el-button> -->
									</h6>
									{{item.data}}
								</div>
							</div>
							</div>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="id" width="70" label="ID" align="center">
			</el-table-column>
			<el-table-column label="商品" width="380">
				<template slot-scope="scope">
					<div class="media">
						<img class="mr-3" :src="scope.row.review.image" style="width: 60px;height: 60px;">
						<div class="media-body">
							<p class="mt-0">{{scope.row.review.data}}</p>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="评价信息" width="250">
				<template slot-scope="scope">
					<div class="d-flex flex-column">
						<p>用户名：{{scope.row.user.username}}</p>
						<p>评分: <el-rate v-model="scope.row.rating" disabled show-score text-color="#ff9900"
								score-template="{value}">
							</el-rate>
						</p>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="review_time" label="评价时间" align="center">
			
			</el-table-column>
			<el-table-column label="是否显示" align="center" width="150">
				<template slot-scope="scope">
					<el-button
					:type="scope.row.status ? 'success' : 'danger'" 
					size="mini"
					@click="changeStatus(scope.row)"
					plain>{{scope.row.status ? '启用' : '禁用'}}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="height: 60px;"></div>
		<el-footer class="border-top d-flex align-items-center px-0 position-fixed bg-white"
			style="bottom: 0;left: 200px;right: 0;z-index: 100;">
			<!-- 底部 -->
			<div style="flex: 1;" class="px-2">
			<el-pagination
			  :current-page="page.current"
			  :page-sizes="page.sizes"
			  :page-size="page.size"
			  layout="total, sizes, prev, pager, next, jumper"
			  :total="page.total"
			  @size-change="handleSizeChange"
			  @current-change="handleCurrentChange">
			</el-pagination>
			</div>
		</el-footer>


	</div>
</template>

<script>
	import buttomnSearch from "@/components/common/buttomn-search.vue"
	import common from "@/common/mixins/common.js"
	export default {
		inject:['layout'],
		mixins:[common],
		components: {
			buttomnSearch
		},
		data() {
			return {
				preUrl:"goods_comment",
				tableData:[],
				// tableData: [{
				// 	id: 1,
				// 	goods: {
				// 		title: "商品标题",
				// 		cover: "http://static.yoshop.xany6.com/2018071718294208f086786.jpg"
				// 	},
				// 	username: "用户名",
				// 	star: 5,
				// 	create_time: "2019-07-23 14:15:17",
				// 	status: 1
				// }],
				form: {
					username: '',
					type: '',
					time: ''
				},

			}
		},
		created() {

		},
		methods: {
			getListResult(e) {
				console.log(e.list)
				this.tableData = e.list 
			},
			clearSearch() {},
			searchEvent(e) {
				console.log(e)
			},
			// 批量删除
			deleteAll() {
				if (this.multipleSelection.length === 0) {
					return
				}
				this.$confirm('是否要批量删除?', '提示', {
					confirmButtonText: '删除',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.multipleSelection.forEach(item => {
						let index = this.tableData.findIndex(v => v.id === item.id)
						if (index !== -1) {
							this.tableData.splice(index, 1)
						}
					})
					this.multipleSelection = []
					this.$message({
						message: '删除成功',
						type: 'success'
					});
				})
			},


			// 选中
			handleSelectionChange(val) {
				this.multipleSelection = val;
			}

		}
	}
</script>

<style>
</style>
