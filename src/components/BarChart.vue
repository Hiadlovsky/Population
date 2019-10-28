<template>
  <div class="card-body">
    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="alert alert-info shadow-lg">
          {{data.selectedCountry}} population table in the year {{data.selectedYear}}..
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
					datasets.male.push(this.data.agesRange[age].males);
					datasets.female.push(this.data.agesRange[age].females);
					datasets.total.push(this.data.agesRange[age].total);
				}
			}
			this.renderChart({
					labels: this.data.ages,
					datasets: [
						{
							label: 'Males',
							backgroundColor: '#6789f8',
							data: datasets.male
						},
						{
							label: 'Females',
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
