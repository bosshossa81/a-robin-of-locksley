const pageContent = document.getElementById('pageBody');
const modalEl = document.getElementById('dynamicModal');

function toggleInert(isOpen) {
    pageContent.inert = isOpen;
}

// Attach listeners to modal events
modalEl.addEventListener('shown.bs.modal', () => toggleInert(true));
modalEl.addEventListener('hidden.bs.modal', () => toggleInert(false));