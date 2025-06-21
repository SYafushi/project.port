function changeMap(imagePath) {
    document.getElementById('map-image').src = imagePath;
}

// Variáveis globais
let currentCarouselIndex = 0;
let carouselImages = [];
const infoBox = document.getElementById('info-box');

document.addEventListener('DOMContentLoaded', function() {
    setupTooltips();
    setupHotspots();
    setupModal();
});

function setupTooltips() {
    const hotspots = document.querySelectorAll('.hotspot');
    
    function moveTooltip(e) {
        const offsetX = 0;
        const offsetY = 10;
        infoBox.style.left = `${e.clientX + offsetX}px`;
        infoBox.style.top = `${e.clientY - offsetY}px`;
        
        infoBox.style.width = 'auto';
        infoBox.style.maxWidth = 'none';
        const width = infoBox.scrollWidth;
        infoBox.style.width = `${width}px`;
        infoBox.style.maxWidth = '90%';
    }
    
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseenter', function() {
            infoBox.textContent = this.getAttribute('data-descricao');
            infoBox.classList.add('active');
            hotspot.addEventListener('mousemove', moveTooltip);
        });
        
        hotspot.addEventListener('mouseleave', function() {
            infoBox.classList.remove('active');
            hotspot.removeEventListener('mousemove', moveTooltip);
        });
        
        hotspot.addEventListener('touchstart', function(e) {
            e.preventDefault();
            infoBox.textContent = this.getAttribute('data-descricao');
            infoBox.classList.add('active');
            
            const touch = e.touches[0];
            infoBox.style.left = `${touch.clientX}px`;
            infoBox.style.top = `${touch.clientY - 50}px`;
            
            infoBox.style.width = 'auto';
            infoBox.style.maxWidth = 'none';
            const width = infoBox.scrollWidth;
            infoBox.style.width = `${Math.min(width, window.innerWidth - 20)}px`;
            
            setTimeout(() => {
                openModal(this);
            }, 300);
        });
    });
}

function setupHotspots() {
    document.querySelectorAll('.hotspot').forEach(hotspot => {
        hotspot.addEventListener('click', function(e) {
            e.stopPropagation();
            openModal(this);
        });
    });
}

function setupModal() {
    const closeButton = document.getElementById('close-modal');
    const overlay = document.getElementById('modal-overlay');
    
    closeButton.addEventListener('click', hideModal);
    overlay.addEventListener('click', hideModal);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideModal();
        } else if (e.key === 'ArrowLeft') {
            navigateCarousel(-1);
        } else if (e.key === 'ArrowRight') {
            navigateCarousel(1);
        }
    });
}

function openModal(hotspotElement) {
    const title = hotspotElement.getAttribute('data-descricao');
    const content = hotspotElement.getAttribute('data-details');
    const images = hotspotElement.getAttribute('data-images')?.split(',') || [];
    
    showModal(title, content, images);
}

function showModal(title, content, images = []) {
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const carousel = document.querySelector('.image-carousel');
    
    modalTitle.textContent = title;
    modalText.innerHTML = content;
    
    // Limpa imagens anteriores
    const existingImages = document.querySelectorAll('.carousel-image');
    existingImages.forEach(img => img.remove());
    
    // Remove placeholder se existir
    const placeholder = document.querySelector('.no-images');
    if (placeholder) placeholder.remove();
    
    carouselImages = images.map(img => img.trim());
    
    if (carouselImages.length > 0) {
        carouselImages.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = `carousel-image ${index === 0 ? 'active' : ''}`;
            img.alt = `${title} - Imagem ${index + 1}`;
            carousel.appendChild(img);
        });
        currentCarouselIndex = 0;
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'no-images';
        placeholder.textContent = "Sem imagens disponíveis";
        carousel.appendChild(placeholder);
    }
    
    // Mostra o modal e overlay
    modal.style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Configura os controles do carrossel
    setupCarouselControls();
}

function setupCarouselControls() {
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    prevBtn.onclick = (e) => {
        e.stopPropagation();
        navigateCarousel(-1);
    };
    
    nextBtn.onclick = (e) => {
        e.stopPropagation();
        navigateCarousel(1);
    };
}

function navigateCarousel(direction) {
    const images = document.querySelectorAll('.carousel-image');
    if (images.length === 0) return;
    
    currentCarouselIndex += direction;
    
    if (currentCarouselIndex >= images.length) {
        currentCarouselIndex = 0;
    } else if (currentCarouselIndex < 0) {
        currentCarouselIndex = images.length - 1;
    }
    
    images.forEach(img => img.classList.remove('active'));
    images[currentCarouselIndex].classList.add('active');
}

function hideModal() {
    document.getElementById('info-modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
    document.body.style.overflow = '';
}
