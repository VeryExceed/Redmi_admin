<template>
	<table class="table table-sm table-bordered">
		<thead>
			<tr class="text-center">
				<th scope="col" v-for="(th,thi) in tableThs" :key="thi" :rowspan="th.rowspan" :colspan="th.colspan"
					style="vertical-align: middle;">{{th.name}}</th>
			</tr>
			<tr class="text-center">
				<th scope="col" style="vertical-align: middle;" v-for="(th,thi) in skuLabels" :key="thi" rowspan="1"
					colspan="1">{{th.name}}</th>
			</tr>
		</thead>
		<tbody>
			<tr class="text-center" v-for="(item,index) in list" :key="index">
				<!-- 商品规格 -->
				<th scope="row" width="100" v-for="(sku,skuI) in item.skus" :key="skuI">{{sku.name}}</th>
				<td width="100">
					<span class="btn btn-light border mr-2">
						<i class="el-icon-plus"></i>
					</span>
				</td>
				<td width="100">
					<input type="number" v-model="item.pprice" class="form-control" />
				</td>
				<td width="100">
					<input type="number" v-model="item.oprice" class="form-control" />
				</td>
				<td width="100">
					<input type="number" v-model="item.cprice" class="form-control" />
				</td>
				<td width="100">
					<input type="number" v-model="item.stock" class="form-control" />
				</td>
				<td width="100">
					<input type="number" v-model="item.volume" class="form-control" />
				</td>
				<td width="100">
					<input type="number" v-model="item.weight" class="form-control" />
				</td>
				<td width="100">
					<input type="text" v-model="item.code" class="form-control" />
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
	import {
		mapGetters,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				list: []
			}
		},
		computed: {
			...mapGetters(['tableThs', 'tableData', 'skuLabels']),
			...mapState({
				sku_card: state => state.goods_create.sku_card
			})
		},
		watch: {
			tableData(newValue, oldValue) {
				this.list = newValue
				console.log(this.list)
			}
		},
		mounted() {
			console.log(this.tableData)
			console.log(this.skuLabels)
			this.list = this.tableData
			console.log(this.list)
		}
	}
</script>

<style>
</style>
