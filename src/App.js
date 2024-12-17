import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Acasa from './Acasa';

import Contact from './Contact';
import Login from './Login';
import Inregistrare from './Inregistrare';
import ResetareParola from './ResetareParola';
import Updateparola from './Updateparola';
import Admineditarequestions from './Admin/Admineditarequestions';
import Chestionare from './Chestionare';
import Abonamente from './Abonamente';
import QuizPage from './QuizPage';
import AvailableQuizzes from './AvailableQuizzes';


function App() {
  return (
    <Router>

      
      <Routes>
        
      <Route path="/" element={<Acasa/>} />
        <Route path="/Acasa" element={<Acasa />} />
        <Route path="/Chestionare" element={<Chestionare/>} />
        <Route path="/Abonamente" element={<Abonamente/>} />
        <Route path="/AvailableQuizzes" element={<AvailableQuizzes/>} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/Admineditarequestions" element={<Admineditarequestions />} />
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
