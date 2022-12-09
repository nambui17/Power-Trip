var start = new Date();
var end = new Date(new Date().setYear(start.getFullYear() + 1));
let userArr;
let destArr;
$('#selectUsers').on('change', function() {
  var selectedUsers = [];
  var $selectedOptions = $(this).find('option:selected');
  $selectedOptions.each(function() {
    selectedUsers.push($(this).val());
  });
  userArr = selectedUsers;
});

$('#selectDest').on('change', function() {
  var selectedDest = [];
  var destSel = $(this).find('option:selected');
  destSel.each(function() {
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
    $('#end-date').datepicker('setStartDate', new Date($(this).val()));
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

$('#tripCreate').on('click', async function (e) {
  e.preventDefault();
  debugger;
  const tripTitle = $('#tripComment').val();
  const startDate = $('#start-date').val();
  const endDate = $('#end-date').val();
  const price = $('#trip-price').val();
  const rating = $('#trip-rating').val();
  const done = $('#trip-done').is(':checked');
  console.log(userArr);
  console.log(destArr);
  if (tripTitle && startDate && endDate && price && rating) {
    const response = await fetch('/api/trips', {
      method: 'POST',
      body: JSON.stringify({
        start_date: startDate,
        end_date: endDate,
        rating: rating,
        comment: tripTitle,
        price: price,
        done: done,
        users: userArr,
        destinations: destArr
      }),
      headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create your trip');
    }
  }
});
