<template>
  <div class="card-body">
    <div class="row">
      <div class="col-sm-12 text-center">
        <div class="alert alert-info">
          {{data.selectedCountry}} population table in the year {{data.selectedYear}}.
        </div>
        <table class="col-sm-12 text-center contend_table" v-if="data.loaded">
          <thead>
          <tr>
            <th>age</th>
            <th>males</th>
            <th>females</th>
            <th>total</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="value in data.agesRange" :key="value.id">
            <td>{{value.age}}</td>
            <td>{{value.males}}</td>
            <td>{{value.females}}</td>
            <td>{{value.total}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				required: true
			}

		},
		watch: {
			data: {
				deep: true,

				handler() {
					console.log('The field has changed!')

				}
			}
		}


	}

</script>

<style>
  .contend_table {
    border-collapse: collapse; /*reducing the space between cells*/
    margin: 25px 0;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    overflow: hidden; /* this will hide the shar edges of the table - border radius*/
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.842);


  }

  .contend_table tr th {
    background-color: #009879;
    color: #ffffff;
    font-weight: bold;
  }

  .contend_table th,
  .contend_table td {
    padding: 12px 15px;

  }

  .contend_table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .contend_table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .contend_table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

</style>
