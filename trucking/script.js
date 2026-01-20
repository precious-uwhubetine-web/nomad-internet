let prevScrollPos = window.pageYOffset;
const header = document.querySelector('header');

window.onscroll = function () {
  setTimeout(() => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      header.style.transform = 'translateY(0)';
    } else if (prevScrollPos < currentScrollPos) {
      if (prevScrollPos > 200) {
        header.style.transform = 'translateY(-100%)';
      }
    }

    if (currentScrollPos === 0) {
      header.style.transform = 'translateY(0)';
    }

    prevScrollPos = currentScrollPos;
  }, 250);
};

const openMobileMenu = () => {
  const headerMobileMenu = document.getElementById('trucking-header-mobile-menu');
  headerMobileMenu.style.display = 'flex';

  document.body.style.overflow = 'hidden';
}

const closeMobileMenu = () => {
  const headerMobileMenu = document.getElementById('trucking-header-mobile-menu');
  headerMobileMenu.style.display = 'none';

  document.body.style.overflow = 'auto';
}

window.addEventListener('DOMContentLoaded', () => {
  const headerMobileMenuOpenButton = document.getElementById('trucking-header-content-mobile-menu-open-button');
  const headerMobileMenuCloseButton = document.getElementById('trucking-header-content-mobile-menu-close-button');
  const headerMobileMenuNavLinks = document.querySelectorAll('.trucking-header-mobile-menu-nav-link');

  headerMobileMenuOpenButton.addEventListener('click', openMobileMenu);
  headerMobileMenuCloseButton.addEventListener('click', closeMobileMenu);

  headerMobileMenuNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 850) {
      closeMobileMenu();
    }
  })
});

let truckingPageCurrentReviewPosition = 1;

const showCurrentReview = (numReviews) => {
  const truckingReviewsContainer = document.getElementById('trucking-what-truckers-are-saying-reviews');

  const currentReview = truckingReviewsContainer.children[truckingPageCurrentReviewPosition]

  const reviews = currentReview.parentElement;
  const currentReviewLeft = currentReview.offsetLeft;
  const currentReviewWidth = currentReview.offsetWidth;
  const reviewsWidth = reviews.clientWidth;

  reviews.scrollLeft = currentReviewLeft - (reviewsWidth / 2) + (currentReviewWidth / 2) -  20;
};

const showPreviousReview = (numReviews) => {
  const truckingReviewsContainer = document.getElementById('trucking-what-truckers-are-saying-reviews');

  if (truckingPageCurrentReviewPosition > 1) {
    truckingPageCurrentReviewPosition--;
  } else {
    truckingPageCurrentReviewPosition = 3;
  }

  truckingReviewsContainer.children[truckingPageCurrentReviewPosition].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
};

const showNextReview = (numReviews) => {
  const truckingReviewsContainer = document.getElementById('trucking-what-truckers-are-saying-reviews');

  if (truckingPageCurrentReviewPosition < 3) {
    truckingPageCurrentReviewPosition++;
  }  else {
    truckingPageCurrentReviewPosition = 1;
  }

  truckingReviewsContainer.children[truckingPageCurrentReviewPosition].scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
}

window.addEventListener('DOMContentLoaded', () => {
  const truckingReviewsContainer = document.getElementById('trucking-what-truckers-are-saying-reviews');
  const truckingReviewsPreviousButton = document.getElementById('trucking-what-truckers-are-saying-reviews-controls-button-prev');
  const truckingReviewsNextButton = document.getElementById('trucking-what-truckers-are-saying-reviews-controls-button-next');

  let numReviews = 3;

  truckingReviewsPreviousButton.addEventListener('click', () => showPreviousReview(numReviews));
  truckingReviewsNextButton.addEventListener('click', () => showNextReview(numReviews));

  if (window.innerWidth < 768) {
    showCurrentReview();
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      showCurrentReview();
    }
  })
});

window.addEventListener('DOMContentLoaded', () => {
  const truckingFAQSectionQuestionHeaders = document.querySelectorAll('.trucking-faq-section-question-header');

  truckingFAQSectionQuestionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const question = header.parentElement;
      const answer = question.querySelector('.trucking-faq-section-question-answer');

      if (answer.style.gridTemplateRows == '1fr') {
        answer.style.gridTemplateRows = '0fr';
        header.querySelector('svg').style.transform = 'rotate(0deg)';
        question.classList.remove('trucking-faq-section-question-active')
      } else {
        truckingFAQSectionQuestionHeaders.forEach((h) => {
          const hAnswer = h.parentElement.querySelector('.trucking-faq-section-question-answer');

          h.parentElement.classList.remove('trucking-faq-section-question-active')
          hAnswer.style.gridTemplateRows = '0fr';
          h.querySelector('svg').style.transform = 'rotate(0deg)';
        })

        answer.style.gridTemplateRows = '1fr';
        question.classList.add('trucking-faq-section-question-active')
        header.querySelector('svg').style.transform = 'rotate(180deg)';
      }
    });
  });
});

