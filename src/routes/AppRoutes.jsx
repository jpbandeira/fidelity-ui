import React from 'react';
import { Routes, Route } from "react-router-dom";
import Client from '../pages/client/Client';
import Appointment from '../pages/appointment/Appointment';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="*" element={<Client />} />
      <Route path="/appointment" element={<Appointment />} />
    </Routes>
  );
}