let selectedPlan = null;
let selectedProtection = null;

window.addEventListener('DOMContentLoaded', () => {
  const residentialPlan = document.getElementById('plans-page-choose-plan-residential-plan');
  const travelPlan = document.getElementById('plans-page-choose-plan-travel-plan');

  const standardProtection = document.getElementById('plans-page-choose-standard-protection');
  const advancedProtection = document.getElementById('plans-page-choose-advanced-protection');

  const plansPageChoosePlanStepOne = document.getElementById('plans-page-choose-plan-section-step-one');
  const plansPageChoosePlanStepTwo = document.getElementById('plans-page-choose-plan-section-step-two');
  const plansPageChoosePlanStepThree = document.getElementById('plans-page-choose-plan-section-step-three');

  const plansPageCheckoutButton = plansPageChoosePlanStepThree.querySelector('button');

  const selectResidentialPlan = () => {
    selectedPlan = 'residential';

    residentialPlan.querySelector('button span').innerText = 'RESIDENTIAL SELECTED';
    residentialPlan.querySelector('button svg').style.display = 'block';
    travelPlan.querySelector('button span').innerText = 'SELECT TRAVEL PLAN';
    travelPlan.querySelector('button svg').style.display = 'none';

    residentialPlan.querySelector('button').scrollIntoView({ behavior: 'smooth', block: 'center' });
    $j('.slider-main').slick('slickGoTo', 0);

    setTimeout(() => {
      plansPageChoosePlanStepTwo.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }

  const selectTravelPlan = () => {
    selectedPlan = 'travel';

    residentialPlan.querySelector('button span').innerText = 'SELECT RESIDENTIAL PLAN';
    residentialPlan.querySelector('button svg').style.display = 'none';
    travelPlan.querySelector('button span').innerText = 'TRAVEL SELECTED';
    travelPlan.querySelector('button svg').style.display = 'block';

    travelPlan.querySelector('button').scrollIntoView({ behavior: 'smooth', block: 'center' });
    $j('.slider-main').slick('slickGoTo', 1);

    setTimeout(() => {
      plansPageChoosePlanStepTwo.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }

  const selectStandardProtection = () => {
    selectedProtection = 'standard';

    standardProtection.querySelector('button span').innerText = 'STANDARD PROTECTION SELECTED';
    standardProtection.querySelector('button svg').style.display = 'block';
    advancedProtection.querySelector('button span').innerText = 'UPGRADE TO ADVANCED PROTECTION';
    advancedProtection.querySelector('button svg').style.display = 'none';

    standardProtection.querySelector('button').scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      plansPageChoosePlanStepThree.scrollIntoView({ behavior: 'smooth' })
    }, 250);
  }

  const selectAdvancedProtection = () => {
    selectedProtection = 'advanced';

    standardProtection.querySelector('button span').innerText = 'CONTINUE WITH STANDARD PROTECTION';
    standardProtection.querySelector('button svg').style.display = 'none';
    advancedProtection.querySelector('button span').innerText = 'ADVANCED PROTECTION SELECTED';
    advancedProtection.querySelector('button svg').style.display = 'block';

    advancedProtection.querySelector('button').scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      plansPageChoosePlanStepThree.scrollIntoView({ behavior: 'smooth' });
    }, 250);
  }

  const checkout = (plan, protection) => {
    const links = {
      residential: {
        standard: "https://nomad-internet.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=UNLIMITED-RESIDENTIAL-PLAN-USD-Monthly&subscription_items[quantity][0]=1&subscription_items[item_price_id][1]=Nomad-Standard-Modem-Kit-USD&subscription_items[item_price_id][2]=Sim-Card-Activation-Kit-USD&layout=full_page&subscription[cf_Device_IMEI]=pending&subscription[cf_SIM_ID_ICCID]=pending",
        advenced: "https://nomad-internet.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=UNLIMITED-RESIDENTIAL-PLAN-USD-Monthly&subscription_items[quantity][0]=1&subscription_items[item_price_id][1]=Sim-Card-Activation-Kit-USD&subscription_items[item_price_id][2]=Nomad-Mini--Modem-Kit-USD&layout=full_page&subscription[cf_Device_IMEI]=pending&subscription[cf_SIM_ID_ICCID]=pending",
      },
      travel: {
        standard: "https://nomad-internet.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Nomad-Unlimited-Travel-Plan-01-USD-Monthly&subscription_items[quantity][0]=1&subscription_items[item_price_id][1]=Sim-Card-Activation-Kit-USD&subscription_items[item_price_id][2]=Nomad-Standard-Modem-Kit-USD&layout=full_page&subscription[cf_Device_IMEI]=pending&subscription[cf_SIM_ID_ICCID]=pending",
        advenced: "https://nomad-internet.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=Nomad-Unlimited-Travel-Plan-01-USD-Monthly&subscription_items[quantity][0]=1&subscription_items[item_price_id][1]=Sim-Card-Activation-Kit-USD&subscription_items[item_price_id][2]=Nomad-Mini--Modem-Kit-USD&layout=full_page&subscription[cf_Device_IMEI]=pending&subscription[cf_SIM_ID_ICCID]=pending",
      }
    };

    if (plan === 'residential') {
      if (protection === 'standard') {
        window.location.href = links.residential.standard;
      } else if (protection === 'advanced') {
        window.location.href = links.residential.advenced;
      } else {
        Toastify({
          text: "Please choose protection",
          duration: 3000,
          newWindow: true,
          gravity: "top",
          position: "center",
          style: {
            background: 'red',
            color: 'white'
          },
        }).showToast();

        plansPageChoosePlanStepTwo.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    } else if (plan === 'travel') {
      if (protection === 'standard') {
        window.location.href = links.travel.standard;
      } else if (protection === 'advanced') {
        window.location.href = links.travel.advenced;
      } else {
        Toastify({
          text: "Please choose protection",
          duration: 3000,
          newWindow: true,
          gravity: "top",
          position: "center",
          style: {
            background: 'red',
            color: 'white'
          },
        }).showToast();

        plansPageChoosePlanStepTwo.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    } else {
      Toastify({
        text: "Please choose a plan",
        duration: 3000,
        newWindow: true,
        gravity: "top",
        position: "center",
        style: {
          background: 'red',
          color: 'white'
        },
      }).showToast();

      plansPageChoosePlanStepOne.scrollIntoView({ behavior: 'smooth' });

      return;
    }
  }

  residentialPlan.addEventListener('click', selectResidentialPlan);
  travelPlan.addEventListener('click', selectTravelPlan);
  standardProtection.addEventListener('click', selectStandardProtection);
  advancedProtection.addEventListener('click', selectAdvancedProtection);
  plansPageCheckoutButton.addEventListener('click', () => checkout(selectedPlan, selectedProtection))

  residentialPlan.querySelector('button').disabled = false;
  travelPlan.querySelector('button').disabled = false;
  standardProtection.querySelector('button').disabled = false;
  advancedProtection.querySelector('button').disabled = false;
  plansPageChoosePlanStepThree.querySelector('button').disabled = false;

  const searchParams = new URLSearchParams(window.location.search);

  switch (searchParams.get('plan')) {
    case 'residential':
      selectResidentialPlan();
      break;
    case 'travel':
      selectTravelPlan();
      break;
  }
});
