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

    <div class="card" style="width: 25rem; text-align: center">
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
        <form @submit.prevent="questionAnswered">
          <p>Please enter your answer:</p>

          <input v-model="ans" placeholder="" /><br />

          <br />
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

<br>
    <div class="card" style="width: 25rem; text-align: center">
      <div class="card-body">
        <h5 class="card-title">Question 2</h5>
        <br />
        <h6 class="card-subtitle mb-2">What is the meaning of:</h6>
        <br />
        <img
          src="https://i.ytimg.com/vi/jFW9lylZIJ0/hqdefault.jpg"
          alt=" Q2"
          width="250"
          height="250"
          style="position: relative; top: -5px"
        />

        <br />
        <br />
        <form @submit.prevent="questionAnswered">
          <p>Please enter your answer:</p>

          <input v-model="ans" placeholder="" /><br />

          <br />
          <button class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

    <br />
  </div>
</template>

<script>
export default {
  name: "testLanguage",

  data() {
    return {
      score: 0,
      correctAnswer: false,
      ans: "",
      answerArray: { q1: "", q2: "", q3: "", q4: "", q5: "" },
      wrongAnswers: { q1: "", q2: "", q3: "", q4: "", q5: "" },
      correctAnswers: { q1: "Good morning", q2: "Good Afternoon", q3: "", q4: "", q5: "" },
    };
  },
  mounted() {
    this.answerArray = { q1: "", q2: "", q3: "", q4: "", q5: "" };
  },
  methods: {
    questionAnswered() {
      this.ans = this.ans.toLowerCase();
      if (this.answerArray.q1 == "") {
        this.answerArray.q1 = this.ans;
        this.showNext = true;
      }

      console.log(this.answerArray.q2);
      if(this.answerArray.q1 == "good morning"){
        this.score++
      }
      else{
        this.wrongAnswers.q1 = this.answerArray.q1

      }
    },
  },
};
</script>

<style scoped>
</style>
