/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from "firebase-functions";
import Stripe from "stripe";
const stripe = new Stripe("pk_test_51R5FL0Ix59YKNmqvYJwu8MdpKZupqFGv4XzssZ0pLMVCaNATa039IvGy8fXyRqFv9zEbOlHMTbzzyk7vUWD9BwZf00izNWbcPV", { apiVersion: "2023-10-16" });


// const stripe = new Stripe("sk_test_yourSecretKeyHere", { apiVersion: "2023-10-16" });

export const createPaymentIntent = functions.https.onCall(async (data, context) => {

  try {
    const { amount } = data;

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,  // Convert dollars to cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }


});