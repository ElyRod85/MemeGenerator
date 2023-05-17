const imageFileInput = document.querySelector("#imageFileInput");
const canvas = document.querySelector("#meme");
const topTextInput = document.querySelector("#topTextInput");
const bottomTextInput = document.querySelector("#bottomTextInput");

let image;

imageFileInput.addEventListener("change", (e) => {
  const imageDataUrl = URL.createObjectURL(e.target.files[0]);

  image = new Image();
  image.src = imageDataUrl;

  image.addEventListener(
    "load",
    () => {
      updateMemeCanvas(
        canvas,
        image,
        topTextInput.value,
        bottomTextInput.value
      );
    },
    { once: true }
  );
});

topTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

function updateMemeCanvas(canvas, image, topText, bottomText) {
  const context = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 10);
  const yOffset = height / 25;

  // Canvas background
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0);

  // Text
  context.strokeStyle = "black";
  context.lineWidth = Math.floor(fontSize / 4);
  context.fillStyle = "white";
  context.textAlign = "center";
  context.lineJoin = "round";
  context.font = `${fontSize}px anton`;

  // Top text
  context.textBaseline = "top";
  context.strokeText(topText, width / 2, yOffset);
  context.fillText(topText, width / 2, yOffset);

  // Bottom text
  context.textBaseline = "bottom";
  context.strokeText(bottomText, width / 2, height - yOffset);
  context.fillText(bottomText, width / 2, height - yOffset);
}



// Conditionals

function checkImageFile() {
  var imageFileInput = document.getElementById("imageFileInput");
  var topTextInput = document.getElementById("topTextInput");
  var bottomTextInput = document.getElementById("bottomTextInput");
  
  // Enable or disable the text input fields based on the image file input value
  if (imageFileInput.files.length > 0) {
    topTextInput.disabled = false;
    bottomTextInput.disabled = false;
  } else {
    topTextInput.disabled = true;
    bottomTextInput.disabled = true;
  }
}

function checkInputs() {
  var topInput = document.getElementById("topTextInput");
  var bottomInput = document.getElementById("bottomTextInput");
  var downloadButton = document.getElementById("downloadButton");
  
  // Enable or disable the download button based on the input fields' values
  if (topInput.value && bottomInput.value) {
    downloadButton.disabled = false;
  } else {
    downloadButton.disabled = true;
  }
}


// Download image as PNG file
function downloadImage() {
  var canvas = document.getElementById("meme");
  var dataURL = canvas.toDataURL("image/png");
  var link = document.createElement("a");
  link.href = dataURL;
  link.download = "meme.png";
  link.click();
}