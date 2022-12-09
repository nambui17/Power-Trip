const newFormHandler = async (event) => {
  event.preventDefault();

  const dates = document.querySelector('#trip-dates').value.trim();
  const rating = document.querySelector('#trip-rating').value.trim();
  const comment = document.querySelector('#trip-comment').value.trim();
  const price = document.querySelector('#trip-price').value.trim();
  const done = $('#trip-done').attr('checked');

  if (dates && rating && comment && price) {
    const response = await fetch(`/api/trips`, {
      method: 'POST',
      body: JSON.stringify({ dates: dates, rating: rating, comment: comment, price: price, done: done }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create your trip');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);
