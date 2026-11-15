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

const photoViewer = document.createElement('div');
photoViewer.className = 'photo-viewer';
photoViewer.innerHTML = `
  <div class="photo-viewer__backdrop"></div>
  <figure class="photo-viewer__content">
    <img alt="">
    <button class="photo-viewer__close" type="button" aria-label="Cerrar imagen"></button>
    <button class="photo-viewer__button photo-viewer__prev" type="button" aria-label="Imagen anterior"></button>
    <button class="photo-viewer__button photo-viewer__next" type="button" aria-label="Imagen siguiente"></button>
    <figcaption class="photo-viewer__count" aria-live="polite"></figcaption>
  </figure>`;
document.body.append(photoViewer);

const viewerImage = photoViewer.querySelector('img');
const viewerCount = photoViewer.querySelector('.photo-viewer__count');
let viewerImages = [];
let viewerIndex = 0;
let viewerTitle = '';

const showViewerImage = index => {
  viewerIndex = (index + viewerImages.length) % viewerImages.length;
  photoViewer.classList.remove('is-landscape');
  viewerImage.onload = () => {
    photoViewer.classList.toggle('is-landscape', viewerImage.naturalWidth > viewerImage.naturalHeight);
    viewerCount.textContent = `${viewerIndex + 1} / ${viewerImages.length}`;
  };
  viewerImage.src = viewerImages[viewerIndex];
  viewerImage.alt = `${viewerTitle}, imagen ${viewerIndex + 1} de ${viewerImages.length}`;
};
const openPhotoViewer = (images, index, title) => {
  viewerImages = images;
  viewerTitle = title;
  photoViewer.classList.add('is-open');
  document.body.classList.add('photo-viewer-open');
  showViewerImage(index);
  photoViewer.querySelector('.photo-viewer__close').focus();
};
const closePhotoViewer = () => {
  photoViewer.classList.remove('is-open');
  document.body.classList.remove('photo-viewer-open');
};

photoViewer.querySelector('.photo-viewer__backdrop').addEventListener('click', closePhotoViewer);
photoViewer.querySelector('.photo-viewer__close').addEventListener('click', closePhotoViewer);
photoViewer.querySelector('.photo-viewer__prev').addEventListener('click', () => showViewerImage(viewerIndex - 1));
photoViewer.querySelector('.photo-viewer__next').addEventListener('click', () => showViewerImage(viewerIndex + 1));
document.addEventListener('keydown', event => {
  if (!photoViewer.classList.contains('is-open')) return;
  if (event.key === 'Escape') closePhotoViewer();
  if (event.key === 'ArrowLeft') showViewerImage(viewerIndex - 1);
  if (event.key === 'ArrowRight') showViewerImage(viewerIndex + 1);
});

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
    project.classList.toggle('is-landscape', image.naturalWidth > image.naturalHeight);
  };
  image.addEventListener('load', updateAspectRatio);

  carousel.querySelector('.carousel-prev').addEventListener('click', () => showImage(current - 1));
  carousel.querySelector('.carousel-next').addEventListener('click', () => showImage(current + 1));
  image.addEventListener('click', () => openPhotoViewer(images, current, title));
  showImage(0);
});
