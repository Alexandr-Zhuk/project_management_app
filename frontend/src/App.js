import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ViewProject from './pages/ViewProject';

function App() {
  return (
    <div className="h-full">
        <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route path='/project/:id' element={<ViewProject/>}/>
        </Routes>
    </div>
  );
}

export default App;
