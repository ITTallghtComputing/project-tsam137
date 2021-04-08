<template>
  <div id="container" style="text-align: center;">
    <h1>German Quiz</h1>

    <br />
    <p>
      There’s an infinite number of sentences in the German language that make
      learning German feel overwhelming. Let's stay optimistic. We have some
      good news: you only need to know a fraction of the total number of German
      sentences to be able to speak German fluently. For example, by knowing as
      little as 100 words you will understand 50% of any text in German. That's
      right! You don't have to know the ins and outs of German to have a real
      conversation with someone from Germany. The secret is to learn German the
      smart way. Start with the most common German phrases and expressions and
      build from there. Learning sentence after sentence, you’ll feel one step
      closer to fluency. Then, to lock the knowledge in, use the German
      sentences you learned in real conversations. So, why not make the first
      step towards learning German today? Let’s go over some common sentences in
      German you can learn right now.
    </p>
    <br />

    <div class="card " style="width: 25rem; text-align: center" v-if="show.q1==true">
      <div class="card-body">
        <h5 class="card-title">Question 1</h5>
        <br />
        <h6 class="card-subtitle mb-2">What is the meaning of:</h6>
        <br />
        <img
          src="https://i.ytimg.com/vi/jFW9lylZIJ0/hqdefault.jpg"
          alt=" Q1"
          width="250"
          height="250"
          style="position: relative; top: -5px"
        />

        <br />
        <br />
        <form  @submit.prevent="question1Answered">
          <p>Please enter your answer:</p>

          <input required v-model="ans" placeholder="" /><br />

          <br />
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

<br>
    <div class="card" style="width: 25rem; text-align: center" v-if="show.q2==true">
      <div class="card-body">
        <h5 class="card-title">Question 2</h5>
        <br />
        <h6 class="card-subtitle mb-2">What is the meaning of:</h6>
        <br />
        <img
          src="data:image/jpeg;base64,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"
          alt=" Q2"
          width="250"
          height="250"
          style="position: relative; top: -5px"
        />

        <br />
        <br />
        <form @submit.prevent="question2Answered">
          <p>Please enter your answer:</p>

          <input required v-model="ans" placeholder="" /><br />

          <br />
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

    <br>
    <div class="card" style="width: 25rem; text-align: center" v-if="show.q3==true">
      <div class="card-body">
        <h5 class="card-title">Question 3</h5>
        <br />
        <h6 class="card-subtitle mb-2">What is the meaning of:</h6>
        <br />
        <img
          src="data:image/jpeg;base64,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"
          alt=" Q2"
          width="250"
          height="250"
          style="position: relative; top: -5px"
        />

        <br />
        <br />
        <form @submit.prevent="question3Answered">
          <p>Please enter your answer:</p>

          <input required v-model="ans" placeholder="" /><br />

          <br />
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

    <br>
    <div class="card" style="width: 25rem; text-align: center" v-if="show.q4==true">
      <div class="card-body">
        <h5 class="card-title">Question 4</h5>
        <br />
        <h6 class="card-subtitle mb-2">What is the meaning of:</h6>
        <br />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkbou70Ku83dAwhJE1nQVrGCqpop00CRVj6g&usqp=CAU"
          alt=" Q2"
          width="250"
          height="250"
          style="position: relative; top: -5px"
        />

        <br />
        <br />
        <form @submit.prevent="question4Answered">
          <p>Please enter your answer:</p>

          <input required v-model="ans" placeholder="" /><br />

          <br />
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

    <br>
    <div class="card" style="width: 25rem; text-align: center" v-if="show.q5==true">
      <div class="card-body">
        <h5 class="card-title">Question 5</h5>
        <br />
        <h6 class="card-subtitle mb-2">What is the meaning of:</h6>
        <br />
        <img
          src="https://i.ytimg.com/vi/u5UaOOzTUoA/maxresdefault.jpg"
          alt=" Q2"
          width="250"
          height="250"
          style="position: relative; top: -5px"
        />

        <br />
        <br />
        <form @submit.prevent="question5Answered">
          <p>Please enter your answer:</p>

          <input required v-model="ans" placeholder="" /><br />

          <br />
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>



    <br />
    <div id="endOfTest" v-if="showResult==true">
        <h5>Score: {{score}}/5</h5>
    <br>
    <h5>Answer for Question 1: "{{correctAnswers.q1}}" - You put: "{{answerStore.q1}}"</h5>
    <h5>Answer for Question 2: "{{correctAnswers.q2}}" - You put: "{{answerStore.q2}}"</h5>
    <h5>Answer for Question 3: "{{correctAnswers.q3}}" - You put: "{{answerStore.q3}}"</h5>
    <h5>Answer for Question 4: "{{correctAnswers.q4}}" - You put: "{{answerStore.q4}}"</h5>
    <h5>Answer for Question 5: "{{correctAnswers.q5}}" - You put: "{{answerStore.q5}}"</h5>
    <br>
    <h6>Thank you for taking the test.</h6>
    <br>

    <br>

    </div>
    
  </div>
</template>

