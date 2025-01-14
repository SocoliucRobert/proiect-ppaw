import React from "react";
import styles from "../stilizare/acasa.module.css";
import Meniusus from "./Meniusus";
import SubscriptionsDashboard from "../Business/SubscriptionsDasboard";

const Abonamente = () => {
  return (
    <div>
      <Meniusus />

      <SubscriptionsDashboard />

      <div className={styles.imageContainer}></div>
    </div>
  );
};

export default Abonamente;
