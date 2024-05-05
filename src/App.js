import './styles/App.css';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login  from './components/Login';
import Dashboard  from './components/Dashboard';
import Register from './components/Register';
import Exercises from './components/Exercises';
import AdminDashboard from './components/adminDashboard';
import Rutines from './components/Rutines';
import DoRoutines from './components/doRoutines';
import RealizarRoutines from './components/realizacionRoutines';
import PageDefault from './components/pageDefault';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" exact element={ <Dashboard /> } />
        <Route path="/" exact element={ <Login /> } />
        <Route path="/Register" exact element={ <Register /> } />
        <Route path="/Exercises" exact element={ <Exercises /> } />
        <Route path="/Admin" exact element={ <AdminDashboard /> } />
        <Route path="/Routines" exact element={ <Rutines /> } />
        <Route path="/Routines/:id/:name" exact element={ <DoRoutines /> } />
        <Route path="/Routines/:id/:name/realizar" exact element={ <RealizarRoutines /> } />
        <Route path="/Default" element={ <PageDefault /> } />
      </Routes>
    </Router>
  )}

export default App;
