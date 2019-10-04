import _ from "lodash";

import Customer from "./Customer";

const ticks = document.getElementById("ticks");
const circles = document.getElementById("circles");
const bonus = document.getElementById("bonus");
const score = document.getElementById("score");
const done = document.getElementById("done");
const topScores = document.getElementById("top-scores");

const restartBtn = document.getElementById("restart-btn");
restartBtn.onclick = restart;

let blockedHealth = false,
  HEALTH_TIME = 2000, // 2 sec to next add health
  CUSTOMERS = 10, // number of random customers
  randomCustomers,
  MAX_TICKS = 720,
  SCORE = 0,
  RENDER_TICK,
  TICK_TIMER,
  bonusUsed = false; // bonus activated

bonus.querySelector("button").addEventListener("click", () => {
  randomCustomers.forEach(customer => customer.addHealth());
  bonus.remove();
});

function circleHandler(e) {
  const { customer } = e.target.dataset;
  if (e.altKey) {
    if (!blockedHealth) {
      randomCustomers[customer].addHealth();
      blockedHealth = true;
      setTimeout(() => {
        blockedHealth = false;
      }, HEALTH_TIME);
    }
  } else {
    randomCustomers[customer].resetLastContacted();
  }
}

function startTickers() {
  RENDER_TICK = setInterval(() => {
    randomCustomers.forEach(i => i.tick());
  }, 1000 / 60);

  TICK_TIMER = setInterval(() => {
    MAX_TICKS -= 1;
    ticks.innerHTML = Math.floor(MAX_TICKS);
    if (SCORE !== 0 && SCORE > 4000 && !bonusUsed) {
      bonus.classList.add("opened");
    }

    if (MAX_TICKS <= 0 || circles.children.length === 0) {
      clearInterval(RENDER_TICK);
      clearInterval(TICK_TIMER);
      circles.removeEventListener("click", circleHandler);

      done.classList.add("active");
      done.querySelector("#last-score").innerHTML = SCORE;

      fetch(`/save/${SCORE}`, {
        method: "POST"
      });
    } else {
      SCORE += Math.floor(
        randomCustomers.reduce((acc, crr) => (acc += crr.health), 0)
      );
      score.innerHTML = SCORE;
    }
  }, 1000 / 6);
}

function restart() {
  done.classList.remove("active");

  MAX_TICKS = 720;
  SCORE = 0;

  if (randomCustomers.length > 0)
    randomCustomers.forEach(i => i.removeCustomer());

  bonusUsed = false;
  if (bonus) {
    bonus.remove();
  }

  init();
}

function init() {
  getScores();

  randomCustomers = Array(CUSTOMERS)
    .fill(null)
    .map(i => {
      const paying = _.random(5, 20);
      const health = _.floor(_.random(0, 10, true), 2);
      const daysToRenewal = _.random(0, 36);
      const daysLastContacted = _.random(0, 9);
      return new Customer({
        paying,
        health,
        daysToRenewal,
        daysLastContacted
      });
    });

  randomCustomers.forEach((customer, idx) => {
    circles.appendChild(customer.render(idx));
  });
  circles.addEventListener("click", circleHandler);

  startTickers();
}

function getScores() {
  return fetch(`/list`)
    .then(resp => resp.json())
    .then(data => {
      topScores.innerHTML = data
        .slice(0, 5)
        .map(i => `<li>${i}</li>`)
        .join("");
    });
}

init();
