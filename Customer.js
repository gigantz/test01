import _ from "lodash";

const SIZE = 3,
  RENEWAL_DAYS = 360,
  SINCE_CONTACTED = 90;

const setColor = (value, opacity = 1) => {
  if (value > 7.5) {
    return `rgba(76, 175, 80, ${opacity})`;
  } else if (value < 3.5) {
    return `rgba(244, 67, 54, ${opacity})`;
  } else {
    return `rgba(255, 193, 7, ${opacity})`;
  }
};

class Customer {
  constructor({ paying, health, daysToRenewal, daysLastContacted }) {
    this.paying = paying || 0;
    this.health = health || 0;
    this.daysToRenewal = daysToRenewal || 0;
    this.daysLastContacted = daysLastContacted || 0;
    this.element = null;
  }

  tick() {
    if (this.daysToRenewal >= RENEWAL_DAYS / 10) {
      this.daysToRenewal = 0;
    } else if (this.daysLastContacted >= SINCE_CONTACTED / 10) {
      this.daysLastContacted = 0;
    } else {
      this.daysToRenewal += 0.01;
      this.daysLastContacted += 0.0075;
    }

    this.element.style.transform = `translate(${this.daysToRenewal *
      SIZE *
      10}px, ${this.daysLastContacted * SIZE * 10}px)`;
  }

  render(idx) {
    this.element = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    this.element.setAttributeNS(null, "data-customer", idx);
    this.element.setAttributeNS(null, "r", this.paying * SIZE);
    this.element.style.fill = setColor(this.health, 0.8);
    this.element.style.stroke = setColor(this.health);
    this.element.style.willChange = "transform";
    this.element.style.transform = `translate(${this.daysToRenewal *
      SIZE *
      10}px, ${this.daysLastContacted * SIZE * 10}px)`;

    return this.element;
  }

  getData() {
    return {
      paying: this.paying,
      health: this.health,
      daysToRenewal: _.floor(this.daysToRenewal, 2),
      daysLastContacted: _.floor(this.daysLastContacted, 2)
    };
  }
}

export default Customer;
