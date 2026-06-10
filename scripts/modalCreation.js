function initializePanzoom(root = document) {
    root.querySelectorAll('.image-viewer').forEach((viewer) => {
        if (viewer.dataset.zoomInit) return;
        viewer.dataset.zoomInit = "true";

        const image = viewer.querySelector('.panzoom-image');

        // Create UI controls right away
        const controls = document.createElement('div');
        controls.className = 'zoom-controls';

        const zoomInBtn = document.createElement('button');
        zoomInBtn.innerHTML = '+';

        const zoomOutBtn = document.createElement('button');
        zoomOutBtn.innerHTML = '−';

        const resetBtn = document.createElement('button');
        resetBtn.innerHTML = '↺';
        resetBtn.className = 'reset-zoom-btn';

        controls.appendChild(zoomInBtn);
        controls.appendChild(zoomOutBtn);
        controls.appendChild(resetBtn);

        viewer.parentNode.insertBefore(controls, viewer.nextSibling);

        // Safe initialization logic
        const setupPanzoomLogic = () => {
            // Double check that we have real dimensions. If not, wait a split second for layout paint.
            if (image.clientWidth === 0) {
                setTimeout(setupPanzoomLogic, 50);
                return;
            }


            const panzoom = Panzoom(image, {
                contain: 'outside',
                minScale: 0.25,   
                startScale: 0.25, 
            });

            zoomInBtn.addEventListener('click', () => panzoom.zoomIn());
            zoomOutBtn.addEventListener('click', () => panzoom.zoomOut());
            
            resetBtn.addEventListener('click', () => {
                panzoom.zoom(0.25, { animate: true });
            });
        };

        const modalEl = document.getElementById('dynamicModal');

        // Helper to check if both conditions are met
        let modalShown = modalEl.classList.contains('show');
        let imageLoaded = image.complete && image.naturalWidth > 0;

        const checkReadyState = () => {
            if (modalShown && imageLoaded) {
                setupPanzoomLogic();
            }
        };

        // Condition 1: Monitor Modal Visibility Animation
        if (!modalShown) {
            modalEl.addEventListener('shown.bs.modal', function onModalShown() {
                modalShown = true;
                checkReadyState();
                modalEl.removeEventListener('shown.bs.modal', onModalShown);
            });
        }

        // Condition 2: Monitor Image Asset Download
        if (!imageLoaded) {
            image.onload = () => {
                imageLoaded = true;
                checkReadyState();
            };
        }

        // Run an immediate check in case it's already cached/visible
        checkReadyState();

    });
}


let dynamicModalInstance = null;

async function openModalFromFile(filePath, title = "Details") {
    const modalEl = document.getElementById('dynamicModal');
    const modalBody = document.getElementById('dynamicModalBody');
    const modalTitle = modalEl.querySelector('.modal-title');

    modalTitle.textContent = title;
    modalBody.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error("File not found");

        const html = await response.text();
        modalBody.innerHTML = html;

        // Parse HTML first, then target the initialization handler
        initializePanzoom(modalBody);

    } catch (err) {
        modalBody.innerHTML = "<p class='text-danger'>Failed to load content.</p>";
        console.error(err);
    }

    if (!dynamicModalInstance) {
        dynamicModalInstance = new bootstrap.Modal(modalEl);
    }

    dynamicModalInstance.show();


}

const pageContent = document.getElementById('pageBody');
const modalEl = document.getElementById('dynamicModal');
const modalBody = document.getElementById('dynamicModalBody');

function toggleInert(isOpen) {
    pageContent.inert = isOpen;
}

modalEl.addEventListener('shown.bs.modal', () => {
    toggleInert(true);
    setTimeout(() => {
        modalEl.querySelectorAll('.reset-zoom-btn').forEach((btn) => {
        btn.click();
        });
    }, 1);
    setTimeout(() => {
        const elements = document.getElementsByClassName("image-viewer");
        for (const element of elements) {
            element.style.border = ".25rem solid var(--black-primary)";
        };
    }, 1);


});
modalEl.addEventListener('hidden.bs.modal', () => toggleInert(false));



