import React from "react";
import styles from "./stilizare/acasa.module.css";
import Meniusus from "./Meniusus";
import Meniujos from "./Meniujos";
import UsersTable from "./DemoTable";



import supabase from "./supabaseClient";
import { useState } from "react";
import { useEffect } from "react";


const Acasa = () => {


 
  return (
    <div>
      <Meniusus />
      <rpc/>
<UsersTable/>
      <div className={styles.imageContainer}>
      
      </div>

    

     

      
      
      
      

      
    </div>
  );
};

export default Acasa;
