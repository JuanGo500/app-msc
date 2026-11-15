document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    document.querySelectorAll('[data-category]').forEach(project => {
      project.hidden = button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter;
    });
  });
});
document.getElementById('print-cv').addEventListener('click', () => window.print());
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('.project-carousel').forEach(carousel => {
  const images = carousel.dataset.images.split('|');
  const image = carousel.querySelector('[data-carousel-image]');
  const count = carousel.querySelector('.carousel-count');
  const title = carousel.closest('article').querySelector('h3').textContent;
  let current = 0;

  const showImage = index => {
    current = (index + images.length) % images.length;
    image.src = images[current];
    image.alt = `${title}, imagen ${current + 1} de ${images.length}`;
    count.textContent = `${current + 1} / ${images.length}`;
  };

  carousel.querySelector('.carousel-prev').addEventListener('click', () => showImage(current - 1));
  carousel.querySelector('.carousel-next').addEventListener('click', () => showImage(current + 1));
  showImage(0);
});
