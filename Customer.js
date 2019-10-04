const SIZE = 1;
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
  }

  render() {
    return `
        <circle
          cx="${this.daysToRenewal * SIZE}" 
          cy="${this.daysLastContacted * SIZE}"
          r="${this.paying * SIZE}" 
          style="fill:${setColor(this.health, 0.8)};stroke:${setColor(
      this.health
    )};"
        />
    `;
  }
}

export default Customer;
