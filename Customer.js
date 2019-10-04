import _ from "lodash";

const SIZE = 3,
  SPEED = 100,
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

  resetLastContacted() {
    this.daysLastContacted = 0;
    this.element.style.transform = `translate(${this.daysToRenewal *
      SIZE *
      10}px, ${this.daysLastContacted * SIZE * 10}px)`;
  }

  removeCustomer() {
    if (this.element) this.element.remove();
  }

  addHealth() {
    this.health += 3;
    this.element.setAttributeNS(null, "class", "healthed");
    setTimeout(() => {
      this.element.classList.remove("healthed");
    }, 1000);
  }

  tick() {
    if (this.daysToRenewal >= RENEWAL_DAYS / 10 && this.health < 3.5) {
      this.removeCustomer();
      return;
    }

    if (this.daysToRenewal >= RENEWAL_DAYS / 10) {
      this.daysToRenewal = 0;
    } else if (this.daysLastContacted >= SINCE_CONTACTED / 10) {
      this.daysLastContacted = 0;
      this.removeCustomer();
    } else {
      this.daysToRenewal += 1 / SPEED;
      const yPos = (1 / SPEED) * (SINCE_CONTACTED / RENEWAL_DAYS) * SIZE;
      this.daysLastContacted += Math.log(Math.pow(1 + 1 / yPos, yPos)) / 3;
    }

    if (this.health < 10 && this.health >= 3.5) {
      this.health += _.random(0.01, -0.05);
    }

    this.element.style.fill = setColor(this.health, 0.8);
    this.element.style.stroke = setColor(this.health);

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
