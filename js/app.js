var address = "0x56db9d7156ec324f2d4f998916497c756fd87fbf";
var apiUrl = "https://api.nanopool.org/v1/eth"; // No Trailing / to it
//API mainUrl
var mainURL = apiUrl + '/' + "balance_hashrate" + '/' + address;
var paymentUrl = apiUrl + '/' + "payments" + '/' + address;

fetch(mainURL, {method: 'get'})
.then((res) => res.json())
.then((response) =>{
var hashrate = parseFloat(response.data.hashrate);
var balance = parseFloat(response.data.balance).toFixed(6);
var percent = (balance/0.05)*100;
if (hashrate != 0){
  document.getElementById("status1").style.display = "";
  document.getElementById("status2").style.display = "none";
}else{
  document.getElementById("status1").style.display = "none";
  document.getElementById("status2").style.display = "";
}
  document.getElementById('balance').innerHTML = balance +' ETH';
  document.getElementById('progressbar').innerHTML = `
      <div class="progress-bar progress-bar-striped bg-success"
      role="progressbar"
      style="width: ${percent}%"
      aria-valuenow="25"
      aria-valuemin="0"
      aria-valuemax="100">
      </div>
  `;

});

fetch(paymentUrl, {method: 'get'})
.then((res) => res.json())
.then((response) =>{
  var data = response.data; 
  var paymentDate = data[0].date;
  document.getElementById('list1').innerHTML = data.length;
  document.getElementById('list2').innerHTML = new Date(paymentDate*1000);
  document.getElementById('list3').innerHTML = data[0].txHash;
  document.getElementById('list4').innerHTML = data[0].amount;
  document.getElementById('list5').innerHTML = data.length*0.05 + ' ETH';

});
