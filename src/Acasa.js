import React from "react";
import styles from "./stilizare/acasa.module.css";
import Meniusus from "./Meniusus";




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
