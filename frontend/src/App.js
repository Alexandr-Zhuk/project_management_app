import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ViewProject from './pages/ViewProject';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';

function App() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  return (
    <div className="h-full">
        <Routes>
            <Route path='/' element={<MainPage/>} />
            <Route element={<ProtectedRoute isAuth={accessToken} />}>
              <Route path='/project/:id' element={<ViewProject/>} />
				    </Route>
            <Route path='/auth' element={<AuthPage/>} />
        </Routes>
    </div>
  );
}

export default App;
