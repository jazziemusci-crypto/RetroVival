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

if (sessionStorage.getItem("rv_unlocked") === "true") {
  showApp();
}

// ============================================================
//  EFFECTIVE CONFIG (config.js defaults + this browser's saved edits)
// ============================================================
const LOCAL_OVERRIDE_KEY = "rv_config_override";

function loadEffectiveConfig() {
  const saved = localStorage.getItem(LOCAL_OVERRIDE_KEY);
  if (saved) {
    try {
      const override = JSON.parse(saved);
      return {
        adminDashboardUrl: override.adminDashboardUrl ?? CONFIG.adminDashboardUrl,
        orderManagementUrl: override.orderManagementUrl ?? CONFIG.orderManagementUrl,
        formsUrl: override.formsUrl ?? CONFIG.formsUrl,
        invoices: override.invoices ?? CONFIG.invoices,
        password: CONFIG.password // password always comes from config.js, never editable here
      };
    } catch (e) {
      console.warn("Could not parse saved link settings, using config.js defaults.", e);
    }
  }
  return { ...CONFIG };
}

let effectiveConfig = loadEffectiveConfig();

// ============================================================
//  NAVIGATION
// ============================================================
const navButtons = document.querySelectorAll(".nav-btn");
const views = document.querySelectorAll(".view");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.view;

    if (target === "admin") {
      window.open(effectiveConfig.adminDashboardUrl, "_blank");
      return;
    }
    if (target === "orders") {
      window.open(effectiveConfig.orderManagementUrl, "_blank");
      return;
    }

    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    views.forEach(v => v.classList.remove("active"));
    document.getElementById("view-" + target).classList.add("active");

    if (target === "forms") {
      const formsFrame = document.getElementById("formsFrame");
      if (formsFrame.src !== effectiveConfig.formsUrl) {
        formsFrame.src = effectiveConfig.formsUrl;
      }
    }

    if (target === "settings") {
      populateSettingsForm();
    }
  });
});

// ============================================================
//  INVOICE LIST (opens each invoice in a NEW TAB, like Admin/Orders)
// ============================================================
const invoiceList = document.getElementById("invoiceList");

function renderInvoiceList() {
  invoiceList.innerHTML = "";

  effectiveConfig.invoices.forEach((invoice) => {
    const item = document.createElement("button");
    item.className = "invoice-item";
    item.textContent = invoice.name;
    item.addEventListener("click", () => {
      window.open(invoice.url, "_blank");
    });
    invoiceList.appendChild(item);
  });
}

renderInvoiceList();

// ============================================================
//  SETTINGS / MANAGE LINKS PANEL
// ============================================================
const inputAdmin = document.getElementById("input-admin");
const inputOrders = document.getElementById("input-orders");
const inputForms = document.getElementById("input-forms");
const invoiceEditRows = document.getElementById("invoiceEditRows");
const addInvoiceRowBtn = document.getElementById("addInvoiceRow");
const saveSettingsBtn = document.getElementById("saveSettings");
const resetSettingsBtn = document.getElementById("resetSettings");
const saveMsg = document.getElementById("saveMsg");

function buildInvoiceEditRow(name = "", url = "") {
  const row = document.createElement("div");
  row.className = "invoice-edit-row";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.className = "name-input";
  nameInput.placeholder = "Invoice name (e.g. RV0011 - Juan Cruz)";
  nameInput.value = name;

  const urlInput = document.createElement("input");
  urlInput.type = "text";
  urlInput.className = "url-input";
  urlInput.placeholder = "https://docs.google.com/spreadsheets/d/.../preview";
  urlInput.value = url;

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-row-btn";
  removeBtn.textContent = "✕";
  removeBtn.addEventListener("click", () => row.remove());

  row.appendChild(nameInput);
  row.appendChild(urlInput);
  row.appendChild(removeBtn);
  return row;
}

function populateSettingsForm() {
  inputAdmin.value = effectiveConfig.adminDashboardUrl;
  inputOrders.value = effectiveConfig.orderManagementUrl;
  inputForms.value = effectiveConfig.formsUrl;

  invoiceEditRows.innerHTML = "";
  effectiveConfig.invoices.forEach(inv => {
    invoiceEditRows.appendChild(buildInvoiceEditRow(inv.name, inv.url));
  });

  saveMsg.textContent = "";
}

addInvoiceRowBtn.addEventListener("click", () => {
  invoiceEditRows.appendChild(buildInvoiceEditRow());
});

saveSettingsBtn.addEventListener("click", () => {
  const rows = invoiceEditRows.querySelectorAll(".invoice-edit-row");
  const invoices = [];
  rows.forEach(row => {
    const name = row.querySelector(".name-input").value.trim();
    const url = row.querySelector(".url-input").value.trim();
    if (name && url) invoices.push({ name, url });
  });

  const override = {
    adminDashboardUrl: inputAdmin.value.trim(),
    orderManagementUrl: inputOrders.value.trim(),
    formsUrl: inputForms.value.trim(),
    invoices: invoices
  };

  localStorage.setItem(LOCAL_OVERRIDE_KEY, JSON.stringify(override));
  effectiveConfig = loadEffectiveConfig();

  renderInvoiceList();

  const formsFrame = document.getElementById("formsFrame");
  formsFrame.src = "";

  saveMsg.textContent = "✅ Saved! Changes are active now on this browser.";
});

resetSettingsBtn.addEventListener("click", () => {
  localStorage.removeItem(LOCAL_OVERRIDE_KEY);
  effectiveConfig = loadEffectiveConfig();
  renderInvoiceList();
  populateSettingsForm();
  saveMsg.textContent = "↩️ Reset to config.js defaults.";
});
