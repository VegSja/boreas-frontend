'use client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_...'); // Replace with your Stripe publishable key

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card!);

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log('Token:', result.token); // send token to your backend
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border rounded" />
      <button type="submit" className="bg-black text-white px-4 py-2 rounded">Donate</button>
    </form>
  );
}

export default function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
