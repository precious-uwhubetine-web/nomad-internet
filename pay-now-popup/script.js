const getDateStringFromTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const api = {
  checkInvoiceStatusEndpoint: 'https://app.lrlos.com/webhook/Check-Invoice-status',
  emailLookupEndpoint: 'https://app.lrlos.com/webhook/Pay-Now-Look-up',
  generatePayNowLinkByCustomerIdEndpoint: 'https://app.lrlos.com/webhook/Pay-Now-Generate-Link',
  getSubscriptionsByCustomerIdEndpoint: 'https://app.lrlos.com/webhook/Get-Subscriptions',
  payFutureInvoiceEndpoint: 'https://app.lrlos.com/webhook/Pay-future-Invoice',
}

const showPayNowPopup = () => {
  const payNowPopupContainer = document.getElementById('pay-now-popup-container');
  const payNowPopup = document.getElementById('pay-now-popup');
  const payNowPopupCloseButton = document.getElementById('pay-now-popup-header-close-button');
  const payNowStepOne = document.getElementById('pay-now-popup-step-one');
  const payNowStepTwo = document.getElementById('pay-now-popup-step-two');
  const payNowStepThree = document.getElementById('pay-now-popup-step-three');
  const payNowStepFour = document.getElementById('pay-now-popup-step-four');

  const payNowStepOneFormButton = document.getElementById('pay-now-popup-step-one-form-button');

  const payNowStepFourPaymentDetailsSubscriptionInfo = document.getElementById('pay-now-popup-step-four-payment-details-subscription-info');
  const payNowStepFourPaymentDetailsAmountPaid = document.getElementById('pay-now-popup-step-four-payment-details-amount-paid');
  const payNowStepFourPaymentDetailsProcessedOn = document.getElementById('pay-now-popup-step-four-payment-details-processed-on');
  const payNowStepFourReceiptInfoEmailDisplay = document.getElementById('pay-now-popup-step-four-receipt-info-email-display');

  payNowPopupContainer.style.display = 'flex';

  payNowStepOne.style.display = 'flex';
  payNowStepTwo.style.display = 'none';
  payNowStepThree.style.display = 'none';
  payNowStepFour.style.display = 'none';

  payNowStepOneFormButton.innerHTML = 'PAY NOW'
  payNowStepOneFormButton.disabled = false;

  payNowStepFourPaymentDetailsSubscriptionInfo.innerText = '';
  payNowStepFourPaymentDetailsAmountPaid.innerText = '';
  payNowStepFourPaymentDetailsProcessedOn.innerText = '';
  payNowStepFourReceiptInfoEmailDisplay.innerText = '';

  payNowPopupContainer.addEventListener('click', () => {
    closePayNowPopup();
  });

  payNowPopup.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  payNowPopupCloseButton.addEventListener('click', () => {
    closePayNowPopup();
  });
}

const showPayNowPopupStepTwo = async (customerData, accountsList) => {
  const payNowStepOne = document.getElementById('pay-now-popup-step-one');
  const payNowStepTwo = document.getElementById('pay-now-popup-step-two');
  const payNowStepTwoEmailDisplay = document.getElementById('pay-now-popup-step-two-email');
  const payNowStepTwoAccountsList = document.getElementById('pay-now-popup-step-two-accounts-list');
  const payNowStepTwoLoader = document.getElementById('pay-now-popup-step-two-loader');

  payNowStepOne.style.display = 'none';
  payNowStepTwo.style.display = 'flex';
  payNowStepTwoLoader.style.display = 'flex';
  payNowStepTwoAccountsList.style.display = 'none';

  payNowStepTwoEmailDisplay.innerText = customerData.email;
  payNowStepTwoAccountsList.innerHTML = '';

  for (let i = 0; i < accountsList.length; i++) {
    const entry = accountsList[i];

    let invoiceStatus = await fetch(
      `${api.checkInvoiceStatusEndpoint}?customerID=${entry.customer_id}`,
      {
        headers: {
          'Authorization': 'whY-tSR2E12Y9QEIaZ9z'
        }
      }
    );

    invoiceStatus = await invoiceStatus.json();

    const listItem = document.createElement('li');
    const button = document.createElement('button');

    button.addEventListener('click', async () => {
      if (invoiceStatus.hasUnpaidInvoices) {
        let paymentLinkResult = await fetch(
        `${api.generatePayNowLinkByCustomerIdEndpoint}?Custumer_id=${entry.customer_id}`,
          {
            headers: {
              'Authorization': 'whY-tSR2E12Y9QEIaZ9z'
            }
          }
        );

        paymentLinkResult = await paymentLinkResult.json();
        window.location.href = paymentLinkResult.hosted_page.url;
      } else {
        showPayNowPopupStepThree(entry);
      }
    });

    if (invoiceStatus.hasUnpaidInvoices) {
      button.innerHTML = `
        <span>
          ${entry.first_name} ${entry.last_name}. #${entry.customer_id}
        </span>

        <span class="pay-now-popup-step-two-accounts-list-unpaid-tag">Unpaid</span>

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    } else {
      button.innerHTML = `
        <span>
          ${entry.first_name} ${entry.last_name}. #${entry.customer_id}
        </span>

        <span class="pay-now-popup-step-two-accounts-list-paid-tag">Pay Early</span>

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }

    listItem.appendChild(button);
    payNowStepTwoAccountsList.appendChild(listItem);
  }

  payNowStepTwoLoader.style.display = 'none';
  payNowStepTwoAccountsList.style.display = 'block';
}

