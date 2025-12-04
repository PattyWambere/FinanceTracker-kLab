document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");
  const addTransactionButtons = document.querySelectorAll(".add-transaction-btn");
  const transactionModal = document.getElementById("transactionModal");
  const signoutModal = document.getElementById("signoutModal");
  const signOutTrigger = document.getElementById("signOutTrigger");

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
  confirmSignoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "login.html";
  });

  const modalTabs = document.querySelectorAll(".modal .tab");
  modalTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      modalTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  const modalForm = document.querySelector(".modal-form");
  modalForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Transaction added (UI mock).");
    closeModal(transactionModal);
    modalForm.reset();
  });
});
