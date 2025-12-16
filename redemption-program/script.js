addEventListener("DOMContentLoaded", () => {
  const countdownDisplay = document.querySelector('.redemption-program-eligible-main-offer-expiry p span');
  const countdownDisplay2 = document.querySelector('.redemption-program-check-eligibility-main-title-countdown p span');

  let countDownDate = new Date();
  countDownDate = new Date(countDownDate.getTime() + 5*60000);

  const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownDisplay.innerHTML = `${minutes}m ${seconds}s`
    countdownDisplay2.innerHTML = `${minutes}m ${seconds}s`

    if (distance < 0) {
      countDownDate = new Date();
      countDownDate = new Date(countDownDate.getTime() + 5*60000);
    }
  }, 1000);
})

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const eligibilityAPIURL = 'https://app.lrlos.com/webhook/Check-Eligibility';

const checkEligibility = (target) => {
  const redemptionProgramCheckEligibility = document.querySelector('.redemption-program-check-eligibility');
  const redemptionProgramCheckEligibilityTitle = document.querySelector('.redemption-program-check-eligibility-main-title');
  const redemptionProgramEligible = document.querySelector('.redemption-program-eligible');
  const redemptionProgramAlreadyRedeemedTitle = document.querySelector('.redemption-program-check-eligibility-main-title-already-redeemed');
  const redemptionProgramAlreadyRedeemedAlert = document.querySelector('.redemption-program-check-eligibility-main-already-redeemed-alert');
  const redemptionProgramEmailNotFoundTitle = document.querySelector('.redemption-program-check-eligibility-main-title-not-found');
  const redemptionProgramEmailNotFoundAlert = document.querySelector('.redemption-program-check-eligibility-main-not-found-alert');
  const redemptionProgramEmailFoundAlertEmailField = document.querySelector('.redemption-program-check-eligibility-main-found-alert-email-field');
  const redemptionProgramEligibleSubmitButton = document.querySelector('.redemption-program-eligible-main-offer-submit-button');
  const redemptionProgramEligiblePayTodayPriceAmountDue = document.querySelector('.redemption-program-eligible-main-pay-today-price-amount-due');
  const redemptionProgramEligiblePayTodayPriceDiscount = document.querySelector('.redemption-program-eligible-main-pay-today-price-discount');
  const redemptionProgramEligiblePayTodayCustomerId = document.querySelector('.redemption-program-eligible-main-pay-today-customer-id');
  const redemptionProgramEligiblePayTodayOutstandingBalance = document.querySelector('.redemption-program-eligible-main-pay-today-outstanding-balance');
  const redemptionProgramAccountGood = document.querySelector('.redemption-program-account-good');
  const redemptionProgramAccountGoodFoundAlertEmailField = document.querySelector('.redemption-program-account-good-main-found-alert-email-field');
  const redemptionProgramAccountGoodCustomerId = document.querySelector('.redemption-program-account-good-main-customer-info-customer-id');

  redemptionProgramAlreadyRedeemedAlert.style.display = 'none';
  redemptionProgramAlreadyRedeemedTitle.style.display = 'none';
  redemptionProgramEmailNotFoundAlert.style.display = 'none';
  redemptionProgramEmailNotFoundTitle.style.display = 'none';
  redemptionProgramCheckEligibilityTitle.style.display = 'flex';

  const email = document.getElementById('redemption-program-check-eligibility-form-email-input').value
  const defaultButtonContent = target.innerHTML;

  target.innerHTML = `<span class="redemption-program-check-eligibility-loader"></span>`;
  target.disabled = true;

  fetch(`${eligibilityAPIURL}?email=${email}`)
    .then((response) => response.json())
    .then((response) => {
      target.innerHTML = defaultButtonContent;
      target.disabled = false;

      window.scrollTo(0, 0);

      if (response.error) {
        switch (response.error.toLowerCase()) {
          case 'already redeemed':
            redemptionProgramCheckEligibilityTitle.style.display = 'none';
            redemptionProgramAlreadyRedeemedTitle.style.display = 'flex';
            redemptionProgramAlreadyRedeemedAlert.style.display = 'flex';
            break;
          case 'customer not found':
            redemptionProgramCheckEligibilityTitle.style.display = 'none';
            redemptionProgramEmailNotFoundAlert.querySelector('.redemption-program-check-eligibility-main-not-found-alert-email-field').innerText = email;
            redemptionProgramEmailNotFoundAlert.style.display = 'flex';
            redemptionProgramEmailNotFoundTitle.style.display = 'flex';
            break;
        }
      } else {
        const data = response[0];

        if (data.eligible_for_redemption) {
          const amountOff = Math.round((data.total_due_usd - 75 + Number.EPSILON) * 100) / 100;

          const percentageOff = Math.floor((amountOff / data.total_due_usd) * 100);

          redemptionProgramCheckEligibility.style.display = 'none';
          redemptionProgramEligible.style.display = 'flex';
          redemptionProgramEmailFoundAlertEmailField.innerText = email;
          redemptionProgramEligiblePayTodayPriceAmountDue.querySelector('span').innerText = data.total_due_usd;
          redemptionProgramEligiblePayTodayCustomerId.innerText = email;
          redemptionProgramEligiblePayTodayPriceDiscount.innerText = `Save $${amountOff} (${percentageOff}% off)`;
          redemptionProgramEligiblePayTodayOutstandingBalance.innerText = `$${data.total_due_usd}`;

          redemptionProgramEligibleSubmitButton.addEventListener('click', () => {
            window.location.href = data.redemption_link;
          })
        } else if (data.total_due_usd === 0) {
          redemptionProgramCheckEligibility.style.display = 'none';
          redemptionProgramAccountGood.style.display = 'flex';
          redemptionProgramAccountGoodFoundAlertEmailField.innerText = email;
          redemptionProgramAccountGoodCustomerId.innerText = email;
        }
      }
    }).catch(() => {
      target.innerHTML = defaultButtonContent;
      target.disabled = false;
    })
}

const dismissRedemptionProgramEligibleToast = () => {
  const redemptionProgramEligibleToast = document.querySelector('.redemption-program-eligible-toast');
  redemptionProgramEligibleToast.style.display = 'none';
}

const emailInputChanged = (target) => {
  const redemptionProgramCheckEligibilityFormSubmit = document.querySelector('.redemption-program-check-eligibility-form-submit');
  const redemptionProgramCheckEligibilityFormEmailValidationText = document.querySelector('.redemption-program-check-eligibility-form-email-validation-text');

  if (validateEmail(target.value) || target.value.trim().length == 0) {
    redemptionProgramCheckEligibilityFormEmailValidationText.style.display = 'none';
    redemptionProgramCheckEligibilityFormSubmit.disabled = false;
  } else {
    redemptionProgramCheckEligibilityFormEmailValidationText.style.display = 'block';
    redemptionProgramCheckEligibilityFormSubmit.disabled = true;
  }
}

const emailInputKeyDown = () => {
  if (event.key === 'Enter') {
    const submitButton = document.querySelector('.redemption-program-check-eligibility-form-submit');
    submitButton.click();
  }
}
