import React from "react";
import styles from "./stilizare/acasa.module.css";
import Meniusus from "./Meniusus";
import Meniujos from "./Meniujos";

import supabase from "./supabaseClient";
import { useState } from "react";
import { useEffect } from "react";

const Acasa = () => {


 
  return (
    <div>
      <Meniusus />

      <div className={styles.imageContainer}>
      
      </div>

    

     

      
      
      
      

      
    </div>
  );
};

export default Acasa;
