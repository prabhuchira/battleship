document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("carrier").addEventListener("dragstart", dragStarted);
  document
    .getElementById("battleship")
    .addEventListener("dragstart", dragStarted);
  document.getElementById("cruiser").addEventListener("dragstart", dragStarted);
  document
    .getElementById("submarine")
    .addEventListener("dragstart", dragStarted);
  document
    .getElementById("destroyer")
    .addEventListener("dragstart", dragStarted);

  function dragStarted(el) {
    el.dataTransfer.setData("shipName", el.target.id);
    // console.log(el.target.clientWidth)
    el.dataTransfer.setData("shipWidth", el.target.clientWidth);

    el.dataTransfer.dropEffect = "copy";
  }

  function roundNumber(num) {
    let formattedNum = String(num);

    let firstDigit = formattedNum.charAt(0);

    let secondDigit = formattedNum.charAt(1);

    if (num < 99) {
      return 0;
    }

    if (secondDigit > 5) {
      firstDigit++;
    }

    return [Number(firstDigit), 0, 0].join("");
  }

  let element = document.getElementById("main-container");
  let trackScreens = [];

  element.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  element.addEventListener("drop", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    let xPosition = roundNumber(e.x);
    let yPosition = roundNumber(e.y);

    let shipName = e.dataTransfer.getData("shipname");
    let shipWidth = e.dataTransfer.getData("shipWidth");

    let el = document.createElement("div");
    let shipsContainer = document.getElementById("shipContainers").children;

    el.id = shipName;

    el.classList.add("ship");
    el.draggable = true;
    el.style.position = "absolute";
    el.style.left = xPosition + "px";
    el.style.top = yPosition + "px";
    el.innerText = shipName;

    let screen = 0;

    let sum = e.clientX + Number(shipWidth);

    // if( (Number(shipWidth)) >screen){
    if (sum <= 1010) {
      console.log(e.clientX, e.clientY);
      console.log();
      let trackTop = trackScreens.every(
        (i) => Number(roundNumber(e.clientY)) !== Number(i.shipHeight)
      );

      console.log(trackTop, "true pr");
      if (trackTop) {
        element.append(el);
        console.log(el.clientWidth);
        trackScreens.push({
          shipHeight: Number(roundNumber(e.clientY)),
          shipRight: Number(roundNumber(e.clientX)),
          shipWidth: el.clientWidth,
        });

        if (trackScreens.length >= 5) {
          document.getElementById("displayIt").style.display = "block";
        }
        console.log(trackScreens);

        document.getElementById(el.previousSibling.id);
        for (let i = 0; i < shipsContainer.length; i++) {
          if (shipsContainer[i].id == shipName) shipsContainer[i].remove();
        }
      }
    }
  });

  document.getElementById("windows").style.display = "none";

  // console.log(temp1)

  var playground = document.getElementById("play-container");
  playground.style.position = "relative";

  document.getElementById("displayIt").addEventListener("click", () => {
    document.getElementById("user-container").style.display = "none";
    document.getElementById("windows").style.display = "block";
    renderPlayContainer(trackScreens);
  });
});

function renderPlayContainer(testScreens) {
  for (let i = 0; i < 100; i++) {
    document
      .getElementById("play-container")
      .insertAdjacentHTML(
        "afterbegin",
        "<div class='box-default' id=boxMissed-" + i + "></div>"
      );

    // console.log(document.getElementById("boxMissed-"+i))
    document.getElementById("boxMissed-" + i).addEventListener("click", () => {
      document.getElementById("boxMissed-" + i).style.backgroundColor = "green";
      document.getElementById("boxMissed-" + i).className = "boxMissed";
      document.getElementById("boxMissed-" + i).innerText = "Missed";
      console.log(document.getElementById("boxMissed-" + i));
    });

    // console.log(missedId)

    // i++;
  }

  // let box=document.createElement("div");
  // box.className="box";

  let boxNo = 1;

  console.log(testScreens);
  for (let i = 0; i < testScreens.length; i++) {
    let id = 141;

    // if(testScreens[i].shipWidth/100>0)
    console.log(testScreens[i].shipWidth / 100);

    let box =
      "<div id=" +
      id +
      "  class='box'" +
      `style=top:` +
      `${testScreens[i].shipHeight + "px;"}` +
      "left:" +
      testScreens[i].shipRight +
      "px;" +
      "width:" +
      testScreens[i].shipWidth +
      "px;" +
      "></div>";
    document
      .getElementById("play-container")
      .insertAdjacentHTML("afterbegin", box);

    for (let j = 0; j < testScreens[i].shipWidth / 100; j++) {
      document
        .getElementById(id)
        .insertAdjacentHTML(
          "beforeend",
          "<div class='box2' id=box-" + boxNo + "></div>"
        );

      document.getElementById("box-" + boxNo).addEventListener("click", () => {
        console.log("Insert points adding scene here");
        // document.getElementById("box-"+boxNo).innerText="HIT!"
      });

      boxNo++;
    }
    id++;

    // console.log(playground.clientTop)
    // }
  }
}
