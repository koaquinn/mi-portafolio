// Manejo de modales de proyectos
document.addEventListener("DOMContentLoaded", function () {
    //Referencias a elementos del DOM
    const projectCards = document.querySelectorAll(".project-card");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");

    const proyectos = {
        "te-llevo": {
            titulo: "Te Llevo App",
            descripcion: `
Aplicación móvil para gestión de rutas de transporte compartido

Diseñé y desarrollé una app móvil que permite a los usuarios registrarse, iniciar sesión y gestionar rutas de transporte compartido de forma eficiente.
La aplicación incluye una integración en tiempo real con una API de clima para mostrar condiciones meteorológicas actualizadas y mejorar la planificación de rutas.

Tecnologías utilizadas: Ionic, Angular, Firebase, WeatherAPI
        `,
            repoLink: "#",
            imagenes: [
                "assets/images/TeLlevoApp/LoginTeLlevoApp.jpeg",
                "assets/images/TeLlevoApp/InicioTeLlevoApp.jpeg",
                "assets/images/TeLlevoApp/RegistroTeLlevoApp.jpeg",
                "assets/images/TeLlevoApp/CrearViajeTeLlevoApp.jpeg",
                "assets/images/TeLlevoApp/BuscarViajeTeLlevoApp.jpeg",
            ],
        },
        masterbikes: {
            titulo: "Masterbikes, E-commerce de bicicletas",
            descripcion: `
            Desarrollé una plataforma completa utilizando Python, Django y SQLite que permite a los usuarios solicitar reparaciones, arrendar y comprar bicicletas de forma rápida y segura.
            Implementé autenticación segura con tokens y cifrado de contraseñas, junto con un sistema automatizado de gestión de cuentas mediante SendGrid, el cual permite:
                - Envío de correos de activación de cuenta y recuperación de contraseña.
                - Confirmación automática por correo al realizar pedidos.

            El diseño de la interfaz fue creado con TailwindCSS, JavaScript y HTML, logrando una experiencia moderna, responsiva y amigable para el usuario.
        `,
            repoLink: "#",
            imagenes: [
                "assets/images/Masterbikes/Login.png",
                "assets/images/Masterbikes/PaginaInicio.png",
                "assets/images/Masterbikes/AgregarBicicleta.png",
                "assets/images/Masterbikes/AgregarBicicletas.png",
                "assets/images/Masterbikes/ArriendoBicicleta.png",
                "assets/images/Masterbikes/FiltradoBicicletas.png",
                "assets/images/Masterbikes/ModalCompras.png",
                "assets/images/Masterbikes/Registro.png",
                "assets/images/Masterbikes/ReparacionBicicleta.png",
            ],
        },
    };

    // Variables para rastrear el proyecto y la imagen actual
    let currentProject = "";
    let currentImageIndex = 0;

    // Función global para cerrar modales
    window.closeModal = function (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
            document.body.style.overflow = "auto";
        }
    };

    // Función para abrir el modal con datos dinámicos
    function openProjectModal(projectId) {
        // Verificar si el proyecto existe en nuestros datos
        const proyecto = proyectos[projectId];
        if (!proyecto) return;

        //Obtener referencia al modal único
        const modal = document.getElementById("project-modal");
        if (!modal) return;

        // Actualizar contenido del modal
        document.getElementById("modal-title").textContent = proyecto.titulo;
        document.getElementById("modal-description").textContent =
            proyecto.descripcion;

        // Actualizar enlaces
        const repoBtn = document.getElementById("modal-repo-link");
        if (repoBtn) repoBtn.href = proyecto.repoLink;
        // Configurar el carrusel
        currentProject = projectId;
        currentImageIndex = 0;
        updateCarouselImage();

        // Mostrar el modal
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        document.body.style.overflow = "hidden";
    }

    // Función para actualizar la imagen del carrusel
    function updateCarouselImage() {
        const proyecto = proyectos[currentProject];
        if (!proyecto) return;

        const modalImg = document.getElementById("modal-image");
        if (modalImg) {
            modalImg.src = proyecto.imagenes[currentImageIndex];
            modalImg.alt = `Captura de ${proyecto.titulo}`;
        }
    }

    // Funciones para navegar por el carrusel
    function nextImage() {
        const proyecto = proyectos[currentProject];
        if (!proyecto) return;

        currentImageIndex = (currentImageIndex + 1) % proyecto.imagenes.length;
        updateCarouselImage();
    }

    function prevImage() {
        const proyecto = proyectos[currentProject];
        if (!proyecto) return;

        currentImageIndex =
            (currentImageIndex - 1 + proyecto.imagenes.length) %
            proyecto.imagenes.length;
        updateCarouselImage();
    }

    // Agregar eventos a las tarjetas de proyecto
    projectCards.forEach((card) => {
        card.addEventListener("click", () => {
            // Ahora usamos data-project-id en lugar de data-modal-target
            const projectId = card.getAttribute("data-project-id");
            if (projectId) {
                openProjectModal(projectId);
            }
        });
    });

    // Agregar eventos a los botones de navegación del carrusel
    const prevBtn = document.getElementById("modal-prev");
    const nextBtn = document.getElementById("modal-next");

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", prevImage);
        nextBtn.addEventListener("click", nextImage);
    }

    // Cerrar modal al hacer clic fuera del contenido
    const projectModal = document.getElementById("project-modal");
    if (projectModal) {
        projectModal.addEventListener("click", (e) => {
            // Solo cerrar si el clic fue directamente en el fondo del modal
            if (e.target === projectModal) {
                projectModal.classList.add("hidden");
                projectModal.classList.remove("flex");
                document.body.style.overflow = "auto";
            }
        });
    }

    // Funcionalidad de lightbox (si decides mantenerla)
    document.querySelectorAll(".project-card img").forEach((img) => {
        img.addEventListener("click", (e) => {
            e.stopPropagation(); // Evitar que se abra el modal al mismo tiempo
            lightboxImg.src = img.src;
            lightbox.classList.remove("hidden");
            lightbox.classList.add("flex");
            document.body.style.overflow = "hidden";
        });
    });

    // Cerrar lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            lightbox.classList.add("hidden");
            lightbox.classList.remove("flex");
            document.body.style.overflow = "auto";
        });
    }

    // Cerrar lightbox al hacer clic fuera de la imagen
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.add("hidden");
                lightbox.classList.remove("flex");
                document.body.style.overflow = "auto";
            }
        });
    }
});
