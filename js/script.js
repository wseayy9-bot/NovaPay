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
