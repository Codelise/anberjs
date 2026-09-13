document.addEventListener("DOMContentLoaded", () => {
  // import music file input
  const importFileInput = document.createElement("input");
  importFileInput.type = "file";
  importFileInput.accept = "audio/*";
  importFileInput.setAttribute("id", "audioFileInput");

  // <audio> attributes
  const audioPlayer = document.createElement("audio");
  audioPlayer.setAttribute("id", "audioPlayer");
  audioPlayer.controls = false; // hides controls

  // X Button
  const importBtn = document.querySelector("#btn-x");
  importBtn.addEventListener("click", () => {
    importFileInput.click(); // automatically opens file manager
    importPlayMusic();
  });

  // A Button Pause
  const pauseBtn = document.querySelector("#btn-a");
  pauseBtn.addEventListener("click", () => {
    pausePlayMusic();
  });

  // FUNCTIONS:
  // import music and play music
  const importPlayMusic = () => {
    importFileInput.addEventListener("change", (event) => {
      const importedFile = event.target.files[0];
      if (importedFile) {
        const audioURL = URL.createObjectURL(importedFile);
        audioPlayer.src = audioURL;
        audioPlayer.play();
      }
    });
  };

  // Pause or Play Music
  const pausePlayMusic = () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  };
});

// TO DO:
// display Song info
// Add imported music to list and localStorage/database
// SKIP music
