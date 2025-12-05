import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const getValue = (...ids) => {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) return el.value.trim();
  }
  return "";
};

const showError = (msg) => alert(msg);

const handleSignup = async (event) => {
  event.preventDefault();
  const name = getValue("signup-name", "name");
  const email = getValue("signup-email", "email");
  const password = getValue("signup-password", "password");

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(user, { displayName: name });
    }
    window.location.href = "dashboard.html";
  } catch (err) {
    showError(err.message || "Unable to create account.");
  }
};

const handleLogin = async (event) => {
  event.preventDefault();
  const email = getValue("login-email", "email");
  const password = getValue("login-password", "password");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (err) {
    showError(err.message || "Incorrect email or password.");
  }
};

const init = () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  if (signupForm) signupForm.addEventListener("submit", handleSignup);
  if (loginForm) loginForm.addEventListener("submit", handleLogin);
};

document.addEventListener("DOMContentLoaded", init);
