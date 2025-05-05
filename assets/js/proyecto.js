// Manejo de modales de proyectos
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a los elementos del DOM
    const projectCards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('[id^="modal-"]');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    
    // Agregar función de cierre de modal global
    window.closeModal = function(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
      }
    };
    
    // Imágenes del carrusel de Te Llevo App
    const teLlevoImages = [
      'assets/images/TeLlevoApp/LoginTeLlevoApp.jpeg',
      'assets/images/TeLlevoApp/InicioTeLlevoApp.jpeg',
      'assets/images/TeLlevoApp/RegistroTeLlevoApp.jpeg',
      'assets/images/TeLlevoApp/CrearViajeTeLlevoApp.jpeg',
      'assets/images/TeLlevoApp/BuscarViajeTeLlevoApp.jpeg',
    ];
    let currentImageIndex = 0;
  
    // Abrir modal al hacer clic en una tarjeta de proyecto
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal-target');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.remove('hidden');
          modal.classList.add('flex');
          // Prevenir scroll del body
          document.body.style.overflow = 'hidden';
        }
      });
    });
  
    // Cerrar modales - Método mejorado
    // Obtener todos los botones de cierre por su ID específico
    const closeBtns = document.querySelectorAll('[id^="close-"]');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Encontrar el modal padre
        const modalId = btn.id.replace('close-', 'modal-');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          // Restaurar scroll
          document.body.style.overflow = 'auto';
        }
      });
    });
    
    // Cerrar al hacer clic fuera del contenido
    modals.forEach(modal => {
      modal.addEventListener('click', (e) => {
        // Solo cerrar si el clic fue directamente en el fondo del modal
        if (e.target === modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          // Restaurar scroll
          document.body.style.overflow = 'auto';
        }
      });
    });
  
    // Manejo del carrusel de Te Llevo App
    const carousel = document.getElementById('carousel-te-llevo');
    const prevBtn = document.getElementById('prev-te-llevo');
    const nextBtn = document.getElementById('next-te-llevo');
    
    if (carousel && prevBtn && nextBtn) {
      const carouselImg = carousel.querySelector('img');
      
      // Botón siguiente
      nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % teLlevoImages.length;
        carouselImg.src = teLlevoImages[currentImageIndex];
      });
      
      // Botón anterior
      prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + teLlevoImages.length) % teLlevoImages.length;
        carouselImg.src = teLlevoImages[currentImageIndex];
      });
    }
  
    // Funcionalidad de lightbox para imágenes
    document.querySelectorAll('.project-card img').forEach(img => {
      img.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que se abra el modal al mismo tiempo
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
      });
    });
  
    // Cerrar lightbox
    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = 'auto';
      });
    }
    
    // Cerrar lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        document.body.style.overflow = 'auto';
      }
    });
  });