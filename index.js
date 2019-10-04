import _ from "lodash";

import Customer from "./Customer";

const circles = document.getElementById("circles");
const customers = document.getElementById("customers");

const randomCustomers = Array(10)
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

function renderCircles() {
  randomCustomers.forEach((customer, idx) => {
    circles.appendChild(customer.render(idx));
  });
}

function init() {
  renderCircles();
  circles.addEventListener("click", e => {
    const { customer } = e.target.dataset;
  });
}

init();

setInterval(() => {
  randomCustomers.forEach(i => i.tick());
}, 1000 / 60);
