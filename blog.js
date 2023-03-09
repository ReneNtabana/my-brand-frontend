const readMoreButton = document.querySelector('.read-more');
const moreText = document.querySelector('.more');

readMoreButton.addEventListener('click', () => {
  moreText.classList.toggle('show-more');
  if (readMoreButton.innerText === 'Read More') {
    readMoreButton.innerText = 'Read Less';
  } else {
    readMoreButton.innerText = 'Read More';
  }
});