const showTruckingPopupContainer = () => {
  const truckingPopupContainer = document.getElementById('trucking-popup-container');
  truckingPopupContainer.style.display = 'flex';
}

const hideTruckingPopupContainer = () => {
  const truckingPopupContainer = document.getElementById('trucking-popup-container');
  truckingPopupContainer.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
  const truckingPopupContainer = document.getElementById('trucking-popup-container');

  truckingPopupContainer.addEventListener('click', hideTruckingPopupContainer)
});

const openTruckingPopupStayConnected = () => {
  const truckingPopupStayConnected = document.getElementById('trucking-popup-stay-connected');
  truckingPopupStayConnected.style.display = 'flex';
}

const closeTruckingPopupStayConnected = () => {
  const truckingPopupStayConnected = document.getElementById('trucking-popup-stay-connected');
  truckingPopupStayConnected.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
  const truckingPopupStayConnected = document.getElementById('trucking-popup-stay-connected');
  const truckingPopupStayConnectedCloseButton = document.getElementById('trucking-popup-stay-connected-close-button');
  const truckingPopupLoader = document.getElementById('trucking-popup-loader');

  truckingPopupStayConnectedCloseButton.addEventListener('click', hideTruckingPopupContainer)
  truckingPopupStayConnected.addEventListener('click', (e) => e.stopPropagation());
  truckingPopupLoader.addEventListener('click', (e) => e.stopPropagation());
});

const openTruckingPopupFindSetup = () => {
  const truckingPopupFindSetup = document.getElementById('trucking-popup-find-setup');
  const truckingPopupFindSetupError = document.getElementById('trucking-popup-find-setup-error');
  const truckingPopupFindSetupErrorMessage = document.getElementById('trucking-popup-find-setup-error-message');

  truckingPopupFindSetupError.style.display = 'none';
  truckingPopupFindSetupErrorMessage.innerText = 'An error occured';
  truckingPopupFindSetup.style.display = 'flex';
}

const closeTruckingPopupFindSetup = () => {
  const truckingPopupFindSetup = document.getElementById('trucking-popup-find-setup');
  truckingPopupFindSetup.style.display = 'none';
}

const showTruckingPopupFindSetupStep1 = (data) => {
  const truckingPopupFindSetupStep1 = document.getElementById('trucking-popup-find-setup-step-1');
  const truckingPopupFindSetupStep2 = document.getElementById('trucking-popup-find-setup-step-2');
  const truckingPopupFindSetupStep3 = document.getElementById('trucking-popup-find-setup-step-3');
  truckingPopupFindSetupStep2.style.display = 'none';
  truckingPopupFindSetupStep3.style.display = 'none';
  truckingPopupFindSetupStep1.style.display = 'flex';

  const step1ProgressBarSpan = document.querySelector('.trucking-popup-find-setup-progress-step-1 span');
  const step2ProgressBarSpan = document.querySelector('.trucking-popup-find-setup-progress-step-2 span');
  const step3ProgressBarSpan = document.querySelector('.trucking-popup-find-setup-progress-step-3 span');
  step1ProgressBarSpan.style.width = '0';
  step2ProgressBarSpan.style.width = '0';
  step3ProgressBarSpan.style.width = '0';

  const truckingPopupFindSetupStep1FormOptions = document.getElementById('trucking-popup-find-setup-step-1-form-content-options');
  const truckingPopupFindSetupStep1Buttons = truckingPopupFindSetupStep1FormOptions.querySelectorAll('button');
  const truckingPopupFindSetupStep1Submit = document.getElementById('trucking-popup-find-setup-step-1-submit');

  const truckingPopupFindSetupStep1ButtonEventHandler = (e) => {
    if (data.drivingType.indexOf(e.target.dataset.drivingType) > -1) {
      data.drivingType = data.drivingType.filter(d => d !== e.target.dataset.drivingType);
      e.target.classList.remove('trucking-popup-find-setup-form-content-button-selected');
    } else {
      data.drivingType.push(e.target.dataset.drivingType);
      e.target.classList.add('trucking-popup-find-setup-form-content-button-selected');
    }

    if (data.drivingType.length > 0) {
      truckingPopupFindSetupStep1Submit.disabled = false;
    } else {
      truckingPopupFindSetupStep1Submit.disabled = true;
    }
  }

  const truckingPopupFindSetupStep1SubmitEventHandler = (e) => {
    e.preventDefault();

    truckingPopupFindSetupStep1Buttons.forEach((button, i) => {
      button.removeEventListener('click', truckingPopupFindSetupStep1ButtonEventHandler, true);
    });
    truckingPopupFindSetupStep1Submit.removeEventListener('click', truckingPopupFindSetupStep1SubmitEventHandler, true);

    showTruckingPopupFindSetupStep2(data);
  }

  truckingPopupFindSetupStep1Buttons.forEach((button) => {
    button.addEventListener('click', truckingPopupFindSetupStep1ButtonEventHandler, true);
  });
  truckingPopupFindSetupStep1Submit.addEventListener('click', truckingPopupFindSetupStep1SubmitEventHandler, true);

  if (data.drivingType.length) {
    truckingPopupFindSetupStep1Buttons.forEach((button) => {
      if (data.drivingType.indexOf(button.dataset.drivingType) > -1) {
        button.classList.add('trucking-popup-find-setup-form-content-button-selected');
        truckingPopupFindSetupStep1Submit.disabled = false;
      }
    });
  }
}