<script>
import axios from "axios"
import { mapGetters, mapActions } from "vuex";
export default {
  name: "testLanguage",
  data() {
    return {
      user: [],
      userID: "",
      userScore: 0,
      score: 0,
      showResult: false,
      ans: "",
      answerArray: { q1: "", q2: "", q3: "", q4: "", q5: "" },
      show: { q1: true, q2: true, q3: true, q4: true, q5: true},
      wrongAnswers: { q1: "", q2: "", q3: "", q4: "", q5: "" },
      answerStore: { q1: "", q2: "", q3: "", q4: "", q5: "" },
      correctAnswers: { q1: "good morning", q2: "see you later", q3: "good night", q4: "good afternoon", q5: "please" },
    };
  },
  async mounted() {
    this.userID = this.$route.params.userID;
    this.userScore = this.$route.params.userScore;
    const response = await axios.get("api/profileList/"+this.userID);
    this.user = response.data;
    this.getProfile();
    this.showResult = false
    this.score = 0,
    this.answerArray = { q1: "", q2: "", q3: "", q4: "", q5: "" };
    this.correctAnswers= { q1: "good morning", q2: "see you later", q3: "good night", q4: "good afternoon", q5: "please" };
    this.answerStore= { q1: "", q2: "", q3: "", q4: "", q5: "" };
    this.show = { q1: true, q2: false, q3: false, q4: false, q5: false};
  },
   computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.getProfile();
  },
  methods: {
    ...mapActions(["getProfile"]),
    question1Answered() {
      
    //   if (this.answerArray.q1 == "") {
    //     

    //   }
    //   console.log(this.answerArray.q2);

    //Q1 If
    this.ans = this.ans.toLowerCase();
      this.answerArray.q1 = this.ans;
       this.answerStore.q1 = this.answerArray.q1;
      if(this.answerArray.q1 == this.correctAnswers.q1){
         this.score =  this.score+1
        this.show.q1 = false;
        this.ans = "";
        this.answerArray.q1 ="";
        this.show.q2 = true;
      }
      else if(this.answerArray.q1 == ""){
          this.ans = "";
          this.show.q2 = true;
      }
      else{
        this.wrongAnswers.q1 = this.answerArray.q1
        this.show.q1 = false;
        this.ans = "";
        this.answerArray.q1 ="";
        this.show.q2 = true;
      }
      console.log(this.score)
    },
    question2Answered() {
        this.ans = this.ans.toLowerCase();
      this.answerArray.q2 = this.ans;
      this.answerStore.q2 = this.answerArray.q2;
    //Q2 If
      if(this.answerArray.q2 == this.correctAnswers.q2){
         this.score =  this.score+1
        this.show.q2 = false;
        this.ans = "";
        this.answerArray.q2 ="";
        this.show.q3 = true;
      }
      else if(this.answerArray.q2 == ""){
          this.ans = "";
          this.show.q3 = true;
      }
      else{
        this.wrongAnswers.q2 = this.answerArray.q2
        this.show.q2 = false;
        this.ans = "";
        this.answerArray.q2 ="";
        this.show.q3 = true;
      }
    },

    question3Answered() {
        this.ans = this.ans.toLowerCase();
      this.answerArray.q3 = this.ans;
      this.answerStore.q3 = this.answerArray.q3;
    //Q3 If
      if(this.answerArray.q3 == this.correctAnswers.q3){
         this.score =  this.score+1
        this.show.q3 = false;
        this.ans = "";
        this.answerArray.q3 ="";
        this.show.q4 = true;
      }
      else if(this.answerArray.q3 == ""){
          this.ans = "";
          this.show.q4 = true;
      }
      else{
        this.wrongAnswers.q3 = this.answerArray.q3
        this.show.q3 = false;
        this.ans = "";
        this.answerArray.q3 ="";
        this.show.q4 = true;
      }
      console.log(this.score)
    },

    question4Answered() {
        this.ans = this.ans.toLowerCase();
      this.answerArray.q4 = this.ans;
      this.answerStore.q4 = this.answerArray.q4;
    //Q4 If
      if(this.answerArray.q4 == this.correctAnswers.q4){
         this.score =  this.score+1
        this.show.q4 = false;
        this.ans = "";
        this.answerArray.q4 ="";
        this.show.q5 = true;
      }
      else if(this.answerArray.q4 == ""){
          this.ans = "";
          this.show.q5 = true;
      }
      else{
        this.wrongAnswers.q4 = this.answerArray.q4
        this.show.q4 = false;
        this.ans = "";
        this.answerArray.q4 ="";
        this.show.q5 = true;
      }
    },

    question5Answered() {
        this.ans = this.ans.toLowerCase();
      this.answerArray.q5 = this.ans;
      this.answerStore.q5 = this.answerArray.q5;
    //Q5 If
      if(this.answerArray.q5 == this.correctAnswers.q5){
        this.score =  this.score+1
        this.show.q5 = false;
        this.showResult = true;
        this.ans = "";
        this.answerArray.q5 ="";
      }
      else if(this.answerArray.q5 == ""){
          this.showResult = true;
          this.ans = "";
      }
      else{
        this.wrongAnswers.q5 = this.answerArray.q5
        this.show.q5 = false;
        this.showResult = true;
        this.ans = "";
        this.answerArray.q5 ="";
      }
      console.log(this.score)

      this.userScore=this.userScore+((this.score*10)*2)
      let userData = {
        testScore: this.userScore,
      };
      console.log(this.userScore)
      console.log(userData)
       axios.put(
          `http://localhost:3000/api/profileList/${this.userID}`,
          userData
        );
        // this.$router.push("/testResult");
    }
  },
};
</script>

<style scoped>
.card {
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 10px; /* Added */
}
</style>