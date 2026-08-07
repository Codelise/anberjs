document.addEventListener("DOMContentLoaded", () => {
  // SCREEN DISPLAY
  const screenDisplay = document.querySelector("#screenDisplay");
  let menuHoldTimer;

  // BOOT DISPLAY
  const bootDisplay = document.querySelector("#bootDisplay");

  // OS
  const statusBar = document.querySelector(".status-bar");
  const homeScreen = document.querySelector("#launcherCanvas");

  //                                                           CONTROLS

  //   MENU BTN
  // BOOT UP
  const menuBtn = document.querySelector("#btnMenu");
  menuBtn.addEventListener("mousedown", function () {
    // BOOTS UP
    menuHoldTimer = setTimeout(() => {
      statusBar.style.display = "none";
      bootDisplay.textContent = "ANBERJS";
      bootDisplay.style.display = "flex";
      screenDisplay.style.zIndex = "1";
      bootDisplay.style.zIndex = "100";
      bootDisplay.style.fontSize = "40px";
      homeScreen.style.display = "none";
      // Goes to homescreen
      setTimeout(() => {
        bootDisplay.style.display = "none";
        statusBar.style.display = "flex";
        homeScreen.style.display = "flex";
        homeScreen.style.flexDirection = "column";
      }, 5000);
    }, 2000);
  });

  menuBtn.addEventListener("mouseup", function () {
    clearTimeout(menuHoldTimer);
  });

  menuBtn.addEventListener("mouseleave", function () {
    clearTimeout(menuHoldTimer);
  });

  // MENU CONTROLS
  // Goes to homescreen again
  menuBtn.addEventListener("keydown", (event) => {
    if (event.key === "m") {
      bootDisplay.style.display = "none";
      statusBar.style.display = "flex";
      homeScreen.style.display = "flex";
    }
  });

  //   D-PAD CONTROLS
  const dpadUpBtn = document.querySelector("#btn-up");
  const dpadDownBtn = document.querySelector("#btn-down");
  const dpadLeftBtn = document.querySelector("#btn-left");
  const dpadRightBtn = document.querySelector("#btn-right");

  dpadUpBtn.addEventListener("mousedown", () => {
    screenDisplay.textContent = "DPAD UP";
  });
  dpadDownBtn.addEventListener("mousedown", () => {
    screenDisplay.textContent = "DPAD DOWN";
  });
  dpadLeftBtn.addEventListener("mousedown", () => {
    screenDisplay.textContent = "DPAD LEFT";
  });
  dpadRightBtn.addEventListener("mousedown", () => {
    screenDisplay.textContent = "DPAD RIGHT";
  });

  //   FACE BUTTONS (A,B,X,Y)

  const btnX = document.querySelector("#btn-x");
  const btnB = document.querySelector("#btn-b");
  const btnY = document.querySelector("#btn-y");
  const btnA = document.querySelector("#btn-a");

  btnX.addEventListener("mousedown", () => {
    screenDisplay.textContent = "X";
  });
  btnB.addEventListener("mousedown", () => {
    screenDisplay.textContent = "B";
  });
  btnY.addEventListener("mousedown", () => {
    screenDisplay.textContent = "Y";
  });
  btnA.addEventListener("mousedown", () => {
    screenDisplay.textContent = "A";
  });

  //   SELECT AND START BTNS
  const selectBtn = document.querySelector("#btn-select");
  const startBtn = document.querySelector("#btn-start");
  let startHolder;

  startBtn.addEventListener("mousedown", () => {
    startHolder = setTimeout(() => {
      screenDisplay.style.zIndex = "-1";
    }, 2000);
  });

  startBtn.addEventListener("mouseup", () => {
    clearTimeout(startHolder);
  });
  selectBtn.addEventListener("mousedown", () => {
    screenDisplay.textContent = "SELECT";
  });
  startBtn.addEventListener("mousedown", () => {
    screenDisplay.textContent = "START";
  });
});
