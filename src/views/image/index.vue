<template>
	<div>
		<el-container style="position: absolute;top: 55px;bottom: 0;left: 0;right: 0;">
			<!-- 头部 -->
			<el-header class="d-flex align-items-center border-bottom">
				<div class="d-flex mr-auto">
					<el-select v-model="searchForm.order" class="mr-2" size="mini" style="width: 150px;"
						placeholder="请选择活动区域">
						<el-option label="区域一" value="shanghai"></el-option>
						<el-option label="区域二" value="北京"></el-option>
					</el-select>
					<el-input v-model="searchForm.keyword" class="mr-2" size="mini" style="width: 150px;"></el-input>
					<el-button type="success" size="mini">搜索</el-button>
				</div>
				<el-button type="success" size="mini" @click="openAlbumModel(false)">创建相册</el-button>
				<el-button type="warning" size="mini">上传图片</el-button>
			</el-header>
			<el-container>
				<!-- 侧边 | 相册列表-->
				<el-aside width="200px" style="position: absolute;top: 60px;left: 0;bottom: 60px;"
					class="bg-white border-right">
					<ul class="list-group list-grou-flush">
						<li class="list-group-item list-group-item-action d-flex align-items-center"
							style="cursor: pointer;" v-for="(item,index) in albums" :key="index"
							:class="{'active sum-active' : albumIndex === index}" @click.stop="albumChange(index)">
							{{item.name}}
							<el-dropdown class="ml-auto">
								<span class="el-dropdown-link">
									{{item.num}}<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item @click.stop.native="openAlbumModel({item,index})">修改
									</el-dropdown-item>
									<el-dropdown-item @click.stop.native="albumDel(index)">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</li>
					</ul>
				</el-aside>
				<el-container>
					<!-- 主内容 -->
					<el-main style="position: absolute;top: 60px;left: 200px;bottom: 60px;right: 0;">

					</el-main>
				</el-container>
			</el-container>
			<!-- 底部 -->
			<el-footer></el-footer>
		</el-container>
		<!-- 修改|创建相册 -->
		<el-dialog title="修改相册" :visible.sync="albumModel">
			<el-form ref="form" :model="albumForm" label-width="80px">
				<el-form-item label="相册名称">
					<el-input v-model="albumForm.name" size="medium" placeholder="请输入相册名称"></el-input>
				</el-form-item>
				<el-form-item label="相册排序">
					<el-input-number v-model="albumForm.order" :min="0" size="medium"></el-input-number>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="albumModel= false">取消</el-button>
				<el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				searchForm: {
					order: "",
					keyword: ""
				},
				albumIndex: 0,
				albums: [],
				albumEditIndex: -1,
				albumModel: false,
				albumForm: {
					name: "",
					order: 0
				}
			}
		},
		created() {
			this.__init()
		},
		methods: {
			__init() {
				for (var i = 0; i < 20; i++) {
					this.albums.push({
						name: "相册" + i,
						num: Math.floor(Math.random() * 100),
						order: 0
					})
				}
			},
			// 切换相册
			albumChange(index) {
				this.albumIndex = index
			},
			// 打开相册修改/创建框
			openAlbumModel(obj) {
				// 修改
				if (obj) {
					let {
						item,
						index
					} = obj
					// 初始化表单
					this.albumForm.name = item.name
					this.albumForm.order = item.order
					this.albumEditIndex = index
					// 打开模态框
					return this.albumModel = true
				}
				// 创建
				this.albumForm = {
					name:"",
					order:0
				}
				this.albumEditIndex = -1
				this.albumModel = true
			},
			// 点击确定修改/创建相册
			confirmAlbumModel() {
				// 判断是否为修改
				if (this.albumEditIndex > -1) {
					this.albumEdit()
					return this.albumModel = false
				}
				// 追加albums
				this.albums.unshift({
					name:this.albumForm.name,
					order:this.albumForm.order,
					num:0
				})
				this.albumModel = false

			},
			// 修改相册
			albumEdit() {
				this.albums[this.albumEditIndex].name = this.albumForm.name
				this.albums[this.albumEditIndex].order = this.albumForm.order
			},
			// 删除相册
			albumDel(index) {
				this.$confirm('是否删除该相册', '提示', {
					confirmButtonText: '确定',
					camcelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.albums.splice(index, 1)
					this.$message({
						message: '删除成功',
						type: 'success'
					})
				})

			}


		}
	}
</script>

<style>
	.sum-active {
		color: #67C23A !important;
		background-color: #f0f9eb !important;
		border-color: #c2e7b0 !important;
	}
</style>
