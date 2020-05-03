import React from 'react';
import './App.css';
import Calendar from './components/Calendar';

function App() {
  return <Calendar onSelected={d => console.log(d)} />;
}

export default App;
