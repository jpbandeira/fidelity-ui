import { Routes, Route } from "react-router-dom";
import Client from '../pages/client/Client';
import Service from '../pages/service/Service';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Client />} />
      <Route path="/service" element={<Service />} />
    </Routes>
  );
}