const showPayNowPopupStepThree = async (account) => {
  const payNowStepTwo = document.getElementById('pay-now-popup-step-two');
  const payNowStepThree = document.getElementById('pay-now-popup-step-three');
  const payNowStepThreeLoader = document.getElementById('pay-now-popup-step-three-loader');
  const payNowStepThreeError = document.getElementById('pay-now-popup-step-three-error');
  const payNowStepThreeSubscriptionsList = document.getElementById('pay-now-popup-step-three-subscriptions-list');
  const payNowStepThreeSubscriptionsListItemResidentialMonthly = document.getElementById('pay-now-popup-step-three-subscriptions-list-item-residential-monthly');
  const payNowStepThreeSubscriptionsListItemResidentialYearly = document.getElementById('pay-now-popup-step-three-subscriptions-list-item-residential-yearly');
  const payNowStepThreeSubscriptionsListItemTravelMonthly = document.getElementById('pay-now-popup-step-three-subscriptions-list-item-travel-monthly');
  const payNowStepThreeSubscriptionsListItemTravelYearly = document.getElementById('pay-now-popup-step-three-subscriptions-list-item-travel-yearly');
  const payNowStepThreePayNowButton = document.getElementById('pay-now-popup-step-three-pay-now-button');
  let payNowStepThreeSubscriptionsListItemRadioInputs;
  let payNowPopupStepThreeSubscriptionListItems;

  payNowStepTwo.style.display = 'none';
  payNowStepThreeSubscriptionsList.style.display = 'none';
  payNowStepThreeSubscriptionsList.innerHTML = '';
  payNowStepThreeError.style.display = 'none';
  payNowStepThreePayNowButton.style.display = 'none';
  payNowStepThree.style.display = 'flex';
  payNowStepThreeLoader.style.display = 'flex'

  let subscriptions = await fetch(
    `${api.getSubscriptionsByCustomerIdEndpoint}?customer_id=${account.customer_id}`,
    {
      headers: {
        'Authorization': 'whY-tSR2E12Y9QEIaZ9z'
      }
    }
  );

  if (subscriptions.status === 200) {
    subscriptions = await subscriptions.json();
    subscriptions = subscriptions[0];

    if (subscriptions.error_code) {
      alert(`An error occured with code: ${subscriptions.error_code}`)
    } else if (subscriptions.error) {
      alert(`An error occured with code: ${subscriptions.error}`)
    } else {
      const activeSubscriptions = subscriptions.activeSubscriptions;
      let selectedSubscriptionId = activeSubscriptions[0].subscription_id;
      let selectedPlanName = activeSubscriptions[0].item_price_id.split('USD')[0].replaceAll('-', ' ').toLowerCase();
      let selectedPlanAmount = activeSubscriptions[0].amount / 100;

      activeSubscriptions.forEach((subscription) => {
        if (subscription.status === 'active') {
          payNowStepThreeSubscriptionsList.innerHTML += `
            <li
              class="pay-now-popup-step-three-subscriptions-list-item"
              id="pay-now-popup-step-three-subscriptions-list-item-${subscription.subscription_id}"
            >
              <button>
                <div>
                  <label
                    class="pay-now-popup-step-three-subscriptions-list-item-radio"
                  >
                    <input
                      class="pay-now-popup-step-three-subscriptions-list-item-radio-input"
                      data-parent-id="pay-now-popup-step-three-subscriptions-list-item-${subscription.subscription_id}"
                      data-plan-name="${subscription.item_price_id.split('USD')[0].replaceAll('-', ' ').toLowerCase()}"
                      data-plan-amount="$${subscription.amount / 100}"
                      data-subscription-id=${subscription.subscription_id}
                      name="pay-now-popup-step-three-subscriptions-list-item"
                      type="radio"
                    >
                    <span class="pay-now-popup-step-three-subscriptions-list-item-checkmark"></span>
                  </label>
                </div>

                <div class="pay-now-popup-step-three-subscriptions-list-item-main-content">
                  <h4>
                    ${subscription.item_price_id.split('USD')[0].replaceAll('-', ' ').toLowerCase()}

                    <span>Active</span>
                  </h4>
                  <p>${subscription.item_price_id.split('USD')[1].replaceAll('-', ' ').toLowerCase()}</p>
                  <h3>$${subscription.amount / 100} / ${subscription.item_price_id.split('USD')[1].replaceAll('-', ' ').toLowerCase().slice(0, -2)}</h3>
                  <div>
                    <p>Renews ${getDateStringFromTimestamp(subscription.next_billing_at)}</p>
                    <a
                      class="pay-now-popup-step-three-subscriptions-list-item-main-content-view-more-trigger"
                      data-details-id="pay-now-popup-step-three-subscriptions-list-item-main-content-details-${subscription.subscription_id}"
                      href="#"
                    >
                      View details
                      <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6L8 10L12 6" stroke="#535259" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                    </a>
                  </div>

                  <ul
                    class="pay-now-popup-step-three-subscriptions-list-item-main-content-details"
                    id="pay-now-popup-step-three-subscriptions-list-item-main-content-details-${subscription.subscription_id}"
                  >
                    <li>
                      <p>Subscription ID</p>
                      <p>${subscription.subscription_id}</p>
                    </li>
                    <li>
                      <p>Modem ICCID</p>
                      <p>${subscription.cf_Device_IMEI || '-'}</p>
                    </li>
                    <li>
                      <p>Modem IMEI</p>
                      <p>${subscription.cf_SIM_ID_ICCID || '-'}</p>
                    </li>
                  </ul>
                </div>
              </button>
            </li>
          `
        }
      })

      payNowStepThreeLoader.style.display = 'none'
      payNowStepThreeSubscriptionsList.style.display = 'flex'

      payNowStepThreeSubscriptionsListItemRadioInputs = document.querySelectorAll('.pay-now-popup-step-three-subscriptions-list-item-radio-input');
      payNowStepThreeSubscriptionsListItemMainContentViewMoreTriggers = document.querySelectorAll('.pay-now-popup-step-three-subscriptions-list-item-main-content-view-more-trigger');

      payNowStepThreeSubscriptionsListItemRadioInputs.forEach((input) => {
        input.addEventListener('change', (e) => {
          selectedPlanName = e.target.dataset.planName;
          selectedPlanAmount = e.target.dataset.planAmount;
          selectedSubscriptionId = e.target.dataset.subscriptionId;

          const payNowPopupStepThreeSubscriptionListItems = document.querySelectorAll('.pay-now-popup-step-three-subscriptions-list-item');

          payNowPopupStepThreeSubscriptionListItems.forEach((item) => {
            item.classList.remove('pay-now-popup-step-three-subscriptions-list-item-active');
          })

          const parentElement = document.getElementById(e.target.dataset.parentId);
          parentElement.classList.add('pay-now-popup-step-three-subscriptions-list-item-active')
        })
      })

      payNowStepThreeSubscriptionsListItemMainContentViewMoreTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
          const detailsElementId = trigger.dataset.detailsId;
          const detailsElement = document.getElementById(detailsElementId);
          const iconContainer = trigger.querySelector('span');

          if (detailsElement.style.display == 'block') {
            detailsElement.style.display = 'none';
            iconContainer.style.transform = 'rotate(0deg)';
          } else {
            detailsElement.style.display = 'block';
            iconContainer.style.transform = 'rotate(180deg)';
          }
        })
      })

      payNowPopupStepThreeSubscriptionListItems = document.querySelectorAll('.pay-now-popup-step-three-subscriptions-list-item');
      payNowPopupStepThreeSubscriptionListItems[0].classList.add('pay-now-popup-step-three-subscriptions-list-item-active')

      payNowStepThreeSubscriptionsListItemRadioInputs[0].checked = true;

      payNowStepThreePayNowButton.style.display = 'flex';
      payNowStepThreePayNowButton.addEventListener('click', async () => {
        payNowStepThreeError.style.display = 'none';
        payNowStepThreePayNowButton.innerHTML = `<div class="bar-loader"></div>`;
        let response = await fetch(
          `${api.payFutureInvoiceEndpoint}?subID=${selectedSubscriptionId}`,
          {
            headers: {
              'Authorization': 'whY-tSR2E12Y9QEIaZ9z'
            }
          }
        )

        response = await response.json();

        payNowStepThreePayNowButton.innerHTML = `PAY NOW`;

        if (response.error_code) {
          payNowStepThreeError.innerText = response.message;
          payNowStepThreeError.style.display = 'block';
          payNowStepThreeError.scrollIntoView({ block: 'center', behavior: 'smooth' });
        } else {
          if (response.hosted_page.type === 'paid') {
            showPayNowPopupStepFour(selectedPlanName, selectedPlanAmount, account.email);
          } else {
            window.location.href = response.hosted_page.url;
          }
        }
      })
    }
  } else {
    alert('An error occured')
  }
}

