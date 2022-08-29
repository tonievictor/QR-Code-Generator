const form = document.getElementById("generate-form");
const qrcode = document.getElementById("qrcode");
const errorText = document.getElementById("error-text");

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    showError();
    setTimeout(() => {
      removeError();
    }, 1000);
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();

      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qrcode.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 2000);
  }

  console.log(url, size);
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
  });
};

const showError = () => {
  errorText.style.display = "block";
};
const removeError = () => {
  errorText.style.display = "none";
};

const showSpinner = () => {
  document.getElementById("spinner").style.display = "block";
};

const hideSpinner = () => {
  document.getElementById("spinner").style.display = "none";
};

const clearUI = () => {
  qrcode.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// const createSaveBtn = (saveUrl) => {
//   const link = document.createElement("a");
//   link.id = "save-link";
//   link.classList = link.href = saveUrl;
//   link.download = "qrcode";
//   link.innerHTML = "Saved Image";
//   document.getElementById("generated").appendChild(link);
// };

const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    "bg-blue-700 rounded w-1/3 text-white py-2 m-auto mb-10 hover:bg-blue-500";
  link.href = saveUrl;
  link.download = "qrcode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
