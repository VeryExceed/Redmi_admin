export default {
	data(){
		return {
			preUrl:"",
			page: {
				current: 1,
				sizes: [10, 20, 50, 100],
				size: 10,
				total: 0
			},
			multipleSelection: []
		}
	},
	filters: {
		numToString(value) {
			return value.toString()
		}
	},
	created(){
		this.getList()
	},
	methods:{
		// 获取列表
		getList() {
			if (this.preUrl == '') return 
			this.layout.showLoading()
			let url = `/admin/${this.preUrl}/${this.page.current}?limit=${this.page.size}`
			this.axios.get(url, {
				token: true
			}).then(res => {
				let data = res.data.data
				this.page.total = data.totalCount
				this.tableData = data.list
				this.layout.hideLoading()
			}).catch(err => {
				this.layout.hideLoading()
			})
	}
	}
	
}