const showPayNowPopupStepFour = (planName, planAmount, userEmail) => {
  const payNowStepThree = document.getElementById('pay-now-popup-step-three');
  const payNowStepFour = document.getElementById('pay-now-popup-step-four');
  const payNowStepFourPaymentDetailsSubscriptionInfo = document.getElementById('pay-now-popup-step-four-payment-details-subscription-info');
  const payNowStepFourPaymentDetailsAmountPaid = document.getElementById('pay-now-popup-step-four-payment-details-amount-paid');
  const payNowStepFourPaymentDetailsProcessedOn = document.getElementById('pay-now-popup-step-four-payment-details-processed-on');
  const payNowStepFourReceiptInfoEmailDisplay = document.getElementById('pay-now-popup-step-four-receipt-info-email-display');
  const payNowPopupStepFourFooterDoneButton = document.getElementById('pay-now-popup-step-four-footer-done-button');

  payNowStepThree.style.display = 'none';
  payNowStepFour.style.display = 'flex';

  const date = new Date();

  payNowStepFourPaymentDetailsSubscriptionInfo.innerText = planName;
  payNowStepFourPaymentDetailsAmountPaid.innerText = `$${planAmount}`;
  payNowStepFourPaymentDetailsProcessedOn.innerText = `${date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })} · ${date.toLocaleTimeString('en-US', { timeStyle: 'short' })}`;
  payNowStepFourReceiptInfoEmailDisplay.innerText = userEmail;

  payNowPopupStepFourFooterDoneButton.addEventListener('click', () => {
    closePayNowPopup();
  })
}

