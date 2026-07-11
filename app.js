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
//  INVOICE LIST + PREVIEW
// ============================================================
const invoiceList = document.getElementById("invoiceList");
const invoiceFrame = document.getElementById("invoiceFrame");
const invoicePlaceholder = document.getElementById("invoicePlaceholder");

CONFIG.invoices.forEach((invoice, index) => {
  const item = document.createElement("button");
  item.className = "invoice-item";
  item.textContent = invoice.name;
  item.addEventListener("click", () => {
    document.querySelectorAll(".invoice-item").forEach(el => el.classList.remove("active"));
    item.classList.add("active");

    invoiceFrame.src = invoice.url;
    invoiceFrame.classList.remove("hidden");
    invoicePlaceholder.classList.add("hidden");
  });
  invoiceList.appendChild(item);
});
