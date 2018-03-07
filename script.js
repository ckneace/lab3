Vue.component('star-rating', VueStarRating.default);
var app = new Vue({
          el: '#app',
          data: {
          number: '',
          max: '',
          current: {},
          loading: true,
          addedName: '',
          addedComment: '',
          addedTime:'',
          comments: {},
          averageRatings:[],
          },
          created: function() {
          this.xkcd();
          },
          methods: {
          xkcd: function() {
          this.loading = true;
          fetch('https://xkcd.now.sh/' + this.number).then(response => {
          return response.json();
         }).then(json => {
         this.current = json;
         this.loading = false;
         this.number = json.num;

         return true;
        }).catch(err => {
        this.number = this.max;
        });
          },
          previousComic: function() {
            console.log("e");
          this.number = this.current.num - 1;
          },
          nextComic: function() {
                  this.number = this.current.num + 1;
                  },
                  getRandom: function(min, max) {
                  min = Math.ceil(min);
                  max = Math.floor(max);
                  return Math.floor((Math.random() * max) + 1);//The maximum and minimum are inclusive
                  },
                  randomComic: function() {
                  this.number = this.getRandom(1, this.max);
                  },
                  addComment: function() {

                    var currentDate = new Date();
                    timeString = currentDate.toString();


                  if (!(this.number in this.comments))
                    Vue.set(app.comments, this.number, new Array);
                  this.comments[this.number].push({author:this.addedName,text:this.addedComment,time:timeString});
                  this.addedName = '';
                  this.addedComment = '';
                  this.addedTime = '';
                  },
                  firstComic: function() {
                  this.number = 1;
                  },
                  lastComic: function() {
                  this.number = this.max;
                  },
                  addRating: function(rating) {
                    if (!(this.number in this.averageRatings)) {
                        Vue.set(this.averageRatings, this.number, {total: 0, number: 0, average: 0});
                    }
                     this.averageRatings[this.number].total = this.averageRatings[this.number].total + rating;
                    this.averageRatings[this.number].number = this.averageRatings[this.number].number + 1;
                    this.averageRatings[this.number].average = this.averageRatings[this.number].total
                    / this.averageRatings[this.number].number;
                  }

                  },
                  computed: {
                  month: function() {
                  var month = new Array;
                  if (this.current.month === undefined)
                  return '';
                  month[0] = "January";
                  month[1] = "February";
                  month[2] = "March";
                  month[3] = "April";
                  month[4] = "May";
                  month[5] = "June";
                  month[6] = "July";
                  month[7] = "August";
                  month[8] = "September";
                  month[9] = "October";
                  month[10] = "November";
                  month[11] = "December";
                  return month[this.current.month - 1];
                },
                averageRating: function() {
                if (this.number in this.averageRatings) {
                      return this.averageRatings[this.number].average.toFixed(1);
                    }
                    else {
                      return "No ratings yet";
                    }
                },
                  },
                  watch: {
                  number: function(value,oldvalue) {
                  if (oldvalue === '') {
                  this.max = value;
                  } else {
                  this.xkcd();
                  }
                  },
                  },
                  });
