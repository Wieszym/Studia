document.getElementById('connectionForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const dbname = document.getElementById('dbname').value;
  const user = document.getElementById('user').value;
  const password = document.getElementById('password').value;
  const host = document.getElementById('host').value;
  const port = document.getElementById('port').value;

  const resultElement = document.getElementById('result');
  resultElement.style.display = 'block';

  try {
    const response = await fetch('/testConnection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dbname, user, password, host, port }),
    });

    if (response.ok) {
      resultElement.textContent = "Połączono z bazą danych.";
      resultElement.className = 'result-success';
    } else {
      const message = "Błąd autoryzacji hasłem nie powiodła się dla użytkownika " + user;
      resultElement.textContent = message;
      resultElement.className = 'result-error';
    }
  } catch (error) {
    resultElement.textContent = 'Połączenie z serwerem nieudane.';
    resultElement.className = 'result-error';
  }
});
