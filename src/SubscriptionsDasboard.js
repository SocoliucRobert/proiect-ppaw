import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient';
import styles from './SubscriptionsDasboard.module.css';

import { useParams } from 'react-router-dom';
const SubscriptionsDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userSubscription, setUserSubscription] = useState('');

  useEffect(() => {
    checkAuthentication();
    fetchSubscriptions();
  }, []);


  const checkAuthentication = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (session) {
        const email = session.user?.email || '';
        setUserEmail(email);
        fetchUserSubscription(email); 
      } else {
        setUserEmail('');
      }
    } catch (error) {
      console.error('Error checking authentication:', error.message);
    }
  };


  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase.from('subscriptions').select('*');
      if (error) throw error;

      setSubscriptions(data);
    } catch (error) {
      console.error('Error fetching subscriptions:', error.message);
    }
  };

 
  const fetchUserSubscription = async (email) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('subscription_plan')
        .eq('email', email)
        .single();

      if (error) throw error;
      setUserSubscription(data.subscription_plan || '');
    } catch (error) {
      console.error('Error fetching user subscription:', error.message);
    }
  };

 
  const handleBuySubscription = async (subscription) => {
    if (!userEmail) {
      alert('Trebuie sa fii conectat pentru a cumpara o subscriptie!');
      
      return;
    }
  
    try {
     
      const { data: user, error: fetchError } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single();
  
      if (fetchError || !user) {
        console.error('Error fetching user:', fetchError || 'User not found');
        alert('User not found. Please ensure your account exists in the database.');
        return;
      }
  
  
      const { error: updateError } = await supabase
        .from('users')
        .update({ subscription_plan: subscription.name })
        .eq('id', user.id);
  
      if (updateError) {
        throw updateError;
      }
  
      alert(`You've successfully purchased the ${subscription.name} plan!`);
      setUserSubscription(subscription.name); 
    } catch (error) {
      console.error('Error purchasing subscription:', error.message);
      alert('Failed to purchase subscription.');
    }
  };
  

  return (
    <div className={styles.dashboard}>
      <h2>Abonamente</h2>
      {userEmail ? (
        <p> </p>
      ) : (
        <p style={{ color: 'red' }}>Conecteaza-te pentru a cumpara un abonament</p>
      )}

      <div className={styles.subscriptionGrid}>
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className={styles.subscriptionCard}>
            <h3>{subscription.name}</h3>
            <p>Pret: {subscription.price} lei</p>
            <p>Durata: {subscription.duration_months} luni</p>
            <p>{subscription.description}</p>

            {userSubscription === subscription.name ? (
              <button className={styles.ownedButton} disabled>
                Detinut
              </button>
            ) : (
              <button
                className={styles.buyButton}
                onClick={() => handleBuySubscription(subscription)}
              >
                Cumpară
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionsDashboard;
