import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Acasa from './Acasa';

import Contact from './Contact';
import Login from './Login';
import Inregistrare from './Inregistrare';
import ResetareParola from './ResetareParola';
import Updateparola from './Updateparola';


function App() {
  return (
    <Router>

      
      <Routes>
        
      <Route path="/" element={<Acasa/>} />
        <Route path="/Acasa" element={<Acasa />} />
       
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Inregistrare" element={<Inregistrare />} />
        <Route path="/ResetareParola" element={<ResetareParola />} />
        <Route path="/Updateparola" element={<Updateparola />} />
      
        <Route path="/supabaseClient" element={<supabase />} />
     
      
      </Routes>
     
    </Router>
    
    
  );
}
export default App;
