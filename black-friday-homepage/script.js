addEventListener("DOMContentLoaded", () => {
  const countdownDisplay = document.querySelector('.black-friday-homepage-hero-main-offer-expiry-countdown');

  let countDownDate = new Date();
  countDownDate.setDate(countDownDate.getDate() + (8 - countDownDate.getDay()) % 7);
  countDownDate.setHours(0,0,0,0);

  const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`

    if (distance < 0) {
      countDownDate = new Date();
      countDownDate.setDate(countDownDate.getDate() + (7 - countDownDate.getDay()) % 7);
    }
  }, 1000);
})
