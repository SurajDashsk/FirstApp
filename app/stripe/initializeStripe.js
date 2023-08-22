import { Stripe } from 'stripe';

let stripe;

const initializeStripe = async () => {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      // Add any Stripe configuration options here
    });
  }
  return stripe;
};

export default initializeStripe;
