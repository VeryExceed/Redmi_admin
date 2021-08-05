<template>
	<div class="bg-white px-3" style="margin: -20px;margin-top: -1rem;">
		<el-tabs v-model="tabIndex" @tab-click="handleClick">
			<el-tab-pane :label="tab.name" v-for="(tab,tabI) in tabbars" :key="tabI">
				<div class="d-flex align-items-center mb-2">
					<!-- 左边 -->
					<el-button type="success" size="mini">发布商品</el-button>
					<el-button type="danger" size="mini">批量删除</el-button>
					<!-- 右边 -->
					<div class="ml-auto" v-show="!superSearch">
						<el-input v-model="form.name" placeholder="要搜索的商品名称" size="mini" style="width: 150px"
							class="mr-2"></el-input>
						<el-button type="info" size="mini">搜索</el-button>
						<el-button size="mini" @click="superSearch = true">高级搜索</el-button>
					</div>
				</div>
				<el-card class="box-card bg-light my-3" v-show="superSearch">
					<div slot="header" class="clearfix" style="margin: -10px;">
						<span>高级搜索</span>
						<el-button style="float: right; padding: 3px 0" type="text" @click="superSearch = false">收起
						</el-button>
					</div>
					<!-- 表单 -->
					<el-form inline ref="form" :model="form" label-width="80px">
						<el-form-item label="商品名称" class="mb-0">
							<el-input v-model="form.name" placeholder="商品名称" size="mini"></el-input>
						</el-form-item>
						<el-form-item label="商品编码" class="mb-0">
							<el-input v-model="form.code" placeholder="商品编码" size="mini"></el-input>
						</el-form-item>
						<el-form-item label="商品类型" class="mb-0">
							<el-select v-model="form.type" size="mini" placeholder="请选择商品类型">
								<el-option label="区域一" value="shanghai"></el-option>
								<el-option label="区域一" value="shanghai"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="商品分类" class="mb-0">
							<el-input v-model="form.category" placeholder="商品分类" size="mini"></el-input>
						</el-form-item>
						<el-form-item class="mb-0">
							<el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
							<el-button size="mini" @click="clearSearch">清空筛选条件</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				tabbars: [{
						name: "审核中"
					},
					{
						name: "出售中"
					},
					{
						name: "已下架"
					},
					{
						name: "库存预警"
					},
					{
						name: "回收站"
					},
				],
				superSearch: false,
				form: {
					name: "",
					code:"",
					type:"",
					category:""
				}
			}
		},
		methods: {
			// 加载数据
			handleClick(tab, event) {
				console.log(tab.index);
			},
			// 搜索事件
			searchEvent(){
				console.log('搜索事件')
			},
			// 清空筛选条件
			clearSearch(){
				this.form = {
					name: "",
					code:"",
					type:"",
					category:""
				}
				this.superSearch = false
			}
		}
	}
</script>

<style>
</style>
