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
  const project = carousel.closest('article');
  const title = project.querySelector('h3').textContent;
  let current = 0;

  const showImage = index => {
    current = (index + images.length) % images.length;
    image.src = images[current];
    image.alt = `${title}, imagen ${current + 1} de ${images.length}`;
    count.textContent = `${current + 1} / ${images.length}`;
  };

  const updateAspectRatio = () => {
    carousel.style.aspectRatio = `${image.naturalWidth} / ${image.naturalHeight}`;
    const isLandscape = image.naturalWidth > image.naturalHeight;
    if (project.classList.contains('is-selected')) {
      project.classList.toggle('is-expanded', isLandscape);
      buttons.forEach(button => button.setAttribute('aria-expanded', String(isLandscape)));
    }
  };
  image.addEventListener('load', updateAspectRatio);

  const buttons = carousel.querySelectorAll('.carousel-button');
  const selectProject = () => {
    document.querySelectorAll('.projects article.is-selected').forEach(item => {
      item.classList.remove('is-selected', 'is-expanded');
      item.querySelectorAll('.carousel-button').forEach(button => button.setAttribute('aria-expanded', 'false'));
    });
    project.classList.add('is-selected');
  };

  carousel.querySelector('.carousel-prev').addEventListener('click', () => {
    selectProject();
    showImage(current - 1);
  });
  carousel.querySelector('.carousel-next').addEventListener('click', () => {
    selectProject();
    showImage(current + 1);
  });
  buttons.forEach(button => button.setAttribute('aria-expanded', 'false'));
  showImage(0);
});
