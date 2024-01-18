import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RecentGames from './recent-games';
import Login from './login';
import { NextUIProvider } from '@nextui-org/react';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import '@mantine/notifications/styles.css';
import Games from './recent-games';
import Home from './home';

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App() {
  return (
    <MantineProvider defaultColorScheme="auto">
      <Notifications position="top-center" />

      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
//<Route path="/" element={<RecentGames />} />
