import { Routes, Route } from 'react-router';
import Header from './components/Header';
import ListReports from './pages/ListReports';
import Registration from './pages/auth/Registration';
import AddReport from './pages/AddReport';
import Login from './pages/auth/Login';

function App() { // there are 4 main pages, AddReport is used for both adding and updating report
  return (
    <div>
      <div className="container">
        
        <Header/>

        <div className="container">
            <Routes>

                <Route path="/" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/laborant/:laborantHospitalIdNo/reports" element={<ListReports />} />
                <Route path="/laborant/:laborantHospitalIdNo/:reportId" element={<AddReport />} />
                
            </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