const showTruckingPopupFindSetupStep2 = (data) => {
  const truckingPopupFindSetupStep1 = document.getElementById('trucking-popup-find-setup-step-1');
  const truckingPopupFindSetupStep2 = document.getElementById('trucking-popup-find-setup-step-2');
  const truckingPopupFindSetupStep3 = document.getElementById('trucking-popup-find-setup-step-3');
  truckingPopupFindSetupStep1.style.display = 'none';
  truckingPopupFindSetupStep3.style.display = 'none';
  truckingPopupFindSetupStep2.style.display = 'flex';

  const step1ProgressBarSpan = document.querySelector('.trucking-popup-find-setup-progress-step-1 span');
  const step2ProgressBarSpan = document.querySelector('.trucking-popup-find-setup-progress-step-2 span');
  const step3ProgressBarSpan = document.querySelector('.trucking-popup-find-setup-progress-step-3 span');
  step1ProgressBarSpan.style.width = '100%';
  step2ProgressBarSpan.style.width = '0';
  step3ProgressBarSpan.style.width = '0';

  const truckingPopupFindSetupStep2FormContent = document.getElementById('trucking-popup-find-setup-step-2-form-content');
  const truckingPopupFindSetupStep2BackButton = document.getElementById('trucking-popup-find-setup-step-2-back-button');
  const truckingPopupFindSetupStep2Buttons = truckingPopupFindSetupStep2FormContent.querySelectorAll('ul button');
  const truckingPopupFindSetupStep2Submit = document.getElementById('trucking-popup-find-setup-step-2-submit');

  const truckingPopupFindSetupStep2BackButtonEventHandler = (e) => {
    e.preventDefault();

    truckingPopupFindSetupStep2Buttons.forEach((button) => {
      button.removeEventListener('click', truckingPopupFindSetupStep2ButtonEventHandler, true);
    });
    truckingPopupFindSetupStep2BackButton.removeEventListener('click', truckingPopupFindSetupStep2BackButtonEventHandler, true);
    truckingPopupFindSetupStep2Submit.removeEventListener('click', truckingPopupFindSetupStep2SubmitEventHandler, true);

    showTruckingPopupFindSetupStep1(data);
  }

  const truckingPopupFindSetupStep2SubmitEventHandler = (e) => {
    e.preventDefault();

    truckingPopupFindSetupStep2Buttons.forEach((button) => {
      button.removeEventListener('click', truckingPopupFindSetupStep2ButtonEventHandler, true);
    });
    truckingPopupFindSetupStep2BackButton.removeEventListener('click', truckingPopupFindSetupStep2BackButtonEventHandler, true);
    truckingPopupFindSetupStep2Submit.removeEventListener('click', truckingPopupFindSetupStep2SubmitEventHandler, true);

    showTruckingPopupFindSetupStep3(data);
  }

  const truckingPopupFindSetupStep2ButtonEventHandler = (e) => {
    e.preventDefault();

    if (e.target.dataset.internetUse === 'all') {
      data.internetUse = ['all']
      truckingPopupFindSetupStep2Buttons.forEach((btn) => {
        btn.classList.remove('trucking-popup-find-setup-form-content-button-selected');
      })
      e.target.classList.add('trucking-popup-find-setup-form-content-button-selected');
    } else {
      const selectAllButton = document.getElementById('trucking-popup-find-setup-step-2-select-all-button');
      selectAllButton.classList.remove('trucking-popup-find-setup-form-content-button-selected');

      data.internetUse = data.internetUse.filter(d => d !== 'all');

      if (data.internetUse.indexOf(e.target.dataset.internetUse) > -1) {
        data.internetUse = data.internetUse.filter(d => d !== e.target.dataset.internetUse);
        e.target.classList.remove('trucking-popup-find-setup-form-content-button-selected');
      } else {
        data.internetUse = [...data.internetUse, e.target.dataset.internetUse];
        e.target.classList.add('trucking-popup-find-setup-form-content-button-selected');
      }
    }

    if (data.internetUse.length > 0) {
      truckingPopupFindSetupStep2Submit.disabled = false;
    } else {
      truckingPopupFindSetupStep2Submit.disabled = true;
    }
  }

  truckingPopupFindSetupStep2Buttons.forEach((button) => {
    button.addEventListener('click', truckingPopupFindSetupStep2ButtonEventHandler, true);
  });
  truckingPopupFindSetupStep2BackButton.addEventListener('click', truckingPopupFindSetupStep2BackButtonEventHandler, true);
  truckingPopupFindSetupStep2Submit.addEventListener('click', truckingPopupFindSetupStep2SubmitEventHandler, true);

  if (data.internetUse.length) {
    truckingPopupFindSetupStep2Buttons.forEach((button) => {
      if (data.internetUse.indexOf(button.dataset.internetUse) > -1) {
        button.classList.add('trucking-popup-find-setup-form-content-button-selected');
        truckingPopupFindSetupStep2Submit.disabled = false;
      }
    });
  }
}

