
google.charts.load('current', {
  'packages': ['corechart', 'line'],
});
google.charts.setOnLoadCallback(initialize);

function initialize() {
  var queryString = encodeURIComponent('select B, C, D limit 400 label C "°C", D "%RH"');
  var query = new google.visualization.Query(
    'https://docs.google.com/---your-google-sheet---/gviz/tq?sheet=Sheet1&headers=0&tq=' + queryString);
  query.send(handleSampleDataQueryResponse);
}

function handleSampleDataQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();

  var options = {
    height: 600,
    hAxis: {
      title: 'Hour',
      direction: -1
    },
    vAxis: {
      title: 'Temperature'
    }
  };
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
