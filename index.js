import _ from "lodash";

import Customer from "./Customer";

const randomCustomers = Array(10)
  .fill(null)
  .map(i => {
    const paying = _.random(5, 20);
    const health = _.floor(_.random(0, 10, true), 2);
    const daysToRenewal = _.random(0, 360);
    const daysLastContacted = _.random(0, 90);

    return new Customer({
      paying,
      health,
      daysToRenewal,
      daysLastContacted
    });
  });

const playground = document.getElementById("playground");
const layer1 = document.getElementById("layer1");
const background = document.getElementById("background");

function main() {
  layer1.innerHTML = `
    <svg class="customers" viewBox="0 0 360 90" width="1080" height="450" preserveAspectRatio="xMidYMid meet">
      <g>${randomCustomers.map(i => i.render()).join("")}</g>
      
      <g class="axis" transform="translate(0,90)">
        <path class="domain" d="M30,0.5V0H1080V0.5"></path>
      </g>

      <g class="axis" transform="translate(30,0)">
        <path class="domain" d="M-0.5,30H0V90H-0.5">
        </path>
      </g>
    </svg>`;
}

main();
