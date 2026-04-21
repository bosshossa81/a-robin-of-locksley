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
    } catch (err) {
        modalBody.innerHTML = "<p class='text-danger'>Failed to load content.</p>";
        console.error(err);
    }

    if (!dynamicModalInstance) {
        dynamicModalInstance = new bootstrap.Modal(modalEl);
    }

    // Delay show slightly to allow Bootstrap to process DOM changes
    setTimeout(() => dynamicModalInstance.show(), 50);
}

const pageContent = document.getElementById('pageBody');
const modalEl = document.getElementById('dynamicModal');

function toggleInert(isOpen) {
    pageContent.inert = isOpen;
}

// Attach listeners to modal events
modalEl.addEventListener('shown.bs.modal', () => toggleInert(true));
modalEl.addEventListener('hidden.bs.modal', () => toggleInert(false));