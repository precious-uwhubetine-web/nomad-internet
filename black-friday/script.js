const blackFridayResidentialPlansToggleSelectNewUser = () => {
  const toggleActive = document.querySelector('.black-friday-residential-plans-header-toggle div');
  toggleActive.style.left = 'calc(4px * var(--scale-factor))';

  const featuresLists = document.querySelectorAll('.black-friday-residential-plans-user-item-features-list');
  featuresLists.forEach((list) => {
    list.children[list.children.length - 1].style.display = 'flex';
  })

  const newUserLinks = document.querySelectorAll('.black-friday-residential-plans-user-item-link');
  const existingUserLinks = document.querySelectorAll('.black-friday-residential-plans-user-item-link-existing-user');

  newUserLinks.forEach((link) => {
    link.style.display = 'block';
  })

  existingUserLinks.forEach((link) => {
    link.style.display = 'none';
  })
}

const blackFridayResidentialPlansToggleSelectExistingUser = () => {
  const toggleActive = document.querySelector('.black-friday-residential-plans-header-toggle div');
  toggleActive.style.left = 'calc(144px * var(--scale-factor))';

  const featuresLists = document.querySelectorAll('.black-friday-residential-plans-user-item-features-list');
  featuresLists.forEach((list) => {
    list.children[list.children.length - 1].style.display = 'none';
  })

  const newUserLinks = document.querySelectorAll('.black-friday-residential-plans-user-item-link');
  const existingUserLinks = document.querySelectorAll('.black-friday-residential-plans-user-item-link-existing-user');

  newUserLinks.forEach((link) => {
    link.style.display = 'none';
  })

  existingUserLinks.forEach((link) => {
    link.style.display = 'block';
  })
}

const blackFridayTravelPlansToggleSelectNewUser = () => {
  const toggleActive = document.querySelector('.black-friday-travel-plans-header-toggle div');
  toggleActive.style.left = 'calc(4px * var(--scale-factor))';

  const featuresLists = document.querySelectorAll('.black-friday-travel-plans-user-item-features-list');
  featuresLists.forEach((list) => {
    list.children[list.children.length - 1].style.display = 'flex';
  })

  const newUserLinks = document.querySelectorAll('.black-friday-travel-plans-user-item-link');
  const existingUserLinks = document.querySelectorAll('.black-friday-travel-plans-user-item-link-existing-user');

  newUserLinks.forEach((link) => {
    link.style.display = 'block';
  })

  existingUserLinks.forEach((link) => {
    link.style.display = 'none';
  })
}

const blackFridayTravelPlansToggleSelectExistingUser = () => {
  const toggleActive = document.querySelector('.black-friday-travel-plans-header-toggle div');
  toggleActive.style.left = 'calc(144px * var(--scale-factor))';

  const featuresLists = document.querySelectorAll('.black-friday-travel-plans-user-item-features-list');
  featuresLists.forEach((list) => {
    list.children[list.children.length - 1].style.display = 'none';
  })

  const newUserLinks = document.querySelectorAll('.black-friday-travel-plans-user-item-link');
  const existingUserLinks = document.querySelectorAll('.black-friday-travel-plans-user-item-link-existing-user');

  newUserLinks.forEach((link) => {
    link.style.display = 'none';
  })

  existingUserLinks.forEach((link) => {
    link.style.display = 'block';
  })
}

const blackFridayComparisonTableToggleSelectResidential = () => {
  const toggleActive = document.querySelector('.black-friday-comparison-table-header-toggle div');
  toggleActive.style.left = 'calc(4px * var(--scale-factor))';

  const residentialPlanTable = document.querySelector('.black-friday-comparison-table-table-residential-plan');
  const travelPlanTable = document.querySelector('.black-friday-comparison-table-table-travel-plan');

  travelPlanTable.style.display = 'none';
  residentialPlanTable.style.display = 'inline';
}

const blackFridayComparisonTableToggleSelectTravel = () => {
  const toggleActive = document.querySelector('.black-friday-comparison-table-header-toggle div');
  toggleActive.style.left = 'calc(184px * var(--scale-factor))';

  const residentialPlanTable = document.querySelector('.black-friday-comparison-table-table-residential-plan');
  const travelPlanTable = document.querySelector('.black-friday-comparison-table-table-travel-plan');

  residentialPlanTable.style.display = 'none';
  travelPlanTable.style.display = 'inline';
}

const expandQuestion = (q) => {
  const paragraph = q.querySelector('p')
  paragraph.style.display = 'block'

  const iconContainer = q.querySelector('span');
  iconContainer.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const collapseQuestion = (q) => {
  const paragraph = q.querySelector('p')
  paragraph.style.display = ''

  const iconContainer = q.querySelector('span');
  iconContainer.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M12 5V19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll('.black-friday-faq ul li');

  faqItems.forEach((item) => {
    item.addEventListener('click', () => {
      faqItems.forEach((i) => {
        if (i !== item) {
          i.dataset.expanded = '';
          collapseQuestion(i);
        }
      })

      if (item.dataset.expanded) {
        collapseQuestion(item);
        item.dataset.expanded = '';
      } else {
        expandQuestion(item);
        item.dataset.expanded = true;
      }
    })
  });
})
