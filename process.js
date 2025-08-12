// Get all category items and their data
const allCategories = Array.from(document.querySelectorAll('.category-item')).map(item => ({
  icon: item.querySelector('i').className,
  text: item.textContent.trim(),
  category: item.dataset.category // e.g., "painting", "digital-art"
}));

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchDropdown = document.getElementById('searchDropdown');

  searchInput.addEventListener('focus', () => updateDropdown(''));
  searchInput.addEventListener('input', e => updateDropdown(e.target.value.toLowerCase()));

  document.addEventListener('click', e => {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.style.display = 'none';
    }
  });

  function updateDropdown(term) {
    const filtered = term
      ? allCategories.filter(item => item.text.toLowerCase().includes(term))
      : allCategories;
    renderDropdown(filtered);
  }

  function renderDropdown(items) {
    searchDropdown.innerHTML = '';
    if (items.length === 0) {
      const no = document.createElement('div');
      no.className = 'search-dropdown-item';
      no.textContent = 'No results found';
      searchDropdown.appendChild(no);
    } else {
      items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'search-dropdown-item';
        el.innerHTML = `<i class="${item.icon}"></i><span>${item.text}</span>`;
        
        // 🔁 Redirect on click
        el.addEventListener('click', () => {
          // Example: "painting.html", "digital-art.html"
          const pageUrl = `${item.category}.html`;
          window.location.href = pageUrl;
        });

        searchDropdown.appendChild(el);
      });
    }
    searchDropdown.style.display = items.length ? 'block' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSearch();
});
