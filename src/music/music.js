document.addEventListener("DOMContentLoaded", () => {
  const importBtn = document.querySelector("#btn-x");
  importBtn.addEventListener("click", () => {
    const importFileInput = document.createElement("input");
    importFileInput.type = "file";
    importFileInput.accept = "audio/*";
    importFileInput.setAttribute("id", "audioFileInput");

    const audioPlayer = document.createElement("audio");
    audioPlayer.setAttribute("id", "audioPlayer");
    audioPlayer.controls = true;

    document.body.appendChild(importFileInput);
    document.body.appendChild(audioPlayer);

    importFileInput.addEventListener("change", (event) => {
      const importedFile = event.target.files[0];
      if (importedFile) {
        const audioURL = URL.createObjectURL(importedFile);
        console.log(audioURL);
        const player = document.getElementById("audioPlayer");
        player.src = audioURL;
        player.play();
      }
    });
  });
});
