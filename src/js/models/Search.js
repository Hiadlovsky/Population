import axios from 'axios';

export default class Search {
    constructor(age) {
        this.age = age;
    }
    async getResults(el) {
        try {
            const res = await axios(`https://d6wn6bmjj722w.cloudfront.net:443/1.0/population/1990/Slovak%20Republic/${el}/`);
            this.result = res.data;
        } catch (error) {
            alert(erorr);
        }
    }
}