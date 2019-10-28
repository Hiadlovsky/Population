import axios from 'axios';
<template>

  <div class="card-body">
      <form>
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
            <h1>Calculator</h1>
            <label for="male">
              <input
                name="sex"
                id="male"
                type="radio"
                value="male"
                v-model="userData.sex"> Male
            </label>
            <label for="female">
              <input
                name="sex"
                id="female"
                type="radio"
                value="female"
                v-model="userData.sex"> Female
            </label>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <div class="form-group">
              <label for="date">Date (please use format yyyy-mm-dd)</label>
              <input type="text"
                     id="date"
                     name="date"
                     class="form-control"
                     v-model="userData.date">
            </div>
            <div class="form-group">
              <label for="age">Age</label>
              <input type="number"
                     min="0"
                     max="100"
                     name="age"
                     id="age"
                     class="form-control"
                     v-model="userData.age">
            </div>

          </div>

        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 from-group">
            <label for="country">Country</label>
            <select
              class="form-control"
              id="country"
              name="country"
              v-model="userData.country">
              <option v-for="country in countryes" :selected="country === 'Afganistan'" :key="country"> {{ country }}
              </option>
            </select>
          </div>
        </div>

        <button @click="getLifeExpectancy" type="button" class="btn bg-primary text-white mt-2">Submit</button>

      </form>
      <hr>
      <template v-if="display">
        <p>Yu have {{userData.remainingLifeExpectancy}} years to live.</p>
      </template>

  </div>
</template>

<script>
	import axios from 'axios';

	export default {
		created() {
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth() + 1; //January is 0!
			let yyyy = today.getFullYear();

			if (dd < 10) {
				dd = '0' + dd;
			}

			if (mm < 10) {
				mm = '0' + mm;
			}

			today = yyyy + '-' + mm + '-' + dd;
			this.userData.date = today;

			axios.get(`https://d6wn6bmjj722w.cloudfront.net:443/1.0/countries`)
				.then(res => {
					this.countries = res.data.countries.slice();
				})
				.catch(error => console.log(error));

		},
		data() {
			return {
				display: false,
				countries: [],
				userData: {
					sex: '',
					country: '', //* if space must add %20
					date: '',
					age: null,
					remainingLifeExpectancy: ''
				}
			}
		},
		methods: {
			getLifeExpectancy() {
				axios.get(`https://d6wn6bmjj722w.cloudfront.net:443/1.0/life-expectancy/remaining/${this.userData.sex}/${this.userData.country}/${this.userData.date}/${this.userData.age}'y'/`)
					.then(res => {
						let temp = res.data.remaining_life_expectancy;
						temp = Math.round(temp * 100) / 100;
						this.userData.remainingLifeExpectancy = temp;
						this.display = true;
					})
					.catch(error => console.log(error));


			},
		}
	}
</script>
