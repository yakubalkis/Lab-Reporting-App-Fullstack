import { Routes, Route } from 'react-router';
import './App.css';
import Header from './components/Header';
import ListReports from './components/ListReports';
import Registration from './components/Registration';
import AddReport from './components/AddReport';

function App() {
  return (
    <div>
      <div className="container">
        <Header/>
        <div className="container">
            <Routes>

                <Route path="/" element={<Registration />} />
                <Route path="/laborant/:laborantHospitalIdNo/reports" element={<ListReports />} />
                <Route path="/laborant/:laborantHospitalIdNo/:reportId" element={<AddReport />} />
                
            </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
