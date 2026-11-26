import { AVATARS, loadAvatarPrompt } from "./prompt-library.js";
import { formatFileSize, validateReferenceImage } from "./upload-validation.js";

const $ = (selector) => document.querySelector(selector);
const elements = {
  file: $("#reference-photo"), drop: $("#upload-drop"), preview: $("#photo-preview"),
  image: $("#preview-image"), name: $("#photo-name"), size: $("#photo-size"),
  uploadError: $("#upload-error"), remove: $("#remove-photo"), options: $("#avatar-options"),
  title: $("#selected-title"), prompt: $("#selected-prompt"), status: $("#prompt-status"),
  promptError: $("#prompt-error"), copy: $("#copy-prompt"), copyAvatar: $("#copy-avatar-only"),
  copyStatus: $("#copy-status"),
};

let selectedAvatar = "profile";
let selectedFiles = null;
let previewUrl = null;

function clearPreview() {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = null;
  selectedFiles = null;
  elements.image.removeAttribute("src");
  elements.preview.hidden = true;
  elements.file.value = "";
}

function showUploadError(message = "") {
  elements.uploadError.textContent = message;
  elements.uploadError.hidden = !message;
}

function handleFile(file) {
  const error = validateReferenceImage(file);
  if (error) {
    clearPreview();
    showUploadError(error);
    return;
  }
  clearPreview();
  showUploadError();
  selectedFiles = file;
  previewUrl = URL.createObjectURL(file);
  elements.image.src = previewUrl;
  elements.name.textContent = file.name;
  elements.size.textContent = formatFileSize(file.size);
  elements.preview.hidden = false;
}

async function renderPrompt() {
  const avatar = AVATARS[selectedAvatar];
  elements.title.textContent = avatar.label;
  elements.prompt.textContent = "";
  elements.promptError.hidden = true;
  elements.status.textContent = "Loading prompt…";
  elements.copy.disabled = true;
  elements.copyAvatar.disabled = true;
  elements.copyStatus.textContent = "";
  try {
    const result = await loadAvatarPrompt(selectedAvatar);
    elements.prompt.textContent = result.avatarPrompt;
    elements.status.textContent = "Prompt loaded from the library.";
    elements.copy.disabled = false;
    elements.copyAvatar.disabled = false;
    elements.copy.dataset.complete = result.completePrompt;
    elements.copyAvatar.dataset.avatar = result.avatarPrompt;
  } catch (error) {
    elements.status.textContent = "";
    elements.promptError.hidden = false;
    console.error("Prompt loading failed", error);
  }
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
    elements.copyStatus.textContent = successMessage;
  } catch {
    elements.copyStatus.textContent = "Clipboard access is unavailable. Select the prompt text and copy it manually.";
  }
}

elements.file.addEventListener("change", () => {
  const [file] = elements.file.files ?? [];
  if (file) handleFile(file);
});
elements.remove.addEventListener("click", () => {
  clearPreview();
  showUploadError();
});
elements.drop.addEventListener("dragover", (event) => {
  event.preventDefault();
  elements.drop.classList.add("is-dragging");
});
elements.drop.addEventListener("dragleave", () => elements.drop.classList.remove("is-dragging"));
elements.drop.addEventListener("drop", (event) => {
  event.preventDefault();
  elements.drop.classList.remove("is-dragging");
  const [file] = event.dataTransfer?.files ?? [];
  if (file) handleFile(file);
});
elements.options.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-avatar]");
  if (!button || !AVATARS[button.dataset.avatar]) return;
  selectedAvatar = button.dataset.avatar;
  for (const option of elements.options.querySelectorAll("button[data-avatar]")) {
    option.setAttribute("aria-pressed", String(option === button));
  }
  renderPrompt();
});
elements.copy.addEventListener("click", () => copyText(elements.copy.dataset.complete, "Complete prompt copied."));
elements.copyAvatar.addEventListener("click", () => copyText(elements.copyAvatar.dataset.avatar, "Avatar prompt copied."));
window.addEventListener("beforeunload", () => {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
});

renderPrompt();
