import { loadStripe } from "@stripe/stripe-js";
import { functions } from "./firebase";
import { httpsCallable } from "firebase/functions";

const stripePromise = loadStripe("pk_test_yourPublishableKeyHere");


export async function tipWaiter(amount) {
  return new Promise((resolve, reject) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const waiter = urlParams.get("waiter") || "unknown";

      // Call Firebase Function to get the clientSecret for PaymentIntent
      const createPaymentIntent = httpsCallable(functions, "createPaymentIntent");

      createPaymentIntent({ amount, waiter })
        .then(async (result) => {
          const { clientSecret } = result.data;

          // Wait for Stripe to load
          const stripe = await stripePromise;
          if (!stripe) {
            console.error("Stripe failed to load.");
            reject(false);
            return;
          }

          // Confirm the Payment with the clientSecret
          const { error, paymentIntent } = await stripe.confirmPayment({
            elements: stripe.elements(),
            confirmParams: {
              return_url: window.location.href,  // Keeps the user on the same page
            },
            clientSecret,
          });

          // Check for errors during the payment process
          if (error) {
            console.error("Payment error:", error.message);
            reject(false); // Payment failed or canceled
          } else if (paymentIntent.status === "succeeded") {
           // console.log("Payment succeeded!");
            resolve(true); // Payment successful
          } else {
          //  console.log("Unexpected payment status:", paymentIntent.status);
            reject(false); // Unexpected status
          }
        })
        .catch((error) => {
          console.error("Firebase error:", error);
          reject(false); // Error occurred when calling the Firebase function
        });
    } catch (error) {
      console.error("Unexpected error:", error);
      reject(false); // Something went wrong
    }
  });
}

//const stripePromise = loadStripe('pk_test_51R5FL0Ix59YKNmqvYJwu8MdpKZupqFGv4XzssZ0pLMVCaNATa039IvGy8fXyRqFv9zEbOlHMTbzzyk7vUWD9BwZf00izNWbcPV');


/*
export function tipWaiter(amount) {
  return new Promise((resolve, reject) => {
      const urlParams = new URLSearchParams(window.location.search);
      const waiter = urlParams.get('waiter') || 'unknown';

      // Call your backend to create a checkout session
      fetch('/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, waiter }),
      })
      .then(res => res.json())  // Get the session details from your backend
      .then(data => {
          // Wait for Stripe to load before redirecting
          stripePromise.then(stripe => {
              if (stripe) {
                  // Redirect the user to Stripe Checkout
                  stripe.redirectToCheckout({ sessionId: data.id })
                      .then((result) => {
                          if (result.error) {
                              // Handle any errors during checkout redirection
                              console.error('Error during Stripe Checkout:', result.error.message);
                              reject(false);
                          } else {
                              resolve(true);
                          }
                      });
              } else {
                  console.error('Stripe did not load correctly.');
                  reject(false);
              }
          });
      })
      .catch(error => {
          console.error('Error initiating payment:', error);
          reject(false);  // Reject the promise if there's an error
      });
  });
}
*/
/*
export function tipWaiter(amount) {
    return new Promise((resolve, reject) => {
      const urlParams = new URLSearchParams(window.location.search);
      const waiter = urlParams.get('waiter') || 'unknown';
  
      fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, waiter }),
      })
      .then(res => res.json())
      .then(data => {
        window.location.href = data.url; // Redirect to Stripe Checkout
        // You could handle the success or cancel logic on the next page (e.g., via success_url and cancel_url)
        resolve(true);  // Resolve promise when payment is initiated
      })
      .catch(error => {
        console.error(error);
        reject(false);  // Reject if there's an error initiating payment
      });
    });
  }
*/


  // const stripePromise = loadStripe('pk_test_yourPublishableKeyHere');  // Your Stripe publishable key
// const stripePromise = loadStripe('pk_test_51R5FL0Ix59YKNmqvYJwu8MdpKZupqFGv4XzssZ0pLMVCaNATa039IvGy8fXyRqFv9zEbOlHMTbzzyk7vUWD9BwZf00izNWbcPV');

