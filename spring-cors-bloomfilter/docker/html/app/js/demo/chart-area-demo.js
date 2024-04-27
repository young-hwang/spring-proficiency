Chart.defaults.global.defaultFontFamily = 'Nunito' , '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';
function number_format(number, decimals, dec_point, thousands_sep) {
  performance.mark("chart-area-demo.js_number_format-start");
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, dec = (typeof dec_point === 'undefined') ? '.' : dec_point, s = '', toFixedFix = function(n, prec) {
  performance.mark("chart-area-demo.js_16c38b77-2499-4274-81d3-bbc7abf990ec-start");
  var k = Math.pow(10, prec);
  performance.mark("chart-area-demo.js_16c38b77-2499-4274-81d3-bbc7abf990ec-end");
  performance.measure("chart-area-demo.js_16c38b77-2499-4274-81d3-bbc7abf990ec", "chart-area-demo.js_16c38b77-2499-4274-81d3-bbc7abf990ec-start", "chart-area-demo.js_16c38b77-2499-4274-81d3-bbc7abf990ec-end");
  return '' + Math.round(n * k) / k;
  };
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  performance.mark("chart-area-demo.js_number_format-end");
  performance.measure("chart-area-demo.js_number_format", "chart-area-demo.js_number_format-start", "chart-area-demo.js_number_format-end");
  return s.join(dec);
  }
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line', 
  data: {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
  datasets: [{
  label: "Earnings", 
  lineTension: 0.3, 
  backgroundColor: "rgba(78, 115, 223, 0.05)", 
  borderColor: "rgba(78, 115, 223, 1)", 
  pointRadius: 3, 
  pointBackgroundColor: "rgba(78, 115, 223, 1)", 
  pointBorderColor: "rgba(78, 115, 223, 1)", 
  pointHoverRadius: 3, 
  pointHoverBackgroundColor: "rgba(78, 115, 223, 1)", 
  pointHoverBorderColor: "rgba(78, 115, 223, 1)", 
  pointHitRadius: 10, 
  pointBorderWidth: 2, 
  data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000]}]}, 
  options: {
  maintainAspectRatio: false, 
  layout: {
  padding: {
  left: 10, 
  right: 25, 
  top: 25, 
  bottom: 0}}, 
  scales: {
  xAxes: [{
  time: {
  unit: 'date'}, 
  gridLines: {
  display: false, 
  drawBorder: false}, 
  ticks: {
  maxTicksLimit: 7}}], 
  yAxes: [{
  ticks: {
  maxTicksLimit: 5, 
  padding: 10, 
  callback: function(value, index, values) {
  performance.mark("chart-area-demo.js_b5fbb480-b216-4b86-a8f8-9debb8fcb919-start");
  performance.mark("chart-area-demo.js_b5fbb480-b216-4b86-a8f8-9debb8fcb919-end");
  performance.measure("chart-area-demo.js_b5fbb480-b216-4b86-a8f8-9debb8fcb919", "chart-area-demo.js_b5fbb480-b216-4b86-a8f8-9debb8fcb919-start", "chart-area-demo.js_b5fbb480-b216-4b86-a8f8-9debb8fcb919-end");
  return '$' + number_format(value);
  }}, 
  gridLines: {
  color: "rgb(234, 236, 244)", 
  zeroLineColor: "rgb(234, 236, 244)", 
  drawBorder: false, 
  borderDash: [2], 
  zeroLineBorderDash: [2]}}]}, 
  legend: {
  display: false}, 
  tooltips: {
  backgroundColor: "rgb(255,255,255)", 
  bodyFontColor: "#858796", 
  titleMarginBottom: 10, 
  titleFontColor: '#6e707e', 
  titleFontSize: 14, 
  borderColor: '#dddfeb', 
  borderWidth: 1, 
  xPadding: 15, 
  yPadding: 15, 
  displayColors: false, 
  intersect: false, 
  mode: 'index', 
  caretPadding: 10, 
  callbacks: {
  label: function(tooltipItem, chart) {
  performance.mark("chart-area-demo.js_7e458bcd-2ac2-4405-b43e-334485982bca-start");
  var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
  performance.mark("chart-area-demo.js_7e458bcd-2ac2-4405-b43e-334485982bca-end");
  performance.measure("chart-area-demo.js_7e458bcd-2ac2-4405-b43e-334485982bca", "chart-area-demo.js_7e458bcd-2ac2-4405-b43e-334485982bca-start", "chart-area-demo.js_7e458bcd-2ac2-4405-b43e-334485982bca-end");
  return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
  }}}}});
