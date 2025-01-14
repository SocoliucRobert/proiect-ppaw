import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Acasa from './PaginiPrincipale/Acasa.js';

import Contact from './Business/Contact.js';
import Login from './Login/Login.js';
import Inregistrare from './Login/Inregistrare.js';
import ResetareParola from './Login/ResetareParola.js';
import Updateparola from './Login/Updateparola.js';

import Chestionare from './PaginiPrincipale/Chestionare.js';
import Abonamente from './PaginiPrincipale/Abonamente.js';
import QuizPage from './Business/QuizPage';
import AvailableQuizzes from './Business/AvailableQuizzes';
import AdminQuestions from './Admin/AdminQuestions';
import AdminQuizzes from './Admin/AdminQuizzes';
import AdminAnswers from './Admin/AdminAnswers';
import AdminContact from './Admin/AdminContact.js';

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
        <Route path="/AdminQuestions" element={<AdminQuestions />} />
        <Route path="/AdminQuizzes" element={<AdminQuizzes />} />
        <Route path="/AdminAnswers" element={<AdminAnswers />} />
        <Route path="/AdminContact" element={<AdminContact />} />
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
