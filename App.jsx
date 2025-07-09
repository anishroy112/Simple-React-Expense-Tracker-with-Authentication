import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleLogin = () => {
    if (username && password) {
      setIsLoggedIn(true);
      setCurrentUser(username);
      setUsername('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setExpenses([]);
  };

  const addExpense = () => {
    if (amount && description) {
      const newExpense = {
        id: Date.now(),
        amount: parseFloat(amount),
        description: description,
        date: new Date().toLocaleDateString()
      };
      setExpenses([...expenses, newExpense]);
      setAmount('');
      setDescription('');
    }
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Login to Expense Tracker</h1>
        <div>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ margin: '5px', padding: '5px', display: 'block' }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ margin: '5px', padding: '5px', display: 'block' }}
            />
          </div>
          <button onClick={handleLogin} style={{ margin: '5px', padding: '5px 10px' }}>
            Login
          </button>
        </div>
        <p>Enter any username and password to login</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Simple Expense Tracker</h1>
        <div>
          <span>Welcome, {currentUser}! </span>
          <button onClick={handleLogout} style={{ padding: '5px 10px' }}>
            Logout
          </button>
        </div>
      </div>
      
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
        <h2>Add New Expense</h2>
        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ margin: '5px', padding: '5px' }}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ margin: '5px', padding: '5px' }}
          />
          <button onClick={addExpense} style={{ margin: '5px', padding: '5px 10px' }}>
            Add Expense
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>

      <div>
        <h2>Expense List</h2>
        {expenses.length === 0 ? (
          <p>No expenses yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {expenses.map((expense) => (
              <li key={expense.id} style={{ 
                border: '1px solid #ddd', 
                margin: '5px 0', 
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <strong>{expense.description}</strong> - ${expense.amount.toFixed(2)}
                  <br />
                  <small>{expense.date}</small>
                </div>
                <button 
                  onClick={() => deleteExpense(expense.id)}
                  style={{ padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
