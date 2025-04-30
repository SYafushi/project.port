function changeMap(imagePath) {
    document.getElementById('map-image').src = imagePath;
}




// Variável global para a info-box
const infoBox = document.getElementById('info-box');
let currentHotspot = null;




document.addEventListener('DOMContentLoaded', function() {
    const infoBox = document.getElementById('info-box');
        let activeHotspot = null; // Variável para armazenar o hotspot ativo
        let hideTimeout = null; // Variável para armazenar o timeout de esconder a info-box


        // Função para atualizar posição
        function moveTooltip(e) {
        const offsetX = 0; // Distância do cursor
        const offsetY = 10; // Distância do cursor


        infoBox.style.left = `${e.clientX + offsetX}px`;
        infoBox.style.top = `${e.clientY - offsetY}px`;
    }




    // Configura todas as áreas interativas (hotspots)
    document.querySelectorAll('.hotspot').forEach(hotspot => {
        
        // Mouse entra - mostra com opacidade total
        hotspot.addEventListener('mouseenter', function() {
            infoBox.textContent = this.getAttribute('data-descricao');
            infoBox.classList.add('active'); // Remove a transparência
        
        //Mouse move - atualiza posição
        hotspot.addEventListener('mousemove', moveTooltip)

        // Mouse sai - aplica transparência
        hotspot.addEventListener('mouseleave', function() {
            infoBox.classList.remove('active'); // Aplica transparência
            infoBox.classList.remove('show');
            hotspot.removeEventListener('mousemove', moveTooltip);
        });
    });
});
 


    // Variáveis globais
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeButton = document.getElementById('close-modal');


    // Função para mostrar modal
    function showModal(title, content) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';
    }


    // Função para esconder modal
    function hideModal() {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
    }


    // Configuração dos eventos
    closeButton.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', hideModal);


    // Atualize o evento de clique nos hotspots
    document.querySelectorAll('.hotspot').forEach(hotspot => {
        hotspot.addEventListener('click', function(e) {
            e.stopPropagation();
            const title = this.getAttribute('data-descricao');
            const content = this.getAttribute('data-details') || '...';
            showModal(title, content);
        });
    });

});