const closePayNowPopup = () => {
  const payNowPopupContainer = document.getElementById('pay-now-popup-container');

  payNowPopupContainer.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
  const payNowPopupContainer = document.getElementById('pay-now-popup-container');
  const payNowStepOne = document.getElementById('pay-now-popup-step-one');
  const payNowStepOneError = document.getElementById('pay-now-popup-step-one-error');
  const payNowStepOneForm = document.getElementById('pay-now-popup-step-one-form');
  const payNowStepOneFormButton = document.getElementById('pay-now-popup-step-one-form-button');

  payNowStepOneForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());

    if (!validateEmail(data.email)) {
      payNowStepOneError.style.display = 'block';
      payNowStepOneError.innerHTML = 'Error: Invalid email address';
      return;
    }

    payNowStepOneError.innerHTML = '';
    payNowStepOneError.style.display = 'none';
    payNowStepOneFormButton.disabled = true;
    payNowStepOneFormButton.innerHTML = `<div class="bar-loader"></div>`

    let response = await fetch(
      `${api.emailLookupEndpoint}?email=${data.email}`,
      {
        headers: {
          'Authorization': 'whY-tSR2E12Y9QEIaZ9z'
        }
      }
    );

    if (response.status === 200) {
      response = await response.json();

      if (response.error_code) {
        payNowStepOneError.style.display = 'flex';
        payNowStepOneError.innerHTML = `Error: ${response.message}`;

        payNowStepOneFormButton.disabled = false;
        payNowStepOneFormButton.innerHTML = 'PAY NOW';
      } else {
        showPayNowPopupStepTwo(data, response);
      }
    } else {
      alert('An error occured')
    }
  });

  showPayNowPopup();
});
