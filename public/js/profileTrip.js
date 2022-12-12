var start = new Date();
var end = new Date(new Date().setYear(start.getFullYear() + 3));
let userArr;
let destArr;

$('#selectUsers').on('change', function () {
  var currentUser = $('#userWelcome').data('userid');
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