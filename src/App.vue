<template>
  <div class="container">

    <div class="card mt-3 tab-card">
      <div class="card-header tab-card-header">
        <ul class="nav nav-tabs card-header-tabs" id="Tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active show" id="table-tab" data-toggle="tab" href="#table" role="tab" aria-controls="Table" aria-selected="true">Table</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="chart-tab" data-toggle="tab" href="#chart" role="tab" aria-controls="Chart" aria-selected="false">Chart</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="calculator-tab" data-toggle="tab" href="#calculator" role="tab" aria-controls="Calculator" aria-selected="false">Calculator</a>
          </li>
        </ul>
      </div>

      <div class="tab-content" id="TabsContent">
        <div class="tab-pane fade p-3 active show" id="table" role="tabpanel" aria-labelledby="table-tab">
          <h5 class="card-title">Table</h5>
          <app-table
            :data="data"
          ></app-table>

        </div>
        <div class="tab-pane fade p-3" id="chart" role="tabpanel" aria-labelledby="chart-tab">
          <h5 class="card-title">Chart</h5>
          <app-bar-chart
            v-if="data.loaded"
            :data="data"
          ></app-bar-chart>
        </div>
        <div class="tab-pane fade p-3" id="calculator" role="tabpanel" aria-labelledby="calculator-tab">
          <h5 class="card-title">Calculator</h5>
          <app-calculator></app-calculator>
        </div>

      </div>
    </div>
	<div>
		<footer class="app-footer px-1">
  <div>
    <a href="https://www.linkedin.com/in/pavol-hiadlovsky-154966184/">Pavol Hiadlovsky</a>
    <span>&copy; 2019 Hiadlovsky.</span>
  </div>
  <div class="ml-auto">
    <span>Created in</span>
    <a href="https://vuejs.org">Vue.js</a>
  </div>
</footer>
	</div>

  </div>
</template>

<script>
	import axios from 'axios';
	import Table from './components/Table.vue';
	import BarChart from './components/BarChart.vue';
	import Calculator from './components/Calculator.vue';

	export default {
	  components: {
		  'app-table': Table,
		  'app-bar-chart': BarChart,
		  'app-calculator': Calculator,
	  },
	  data() {
		  return {
			  data: {
				  ages: [],
				  loaded: false,
				  agesRange: {},
				  minAge:18,
				  maxAge:30,
				  selectedCountry:'Slovak',
				  selectedYear: 1990

			  }
		  }
	  },
	  // Using created to see if axios works.
		created() {
			for (let age = this.data.minAge; age <= this.data.maxAge; age++) {
				this.data.ages.push(age);
			}
		},
		mounted() {
			axios.get(`https://d6wn6bmjj722w.cloudfront.net:443/1.0/population/1990/Slovak%20Republic`)
				.then(res => {
					for (let index in this.data.ages) {
						let age = this.data.ages[index];
						if (res.data.hasOwnProperty(age)) {
							let temp = res.data[age]; // --> stored all data in let to delete things that i dont neade
							delete temp.country;  // --> deleting data athet we dont neade
							delete temp.year;    // --> deleting data athet we dont neade
							this.data.agesRange[age] = temp;  // --> dynamic creation of key
						}
					}
					this.data.loaded = true;
				})
				.catch(error => console.log(error));
		},
		methods: {
			getDataFromAPI() {
				axios.get('https://d6wn6bmjj722w.cloudfront.net:443/1.0/population/1990/Slovak%20Republic/18/')
					.then(res => console.log(res))
					.catch(error => console.log(error));
			}
		}
	}
</script>

<style lang="scss">
.app-footer{ 
	background-color: #009879;
    color: #ffffff;
    font-weight: bold;
}

.app-footer a {
	color:#000000;
}

.app-footer a:hover{
	text-decoration: none;
	color: #9E4634;
}

</style>
