function sortGrid(gridId = 'grid') {
  const grid = document.getElementById(gridId);
  const items = Array.from(grid.children);

  items.sort((a, b) =>
    a.dataset.name.localeCompare(b.dataset.name)
  );

  items.forEach(item => grid.appendChild(item));
}