const showTruckingPopupFindSetupStep3 = (data) => {
  const truckingPopupFindSetupStep1 = document.getElementById('trucking-popup-find-setup-step-1');
  const truckingPopupFindSetupStep2 = document.getElementById('trucking-popup-find-setup-step-2');
  const truckingPopupFindSetupStep3 = document.getElementById('trucking-popup-find-setup-step-3');
  truckingPopupFindSetupStep1.style.display = 'none';
  truckingPopupFindSetupStep2.style.display = 'none';
  truckingPopupFindSetupStep3.style.display = 'flex';

  const step1ProgressBarSpan = document.querySelector('.trucking-popup-find-setup-progress-step-1 span');
  const step2ProgressBarSpan = document.querySelector('.trucking-popup-find-setup-progress-step-2 span');
  const step3ProgressBarSpan = document.querySelector('.trucking-popup-find-setup-progress-step-3 span');
  step1ProgressBarSpan.style.width = '100%';
  step2ProgressBarSpan.style.width = '100%';
  step3ProgressBarSpan.style.width = '0';

  const truckingPopupLoader = document.getElementById('trucking-popup-loader');
  const truckingPopupFindSetupStep3BackButton = document.getElementById('trucking-popup-find-setup-step-3-back-button');
  const truckingPopupFindSetupStep3Submit = document.getElementById('trucking-popup-find-setup-step-3-submit');
  const truckingPopupFindSetupError = document.getElementById('trucking-popup-find-setup-error');
  const truckingPopupFindSetupErrorMessage = document.getElementById('trucking-popup-find-setup-error-message');

  const truckingPopupFindSetupStep3BackButtonEventHandler = (e) => {
    e.preventDefault();
    truckingPopupFindSetupError.style.display = 'none';
    truckingPopupFindSetupErrorMessage.innerText = 'An error occured';

    truckingPopupFindSetupStep3BackButton.removeEventListener('click', truckingPopupFindSetupStep3BackButtonEventHandler, true);
    truckingPopupFindSetupStep3Submit.removeEventListener('click', truckingPopupFindSetupStep3SubmitEventHandler, true);

    showTruckingPopupFindSetupStep2(data);
  }

  const truckingPopupFindSetupStep3SubmitEventHandler = async (e) => {
    e.preventDefault();

    const firstNameInput = document.getElementById('trucking-popup-find-setup-step-3-first-name');
    const lastNameInput = document.getElementById('trucking-popup-find-setup-step-3-last-name');
    const addressInput = document.getElementById('trucking-popup-find-setup-step-3-address');
    const emailInput = document.getElementById('trucking-popup-find-setup-step-3-email');
    const phoneInput = document.getElementById('trucking-popup-find-setup-step-3-phone');

    truckingPopupFindSetupError.style.display = 'none';
    truckingPopupFindSetupErrorMessage.innerText = 'An error occured';

    data.firstName = firstNameInput.value.trim();
    data.lastName = lastNameInput.value.trim();
    data.address = addressInput.value.trim();
    data.email = emailInput.value.trim();
    data.phoneNumber = phoneInput.value.trim();

    if (data.firstName === '') {
      truckingPopupFindSetupErrorMessage.innerText = 'Please input first name'
      truckingPopupFindSetupError.style.display = 'flex';
      truckingPopupFindSetupError.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    if (data.lastName === '') {
      truckingPopupFindSetupErrorMessage.innerText = 'Please input last name'
      truckingPopupFindSetupError.style.display = 'flex';
      truckingPopupFindSetupError.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    if (data.address === '') {
      truckingPopupFindSetupErrorMessage.innerText = 'Please input address'
      truckingPopupFindSetupError.style.display = 'flex';
      truckingPopupFindSetupError.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    if (data.email === '') {
      truckingPopupFindSetupErrorMessage.innerText = 'Please input email address'
      truckingPopupFindSetupError.style.display = 'flex';
      truckingPopupFindSetupError.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    if (data.phoneNumber === '') {
      truckingPopupFindSetupErrorMessage.innerText = 'Please input phone number'
      truckingPopupFindSetupError.style.display = 'flex';
      truckingPopupFindSetupError.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    const splitAddress = data.address.split(",");
    const street = splitAddress[0]?.trim() || "";
    const city = splitAddress[1]?.trim() || "";
    const zip = splitAddress[2]?.trim() || "";

    let requestBody = {
      address1: street,
      city: city,
      email: data.email,
      first_name: data.firstName,
      interested_use: data.internetUse.join(','),
      last_name: data.lastName,
      phone: data.phoneNumber,
      source: 'Trucker_page',
      state_code: zip,
      type_of_driving: data.drivingType.join(','),
    }

    e.target.disabled = true;
    truckingPopupFindSetupStep3BackButton.disabled = true;
    truckingPopupLoader.style.display = 'flex';

    const response = await fetch('https://app.lrlos.com/webhook/Coverage-Page-Update-Nomad', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status == 200) {
      step3ProgressBarSpan.style.width = '100%';
      window.location.href = 'https://nomad-internet.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Truck-Freedom-USD-Monthly&subscription_items[quantity][0]=1&subscription_items[item_price_id][1]=Sim-Card-Activation-Kit-USD&subscription_items[item_price_id][2]=Nomad-Mini--Modem-Kit-USD&layout=full_page&subscription[cf_Device_IMEI]=pending&subscription[cf_SIM_ID_ICCID]=pending';
    } else {
      e.target.disabled = false;
      truckingPopupFindSetupStep3BackButton.disabled = false;
      truckingPopupLoader.style.display = 'none';
      truckingPopupFindSetupErrorMessage.innerText = 'There was an error submitting the form. Please try again.'
      truckingPopupFindSetupError.style.display = 'flex';
      truckingPopupFindSetupError.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }

  truckingPopupFindSetupStep3BackButton.addEventListener('click', truckingPopupFindSetupStep3BackButtonEventHandler, true);
  truckingPopupFindSetupStep3Submit.addEventListener('click', truckingPopupFindSetupStep3SubmitEventHandler, true);
}

window.addEventListener('DOMContentLoaded', () => {
  const data = {
    drivingType: [],
    internetUse: [],
    firstName: null,
    lastName: null,
    address: null,
    email: null,
    phoneNumber: null,
  };

  const truckingPopupFindSetup = document.getElementById('trucking-popup-find-setup');
  const truckingPopupFindSetupCloseButton = document.getElementById('trucking-popup-find-setup-close-button');
  const truckingPopupFindSetupTriggers = document.querySelectorAll('.trucking-popup-find-setup-trigger');

  truckingPopupFindSetupCloseButton.addEventListener('click', hideTruckingPopupContainer)
  truckingPopupFindSetup.addEventListener('click', (e) => e.stopPropagation());

  truckingPopupFindSetupTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      showTruckingPopupContainer();
      closeTruckingPopupStayConnected();
      openTruckingPopupFindSetup();
      showTruckingPopupFindSetupStep1(data);
    });
  });
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const truckingPopupContainer = document.getElementById('trucking-popup-container');

    if (truckingPopupContainer.style.display == 'flex') return;
    showTruckingPopupContainer();
    openTruckingPopupStayConnected();
  }, 3000);
})

function initAutocomplete() {
  const input = document.getElementById("trucking-popup-find-setup-step-3-address");
  const options = {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["address"],
  };

  const autocomplete = new google.maps.places.Autocomplete(input, options);
}




