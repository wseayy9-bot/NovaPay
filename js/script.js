const plans = [
{amount:5,profit:0.73},
{amount:10,profit:1.45},
{amount:20,profit:2.90},
{amount:40,profit:5.80},
{amount:80,profit:12.00},
{amount:160,profit:24.00},
{amount:320,profit:48.00},
{amount:640,profit:96.00},
{amount:1280,profit:195.00},
{amount:2560,profit:400.00}
];

if(document.getElementById("plansList")){

let html="";

plans.forEach(plan=>{

html+=`

<div class="plan-card">

<div class="plan-header">

<h2>$${plan.amount}</h2>

<span>20 Days</span>

</div>

<div class="plan-info">

<div>

<p>Daily Profit</p>

<h3>$${plan.profit}</h3>

</div>

<div>

<p>Total Profit</p>

<h3>$${(plan.profit*20).toFixed(2)}</h3>

</div>

</div>

<button
class="invest-btn"
onclick="buyPlan(${plan.amount},${plan.profit})">

Invest Now

</button>

</div>

`;

});

document.getElementById("plansList").innerHTML=html;

}

// ===== BUY PLAN =====

function buyPlan(amount, profit) {

    let plans = JSON.parse(localStorage.getItem("plans")) || [];

    plans.push({
        id: Date.now(),
        amount: amount,
        profit: profit,
        received: 0,
        status: "active",
        startTime: Date.now(),
        nextReward: Date.now() + (22 * 60 * 60 * 1000)
    });

    localStorage.setItem("plans", JSON.stringify(plans));

    alert("Investment Successful!");

    location.href = "mystocks.html";
}

localStorage.setItem("plans",JSON.stringify(myPlans));

alert("Investment Successful!");

location.href="mystocks.html";

}
// ===== UPDATE PLANS =====

function updatePlans() {

    let plans = JSON.parse(localStorage.getItem("plans")) || [];
    let balance = Number(localStorage.getItem("balance")) || 1;

    plans.forEach(plan => {

        if (plan.status != "active") return;

        while (Date.now() >= plan.nextReward && plan.received < 20) {

            balance += plan.profit;

            plan.received++;

            plan.nextReward += 22 * 60 * 60 * 1000;

        }

        if (plan.received >= 20) {

            plan.status = "completed";

        }

    });

    localStorage.setItem("balance", balance.toFixed(2));

    localStorage.setItem("plans", JSON.stringify(plans));

                }
updatePlans();
setInterval(updatePlans,1000);
// ===== SHOW PLANS =====

function getRemaining(startTime){

    const end = startTime + (20*24*60*60*1000);
    const diff = end - Date.now();

    if(diff <= 0){
        return "Completed";
    }

    const d = Math.floor(diff/(1000*60*60*24));
    const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const m = Math.floor((diff%(1000*60*60))/(1000*60));
    const s = Math.floor((diff%(1000*60))/1000);

    return `${d}D ${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function showPlans(){

    const box = document.getElementById("myPlans");

    if(!box) return;

    const plans = JSON.parse(localStorage.getItem("plans")) || [];

    const page = window.location.pathname;

    let list = [];

    if(page.includes("completed.html")){
        list = plans.filter(p=>p.status=="completed");
    }else{
        list = plans.filter(p=>p.status=="active");
    }

    let html = "";

    list.forEach(plan=>{

        const percent = (plan.received/20)*100;

        html += `
        <div class="plan-card">

            <div class="plan-header">

                <h3>$${plan.amount} PLAN</h3>

                <span>${plan.received}/20</span>

            </div>

            <div class="plan-info">

                <div>

                    <small>Investment</small>

                    <h4>$${plan.amount}</h4>

                </div>

                <div>

                    <small>Daily Profit</small>

                    <h4>$${plan.profit}</h4>

                </div>

            </div>

            <div class="progress">

                <div class="progress-bar"
                style="width:${percent}%"></div>

            </div>

            <p class="countdown">

            ⏰ ${getRemaining(plan.startTime)}

            </p>

        </div>
        `;

    });

    box.innerHTML = html;

}

showPlans();

setInterval(showPlans,1000);
function copyAddress(){

const address=document.getElementById("walletAddress").innerText;

navigator.clipboard.writeText(address);

alert("Wallet Address Copied");

}

function submitDeposit(){

const amount=Number(document.getElementById("depositAmount").value);

if(amount<5){

alert("Minimum Deposit is $5");

return;

}

alert("Deposit request submitted.\nWaiting for confirmation.");

}
function submitWithdraw(){

let balance =
Number(localStorage.getItem("balance")) || 0;

let amount =
Number(document.getElementById("withdrawAmount").value);

let address =
document.getElementById("withdrawAddress").value;

if(address==""){

alert("Please enter wallet address");

return;

}

if(amount<5){

alert("Minimum withdraw is $5");

return;

}

if(amount>balance){

alert("Insufficient balance");

return;

}

balance-=amount;

localStorage.setItem(
"balance",
balance.toFixed(2)
);

alert("Withdraw request submitted");

}
