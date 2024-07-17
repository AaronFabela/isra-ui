import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login/Login';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import MainLayout from './layout/MainLayout';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <div style={{height:"100vh"}}>
      <Router>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          {/* <Route path="atletas" element={<Atletas />} /> */}
          {/* Puedes agregar más rutas aquí si es necesario */}
        </Route>
        {/* Puedes agregar más rutas aquí si lo necesitas */}
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
