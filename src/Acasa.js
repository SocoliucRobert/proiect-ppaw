import React from "react";
import styles from "./stilizare/acasa.module.css";
import Meniusus from "./Meniusus";
import Meniujos from "./Meniujos";
import UsersTable from "./DemoTable";
import UserView from './MVCFormat/UserView';



import supabase from "./supabaseClient";
import { useState } from "react";
import { useEffect } from "react";
import UserController from "./MVCFormat/UserController";


const Acasa = () => {


 
  return (
    <div>
      <Meniusus />
    

      <UserController />
     
      <div className={styles.imageContainer}>
      
      </div>

    

     

      
      
      
      

      
    </div>
  );
};

export default Acasa;
