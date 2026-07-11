// ============================================================
//  PASSWORD GATE
//  Note: this only hides the page content in the browser.
//  It is NOT real security — real access control lives in your
//  Google Sheets sharing settings. See README for details.
// ============================================================
const gate = document.getElementById("gate");
const app = document.getElementById("app");
const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const gateError = document.getElementById("gateError");
const lockBtn = document.getElementById("lockBtn");

function unlock() {
  if (passwordInput.value === CONFIG.password) {
    sessionStorage.setItem("rv_unlocked", "true");
    showApp();
  } else {
    gateError.textContent = "Incorrect password. Try again.";
    passwordInput.value = "";
  }
}

function showApp() {
  gate.classList.add("hidden");
  app.classList.remove("hidden");
}

function lockPortal() {
  sessionStorage.removeItem("rv_unlocked");
  location.reload();
}

unlockBtn.addEventListener("click", unlock);
passwordInput.addEventListener("keydown", e => {
  if (e.key === "Enter") unlock();
});
lockBtn.addEventListener("click", lockPortal);

// Skip the gate if already unlocked this browser session
if (sessionStorage.getItem("rv_unlocked") === "true") {
  showApp();
}

// ============================================================
//  NAVIGATION
// ============================================================
const navButtons = document.querySelectorAll(".nav-btn");
const views = document.querySelectorAll(".view");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.view;

    // These two just open a new tab — no view switch needed
    if (target === "admin") {
      window.open(CONFIG.adminDashboardUrl, "_blank");
      return;
    }
    if (target === "orders") {
      window.open(CONFIG.orderManagementUrl, "_blank");
      return;
    }

    // Otherwise, switch the active view (Invoices / Forms)
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    views.forEach(v => v.classList.remove("active"));
    document.getElementById("view-" + target).classList.add("active");

    if (target === "forms") {
      const formsFrame = document.getElementById("formsFrame");
      if (!formsFrame.src) formsFrame.src = CONFIG.formsUrl;
    }
  });
});

// ============================================================
//  INVOICE LIST + PREVIEW (with caching)
// ------------------------------------------------------------
//  Each invoice gets its own iframe, created ONCE on first click.
//  After that, switching between invoices just shows/hides the
//  already-loaded iframe instead of reloading it from Google —
//  so repeat visits to the same invoice are instant, and every
//  invoice only ever hits Google's servers one time per session.
// ============================================================
const invoiceList = document.getElementById("invoiceList");
const invoiceFramesContainer = document.getElementById("invoiceFrames");
const invoicePlaceholder = document.getElementById("invoicePlaceholder");

const loadedFrames = {}; // index -> iframe element, once loaded

function showInvoice(index, invoice) {
  // Hide every existing frame first
  Object.values(loadedFrames).forEach(f => f.classList.add("hidden"));
  invoicePlaceholder.classList.add("hidden");

  if (loadedFrames[index]) {
    // Already loaded earlier — just reveal it, no reload
    loadedFrames[index].classList.remove("hidden");
    return;
  }

  // First time opening this invoice — create and cache its iframe
  const frame = document.createElement("iframe");
  frame.className = "frame";
  frame.src = invoice.url;
  invoiceFramesContainer.appendChild(frame);
  loadedFrames[index] = frame;
}

CONFIG.invoices.forEach((invoice, index) => {
  const item = document.createElement("button");
  item.className = "invoice-item";
  item.textContent = invoice.name;
  item.addEventListener("click", () => {
    document.querySelectorAll(".invoice-item").forEach(el => el.classList.remove("active"));
    item.classList.add("active");
    showInvoice(index, invoice);
  });
  invoiceList.appendChild(item);
});
