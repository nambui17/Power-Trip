$('#login').on('click', async function (event) {
  event.preventDefault();
  const username = $('#username-login').val();
  const password = $('#password-login').val();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
});
