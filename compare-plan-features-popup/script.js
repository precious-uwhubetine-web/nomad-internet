const openComparePlansFeaturesPopup = () => {
  const comparePlanFeaturesPopupContainer = document.getElementById('compare-plan-features-popup-container');
  comparePlanFeaturesPopupContainer.style.display = 'flex';
}

const closeComparePlansFeaturesPopup = () => {
  const comparePlanFeaturesPopupContainer = document.getElementById('compare-plan-features-popup-container');
  comparePlanFeaturesPopupContainer.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
  const comparePlanFeaturesPopupContainer = document.getElementById('compare-plan-features-popup-container');
  const comparePlanFeaturesPopup = document.getElementById('compare-plan-features-popup');
  const comparePlanFeaturesPopupHeaderCloseButton = document.getElementById('compare-plan-features-popup-header-close-button');

  comparePlanFeaturesPopupContainer.addEventListener('click', closeComparePlansFeaturesPopup)
  comparePlanFeaturesPopupHeaderCloseButton.addEventListener('click', closeComparePlansFeaturesPopup)
  comparePlanFeaturesPopup.addEventListener('click', (e) => e.stopPropagation());

  const comparePlanFeaturePopupTriggers = document.querySelectorAll('.compare-plan-features-popup-trigger');
  comparePlanFeaturePopupTriggers.forEach((trigger) => {
    trigger.addEventListener('click', openComparePlansFeaturesPopup)
  })
});
