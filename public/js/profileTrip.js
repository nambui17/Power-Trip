var start = new Date();
var end = new Date(new Date().setYear(start.getFullYear() + 3));
let userArr;
let destArr;
const r8 = parseInt($('#rating').data('rating'));
if (r8>0) {
  for (var i=0; i<=r8; i++) {
    $(`#${i}`).text('★');
  }
}

$('#selectUsers').on('change', function () {
  var currentUser = String($('#trip_title').data('userid'));
  var selectedUsers = [currentUser];
  var $selectedOptions = $(this).find('option:selected');
  $selectedOptions.each(function () {
    selectedUsers.push($(this).val());
  });
  userArr = selectedUsers;
});

$('#selectDest').on('change', function () {
  var selectedDest = [];
  var destSel = $(this).find('option:selected');
  destSel.each(function () {
    selectedDest.push($(this).val());
  });
  destArr = selectedDest;
});

$('#start-date')
  .datepicker({
    format: 'yyyy-mm-dd',
    startDate: start,
    endDate: end,
  })
  .on('changeDate', function () {
    $('#end-date').datepicker('setStartDate', new Date($(this).val()) + 1);
  });

$('#end-date')
  .datepicker({
    format: 'yyyy-mm-dd',
    startDate: start,
    endDate: end,
  })
  .on('changeDate', function () {
    $('#start-date').datepicker('setEndDate', new Date($(this).val()));
  });

$('#editTripSubmit').on('click', async function (e) {
  e.preventDefault();
  const tripId = $('#trip_title').data('tripid');
  const startDate = $('#start-date').val();
  const endDate = $('#end-date').val();
  const r = parseInt($('#trip-rating').val());
  const done = $('#trip-done').is(':checked');
  const title = $('#tripComment').val();
  const price = $('#trip-price').val();
  if (r <= 5 && r >= 0) {
    const response = await fetch(`/api/trips/${tripId}`, {
      method: 'PUT',
      body: JSON.stringify({
        start_date: startDate,
        end_date: endDate,
        rating: r,
        price: price,
        comment: title,
        done: done,
        users: userArr,
        destinations: destArr,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace(`/profile/trip/${tripId}`);
    } else {
      alert('Failed to update your trip');
    }
  }
});

$('#deleteTrip').on('click', async function (e) {
  e.preventDefault();
  const tripId = $('#trip_title').data('tripid');
  const response = await fetch(`/api/trips/${tripId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Error deleting trip');
  }
});
