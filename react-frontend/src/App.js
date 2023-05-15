import { Routes, Route } from 'react-router';
import './App.css';
import Header from './components/Header';
import ListReports from './components/ListReports';

function App() {
  return (
    <div>
      <div className="container">
        <Header/>
        <div className="container">
            <Routes>
                <Route path="/" element={<ListReports />} />
            </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
