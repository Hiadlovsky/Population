import axios from 'axios';
<template>

  <div class=" row card-body">
      <form class="col-6">
        <label class="title">Gender</label>
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 form-group">
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
          <div class="col-xs-12 col-sm-12 col-sm-offset-2 col-md-12 col-md-offset-3">
            <div class="form-group">
              <label for="date" class="title">Date (please use format yyyy-mm-dd)</label>
              <input type="text"
                     id="date"
                     name="date"
                     class="form-control col-xs-6 col-md-6"
                     v-model="userData.date">
            </div>
            <div class="form-group">
              <label for="age" class="title">Age</label>
              <input type="number"
                     min="0"
                     max="100"
                     name="age"
                     id="age"
                     class="form-control col-xs-3 col-md-3"
                     v-model="userData.age">
            </div>

          </div>

        </div>

        <div class="row">
          <div class="col-xs-6 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 from-group">
            <label for="country" class="title">Country</label>
            <select
              class="form-control"
              id="country"
              name="country"
              v-model="userData.country">
              <option v-for="country in countries" :key="country"> {{ country }}
              </option>
            </select>
          </div>
        </div>

        <button @click="getLifeExpectancy" type="button" class="btn btn-success text-white mt-2">Submit</button>

      </form>
      <div class="col-6 d-flex align-items-center justify-content-center">
        <div class="text__font">
          <p id="qoute">You can't help getting older, but you don't have to get old.</p>
          <p>-George Burns</p>
        </div>
      </div>
      <hr>
      <template v-if="display">
        <p class="font-weight-bold">You have <span class="text-danger">{{userData.remainingLifeExpectancy}}</span> years to live.</p>
      </template>

  </div>
</template>


<script>
	import axios from 'axios';

	export default {
		created() {
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth() + 1; 
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
					country: 'Afghanistan',
					date: '',
					age: null,
					remainingLifeExpectancy: ''
				}
			}
		},
		methods: {
			getLifeExpectancy() {
        
        if(this.userData.age >100){
          alert(`The ${this.userData.age} can not be processed, because only calculations up to an age of 100 years are supported`);
        }else{
        axios.get(`https://d6wn6bmjj722w.cloudfront.net:443/1.0/life-expectancy/remaining/${this.userData.sex}/${this.userData.country}/${this.userData.date}/${this.userData.age+'y'}/`)
					.then(res => {
						let temp = res.data.remaining_life_expectancy;
						temp = Math.round(temp * 100) / 100;
						this.userData.remainingLifeExpectancy = temp;
						this.display = true;
					})
					.catch(error => {
            console.log(error)
            alert('All data are required.');
            });

        }
			},
		}
	}
</script>

<style lang="scss" scoped>

.text__font{
  font-family: 'Liu Jian Mao Cao', cursive;
}

#qoute{
  font-size: 40px;
  &::before {
  content: '"' ;
  color: rgba(255, 153, 0, 0.795);
  }
  &::after {
  content: '"' ;
  color: rgba(255, 153, 0, 0.795);
  }
}

.title{
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;
}

</style>
