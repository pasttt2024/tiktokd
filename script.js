// ===============================
// CONFIG
// ===============================
const BACKEND_URL = "https://web-dler-tiktok-production.up.railway.app";

// ===============================
// SIDEBAR TOGGLE
// ===============================
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const sidebarLinks = document.querySelectorAll(".sidebar-link");
const urlInput = document.getElementById("urlInput");

const overlay = document.createElement("div");
overlay.classList.add("sidebar-overlay");
document.body.appendChild(overlay);

function toggleSidebar() {
  hamburger.classList.toggle("active");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("active");
}

function closeSidebar() {
  hamburger.classList.remove("active");
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
}

hamburger.addEventListener("click", toggleSidebar);
overlay.addEventListener("click", closeSidebar);
sidebarLinks.forEach(link => link.addEventListener("click", closeSidebar));

// ===============================
// INPUT BUTTONS (PASTE / CLEAR)
// ===============================
const clearBtn = document.getElementById("clearBtn");
const pasteBtn = document.getElementById("pasteBtn");

function offerInputButtons() {
  if (urlInput.value.trim() === "") {
    clearBtn.style.display = "none";
    pasteBtn.style.display = "flex";
  } else {
    clearBtn.style.display = "flex";
    pasteBtn.style.display = "none";
  }
}

offerInputButtons();
urlInput.addEventListener("input", offerInputButtons);

clearBtn.addEventListener("click", () => {
  urlInput.value = "";
  offerInputButtons();
  urlInput.focus();
});

pasteBtn.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      urlInput.value = text;
      offerInputButtons();
    }
  } catch {
    alert("Clipboard permission denied");
  }
});

// ===============================
// 🔥 TIKTOK DOWNLOAD
// ===============================
const downloadBtn = document.querySelector(".download-btn");

downloadBtn.addEventListener("click", () => {
  const tiktokUrl = urlInput.value.trim();

  if (!tiktokUrl.includes("tiktok.com")) {
    alert("Please paste a valid TikTok URL");
    return;
  }

  downloadBtn.disabled = true;
  downloadBtn.textContent = "Processing...";

  const downloadUrl =
    `${BACKEND_URL}/download?url=${encodeURIComponent(tiktokUrl)}`;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    window.open(downloadUrl, "_blank");
  } else {
    window.location.href = downloadUrl;
  }

  setTimeout(() => {
    downloadBtn.disabled = false;
    downloadBtn.textContent = "Download Video";
  }, 3000);
});
