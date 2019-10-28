<template>
  <div class="card-body">
    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="alert alert-info">
          Slovakia population Bar Chart in year 1990 will it work ?
          <canvas ref="canvas" id="bar-chart" width="1900" height="400"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import {Bar} from 'vue-chartjs'

	export default {
		extends: Bar,
		props: [
			'data'
		],
		data() {
			return {
				'chartOptions': {
					responsive: true,
					scales: {
						yAxes: [{
							id: 'first-y-axis',
							type: 'linear',
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			}
		},
		mounted() {
			let datasets = {
				male: [],
				female: [],
				total: [],
			};
			for (let index in this.data.ages) {
				if (this.data.ages.hasOwnProperty(index)) {
					let age = this.data.ages[index];
					datasets.male.push(this.data.agesFrom18To30[age].males);
					datasets.female.push(this.data.agesFrom18To30[age].females);
					datasets.total.push(this.data.agesFrom18To30[age].total);
				}
			}
			this.renderChart({
					labels: this.data.ages,
					datasets: [
						{
							label: 'Male',
							backgroundColor: '#6789f8',
							data: datasets.male
						},
						{
							label: 'Female',
							backgroundColor: '#f81418',
							data: datasets.female
						},
						{
							label: 'Total',
							backgroundColor: '#44f847',
							data: datasets.total
						}
					]
				}, this.chartOptions
			)
		}


	}
</script>

<style>

</style>
