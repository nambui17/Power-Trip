$('.signup-form').on('submit', async function (event) {
  event.preventDefault();
  const username = $('#username-signup').val();
  const password = $('#password-signup').val();
  const passre = $('#passRe-signup').val();
  const passwordHelp = $('#passwordHelpBlock');

  if (username && password && passre) {
    if (password === passre) {
      passwordHelp.attr('hidden', true);
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    } else {
      passwordHelp.attr('hidden', false);
    }
  }
});
