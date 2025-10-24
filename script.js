document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const toggleIcon = toggleBtn.querySelector("i");
  const themeToggle = document.getElementById("themeToggle");
  const logoutBtn = document.getElementById("logoutBtn");
  const searchInput = document.querySelector(".search-box input");
  const sidebarLinks = document.querySelectorAll(".sidebar-nav a");

  const openSidebar = () => {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    toggleIcon.classList.replace("fa-bars", "fa-times");
  };

  const closeSidebar = () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    toggleIcon.classList.replace("fa-times", "fa-bars");
  };

  const toggleSidebar = () => {
    sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
  };

  toggleBtn.addEventListener("click", toggleSidebar);
  overlay.addEventListener("click", closeSidebar);

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    const icon = themeToggle.querySelector("i");
    document.body.classList.toggle("dark-mode");
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");
  });

  // Sidebar link active state
  sidebarLinks.forEach(link => {
    link.addEventListener("click", e => {
      if (link.id === "logoutBtn") return;
      e.preventDefault();
      sidebarLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      closeSidebar();
    });
  });

  // Search filter
  searchInput.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    sidebarLinks.forEach(link => {
      const visible = link.textContent.toLowerCase().includes(term);
      link.style.display = visible ? "flex" : "none";
    });
  });

  // Logout
  const performLogout = () => {
    alert("You have been logged out from Elevvo successfully!");
    closeSidebar();
  };

  logoutBtn.addEventListener("click", e => {
    e.preventDefault();
    performLogout();
  });

  // Swipe detection for mobile
  let startX = 0, endX = 0;
  const swipeThreshold = 50;

  document.addEventListener("touchstart", e => {
    startX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", e => {
    endX = e.changedTouches[0].screenX;
    const diff = endX - startX;

    if (startX < 30 && diff > swipeThreshold) openSidebar();
    if (sidebar.classList.contains("open") && diff < -swipeThreshold) closeSidebar();
  });

  // Click outside to close on mobile
  document.addEventListener("click", e => {
    if (
      window.innerWidth <= 768 &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(e.target) &&
      e.target !== toggleBtn
    ) {
      closeSidebar();
    }
  });

  // Auto close on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && sidebar.classList.contains("open")) {
      closeSidebar();
    }
  });
});
