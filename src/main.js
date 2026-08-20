document.addEventListener("DOMContentLoaded", () => {
  // SCREEN DISPLAY
  const screenDisplay = document.querySelector("#screenDisplay");
  let menuHoldTimer;

  // BOOT DISPLAY
  const bootDisplay = document.querySelector("#bootDisplay");

  // boot boolean
  let bootFlag;

  // OS
  const statusBar = document.querySelector(".status-bar");
  const homeScreen = document.querySelector("#launcherCanvas");

  //                    CONTROLS

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
        bootFlag = true;
        localStorage.setItem("homeScreen", "home");
      }, 4000);
    }, 2000);
  });

  // for mobile
  menuBtn.addEventListener("touchstart", () => {
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
        bootFlag = true;
        localStorage.setItem("homeScreen", "home");
      }, 4000);
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
  menuBtn.addEventListener("click", () => {
    if (bootFlag) {
      const savedView = localStorage.getItem("homeScreen");
      if (savedView === "home") {
        console.log(savedView);
        bootDisplay.style.display = "none";
        statusBar.style.display = "flex";
        homeScreen.style.display = "block";
      }
    }
  });

  //   D-PAD CONTROLS
  const dpadUpBtn = document.querySelector("#btn-up");
  const dpadDownBtn = document.querySelector("#btn-down");
  const dpadLeftBtn = document.querySelector("#btn-left");
  const dpadRightBtn = document.querySelector("#btn-right");

  // UP
  dpadUpBtn.addEventListener("mousedown", () => {
    if (gridActiveIndex - 3 >= 0) {
      grids[gridActiveIndex].classList.remove("active");
      gridActiveIndex -= 3;
      grids[gridActiveIndex].classList.add("active");
    }
  });

  // DOWN
  dpadDownBtn.addEventListener("mousedown", () => {
    if (gridActiveIndex + 3 <= 8) {
      grids[gridActiveIndex].classList.remove("active");
      gridActiveIndex += 3;
      grids[gridActiveIndex].classList.add("active");
    }
  });

  // LEFT
  dpadLeftBtn.addEventListener("mousedown", () => {
    if (gridActiveIndex - 1 >= 0) {
      grids[gridActiveIndex].classList.remove("active");
      gridActiveIndex -= 1;
      grids[gridActiveIndex].classList.add("active");
    }
  });
  dpadRightBtn.addEventListener("mousedown", () => {
    if (gridActiveIndex + 1 <= 8) {
      grids[gridActiveIndex].classList.remove("active");
      gridActiveIndex += 1;
      grids[gridActiveIndex].classList.add("active");
    }
  });

  //   FACE BUTTONS (A,B,X,Y)

  const btnX = document.querySelector("#btn-x");
  const btnB = document.querySelector("#btn-b");
  const btnY = document.querySelector("#btn-y");
  const btnA = document.querySelector("#btn-a");

  // btnX.addEventListener("mousedown", () => {
  //   textScreen.style.visiblity = "visible";
  //   textScreen.textContent = "X";
  // });

  // btnB.addEventListener("mousedown", () => {
  //   screenDisplay.textContent = "B";
  // });
  // btnY.addEventListener("mousedown", () => {
  //   screenDisplay.textContent = "Y";
  // });
  // btnA.addEventListener("mousedown", () => {
  //   screenDisplay.textContent = "A";
  // });

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

  // NAVIGATION
  const gameGridContainer = document.querySelector("#game-grid");
  const gridOne = document.querySelector("#grid-item1");
  const gridTwo = document.querySelector("#grid-item2");
  const gridThree = document.querySelector("#grid-item3");
  const gridFour = document.querySelector("#grid-item4");
  const gridFive = document.querySelector("#grid-item5");
  const gridSix = document.querySelector("#grid-item6");
  const gridSeven = document.querySelector("#grid-item7");
  const gridEight = document.querySelector("#grid-item8");
  const gridNine = document.querySelector("#grid-item9");

  let grids = [
    gridOne,
    gridTwo,
    gridThree,
    gridFour,
    gridFive,
    gridSix,
    gridSeven,
    gridEight,
    gridNine,
  ];
  let gridActiveIndex = 0; // gridOne

  grids[gridActiveIndex].classList.add("active");

  // HOME SCREEN STATE

  // TEMPORARY TEST - remove later
  btnA.addEventListener("mousedown", () => {
    if (gridOne) {
      // Show tetris, hide launcher
      statusBar.style.display = "none";
      document.getElementById("launcherCanvas").style.display = "none";
      document.getElementById("tetrisContainer").style.display = "flex";
      TetrisGame.start();
    }
  });
});
