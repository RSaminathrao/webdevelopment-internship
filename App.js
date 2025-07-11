import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './home';
import Name from './name';
import Login from './login';
import  Register from './register';
function App(){
  return(
  <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/name" element={<Name/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
  </Router>)
}
export default App;