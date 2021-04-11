var range = document.getElementById('date_range');
var offset = 0;
var today = new Date();
var dayOfWeekOffset = today.getDay();


function getWeek(offset) {
  offset = offset || 0; // if the function did not supply a new offset, the offset is 0
  var firstDay = new Date();
  firstDay.setDate(firstDay.getDate() - dayOfWeekOffset + (offset * 7));


  var lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 6);
    // the last day is the first day plus 6

  console.log(makeDateString(firstDay), makeDateString(lastDay));
  range.innerHTML = makeDateString(firstDay) + ' - ' + makeDateString(lastDay);
}


function makeDateString(date) {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var y = date.getFullYear();

  var dateString = mm + '/'+ dd + '/'+ y;
  return dateString;

}

function backward() {
  offset = offset - 1;
  getWeek(offset);
}

function forward() {
  offset = offset + 1;
  getWeek(offset);
}

window.onload = function() {
  getWeek();
}
