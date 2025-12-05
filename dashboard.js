import { auth } from "./firebase.js";
import {
  createTransaction,
  fetchTransactions,
} from "./firestore.js";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");
  const addTransactionButtons = document.querySelectorAll(".add-transaction-btn");
  const transactionModal = document.getElementById("transactionModal");
  const signoutModal = document.getElementById("signoutModal");
  const signOutTrigger = document.getElementById("signOutTrigger");
  const userNameEls = document.querySelectorAll("[data-user-name]");
  const userEmailEls = document.querySelectorAll("[data-user-email]");
  const profileNameInput = document.querySelector("[data-profile-name]");
  const profileEmailInput = document.querySelector("[data-profile-email]");
  const transactionsRecentEl = document.querySelector('[data-transactions="recent"]');
  const transactionsAllEl = document.querySelector('[data-transactions="all"]');
  const modalForm = document.querySelector(".modal-form");
  const amountInput = document.querySelector("[data-amount]");
  const categoryInput = document.querySelector("[data-category]");
  const dateInput = document.querySelector("[data-date]");
  const descriptionInput = document.querySelector("[data-description]");
  let currentUser = null;
  let modalType = "expense";

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
      return;
    }

    currentUser = user;
    const displayName = user.displayName || user.email?.split("@")[0] || "User";
    const email = user.email || "";

    userNameEls.forEach((el) => (el.textContent = displayName));
    userEmailEls.forEach((el) => (el.textContent = email));

    if (profileNameInput) profileNameInput.value = displayName;
    if (profileEmailInput) profileEmailInput.value = email;

    loadTransactions();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const target = link.dataset.page;

      navLinks.forEach((btn) => btn.classList.remove("active"));
      link.classList.add("active");

      pages.forEach((page) => {
        page.classList.toggle("hidden", page.dataset.page !== target);
      });
    });
  });

  const openModal = (modal) => modal && modal.classList.remove("hidden");
  const closeModal = (modal) => modal && modal.classList.add("hidden");

  addTransactionButtons.forEach((btn) => {
    btn.addEventListener("click", () => openModal(transactionModal));
  });

  document.querySelectorAll("[data-close-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(btn.closest(".modal"));
    });
  });

  transactionModal?.addEventListener("click", (event) => {
    if (event.target === transactionModal) closeModal(transactionModal);
  });

  signoutModal?.addEventListener("click", (event) => {
    if (event.target === signoutModal) closeModal(signoutModal);
  });

  signOutTrigger?.addEventListener("click", () => openModal(signoutModal));
  const confirmSignoutBtn = document.querySelector("#signoutModal .danger-btn");
  confirmSignoutBtn?.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
  });

  const modalTabs = document.querySelectorAll(".modal .tab");
  modalTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      modalTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      modalType = tab.dataset.tab || "expense";
    });
  });

  modalForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!currentUser) return;
    const amount = parseFloat(amountInput?.value || "0");
    if (Number.isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount.");
      return;
    }
    const payload = {
      type: modalType,
      amount,
      category: categoryInput?.value || "General",
      description: descriptionInput?.value || "",
      date: dateInput?.value || new Date().toISOString().split("T")[0],
    };

    createTransaction(currentUser.uid, payload)
      .then(() => loadTransactions())
      .catch((err) => alert(err.message || "Could not save transaction."))
      .finally(() => {
        closeModal(transactionModal);
        modalForm.reset();
        modalTabs.forEach((t) => t.classList.remove("active"));
        modalTabs[0]?.classList.add("active");
        modalType = modalTabs[0]?.dataset.tab || "expense";
      });
  });

  const renderTransactions = (listEl, items, limit) => {
    if (!listEl) return;
    listEl.innerHTML = "";
    const subset = typeof limit === "number" ? items.slice(0, limit) : items;

    if (!subset.length) {
      listEl.innerHTML = `<li class="empty">No transactions yet</li>`;
      return;
    }

    subset.forEach((item) => {
      const li = document.createElement("li");
      const sign = item.type === "income" ? "+" : "-";
      const amountClass = item.type === "income" ? "positive" : "negative";
      li.innerHTML = `
        <div class="transaction-icon ${amountClass}">
          <span>${item.type === "income" ? "↗" : "↘"}</span>
        </div>
        <div class="transaction-info">
          <strong>${item.description || item.category || "Transaction"}</strong>
          <span>${item.category || "General"} • ${item.date || ""}</span>
        </div>
        <span class="amount ${amountClass}">${sign}$${Number(item.amount || 0).toFixed(2)}</span>
      `;
      listEl.appendChild(li);
    });
  };

  const loadTransactions = async () => {
    if (!currentUser) return;
    try {
      const items = await fetchTransactions(currentUser.uid, 50);
      renderTransactions(transactionsRecentEl, items, 5);
      renderTransactions(transactionsAllEl, items);
    } catch (err) {
      console.error(err);
    }
  };
});
