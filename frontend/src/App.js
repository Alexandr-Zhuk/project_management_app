import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="h-full">
        <Routes>
            <Route path='/' element={<MainPage/>} />
        </Routes>
    </div>
  );
}

export default App;
