window.addEventListener('DOMContentLoaded', () => {
  const truckingFAQSectionQuestionHeaders = document.querySelectorAll('.creators-faq-section-question-header');

  truckingFAQSectionQuestionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const question = header.parentElement;
      const answer = question.querySelector('.creators-faq-section-question-answer');

      if (answer.style.gridTemplateRows == '1fr') {
        answer.style.gridTemplateRows = '0fr';
        header.querySelector('svg').style.transform = 'rotate(0deg)';
        question.classList.remove('creators-faq-section-question-active')
      } else {
        truckingFAQSectionQuestionHeaders.forEach((h) => {
          const hAnswer = h.parentElement.querySelector('.creators-faq-section-question-answer');

          h.parentElement.classList.remove('creators-faq-section-question-active')
          hAnswer.style.gridTemplateRows = '0fr';
          h.querySelector('svg').style.transform = 'rotate(0deg)';
        })

        answer.style.gridTemplateRows = '1fr';
        question.classList.add('creators-faq-section-question-active')
        header.querySelector('svg').style.transform = 'rotate(180deg)';
      }
    });
  });
});

const showCreatorsPopupContainer = () => {
  const creatorsPopupContainer = document.getElementById('creators-popup-container');
  creatorsPopupContainer.style.display = 'flex';
}

const hideCreatorsPopupContainer = () => {
  const creatorsPopupContainer = document.getElementById('creators-popup-container');
  creatorsPopupContainer.style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
  const creatorsPopupContainer = document.getElementById('creators-popup-container');

  creatorsPopupContainer.addEventListener('click', hideCreatorsPopupContainer)
});

const openCreatorsPopupStartConversation = () => {
  const creatorsPopupStartConversation = document.getElementById('creators-popup-start-conversation');
  creatorsPopupStartConversation.style.display = 'flex';

  closeCreatorsPopupApply();
  showCreatorsPopupContainer();
}

const closeCreatorsPopupStartConversation = () => {
  const creatorsPopupStartConversation = document.getElementById('creators-popup-start-conversation');
  creatorsPopupStartConversation.style.display = 'none';

  hideCreatorsPopupContainer();
}

const openCreatorsPopupApply = () => {
  const creatorsPopupApply = document.getElementById('creators-popup-apply');
  creatorsPopupApply.style.display = 'flex';

  closeCreatorsPopupStartConversation();
  showCreatorsPopupContainer();
}

const closeCreatorsPopupApply = () => {
  const creatorsPopupApply = document.getElementById('creators-popup-apply');
  creatorsPopupApply.style.display = 'none';

  hideCreatorsPopupContainer();
}

window.addEventListener('DOMContentLoaded', () => {
  const creatorsPopupStartConversation = document.getElementById('creators-popup-start-conversation');
  const creatorsPopupApply = document.getElementById('creators-popup-apply');

  const creatorsPopupStartConversationCloseButton = document.getElementById('creators-popup-start-conversation-close-button');
  const creatorsPopupApplyCloseButton = document.getElementById('creators-popup-apply-close-button');

  creatorsPopupStartConversation.addEventListener('click', (e) => e.stopPropagation());
  creatorsPopupApply.addEventListener('click', (e) => e.stopPropagation());

  creatorsPopupStartConversationCloseButton.addEventListener('click', closeCreatorsPopupStartConversation);
  creatorsPopupApplyCloseButton.addEventListener('click', closeCreatorsPopupApply);
});
