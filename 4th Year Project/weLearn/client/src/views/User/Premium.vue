<template>
  <div id="container" class="text-center"> 
    <div id="innerContainer">

    
    <div v-if="!paidFor" class="">
      <h1>
        Premium Account - €9.98</h1>
      <br />
      <p>{{ product.description }}</p>
      <p>You don't have to wait to be able to message multiple times.</p>
      <p>This makes it a whole lot easier when you are trying to organise meetings.</p>
      <br />
      <br>
      <h4>Purchase Below!</h4>
      <br>
    </div>
    <div v-if="error">
      <h1>Error: {{ this.err }}</h1>
    </div>
    <div v-if="paidFor">
      <h1>Noice, you have a Premium account!</h1>
    </div>

    <div ref="paypal"></div>
    </div>
  </div>
</template>

<script>
// import image from "../assets/lamp.png"
import axios from "axios";
export default {
  name: "HelloWorld",

  data: function () {
    return {
      loaded: false,
      paidFor: false,
      error: false,
      newPremium: false,
      id: 0,
      product: {
        price: 10.97,
        description: "A Premium Account lets you message people unlimitedly",
        img: "./assets/lamp.jpg",
      },
    };
  },
  created() {
    this.id = this.$route.params.id;
  },

  //User: sb-kocd04839797@personal.example.com
  //Pass: f#YFX/32

  mounted: function () {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AWT9hsc19GS6HEqqx6c2YdbkWkNKEYDjGIFEHKofb0emaMjr8ZHIx8ckYvghIxIYUQqfEDVhmY5xnUUK";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
    console.log(this.id);
  },
  methods: {
    setLoaded: function () {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.product.price,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            this.newPremium = true;
            let userData = {
              premium: this.newPremium,
            };
            axios.put(
              `http://localhost:3000/api/profileList/${this.id}`,
              userData
            );
            console.log(order);
          },
          onError: async (err) => {
            const delay = (ms) => new Promise((res) => setTimeout(res, ms));
            console.log(err);
            this.error = true;
            await delay(10000);
            this.error = false;
          },
        })
        .render(this.$refs.paypal);
    },
  },
};
</script>

<style scoped>
.innerContainer{
   position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  
}
</style>