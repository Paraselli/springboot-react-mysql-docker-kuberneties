import React from 'react';
import axios from 'axios';

function App() {
  const login = async () => {
    const res = await axios.post('http://localhost:8080/api/auth/login');
    alert(res.data);
  };

  return (
    <div>
      <h1>React JWT App</h1>
      <button onClick={login}>Login</button>
    </div>
  );
}
export default App;