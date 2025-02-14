// p = putih, h = hitam
let values = [
  "hhhphhhhhhp",
  "hhpppphphhp",
  "hhhphhhphhp",
  "hhpppppphhp",
  "hhhhhhhpppp",
  "hppppppphhh",
  "hhhhphhppph",
  "pppppphhhhh",
  "hhhhphhhhhh",
];

let answerKey = [
  "---S------G",
  "--NASI-P--A",
  "---P---E--J",
  "--RUMPUT--A",
  "-------AYAH",
  "-NELAYAN---",
  "----Y--IBU-",
  "CERDAS-----",
  "----M------",
];

const totalColums = values[0].length;
const totalRows = values.length;

let spans_value = {
  "0,3": "1",
  "0,10": "2",
  "1,2": "6",
  "1,7": "7",
  "3,2": "9",
  "4,7": "4",
  "5,4": "3",
  "5,1": "8",
  "6,7": "5",
  "7,0": "10",
};

let current = null;

let mode = "mendatar";

function changeMode() {
  if (mode === "mendatar") {
    mode = "menurun";
  } else {
    mode = "mendatar";
  }

  document.getElementById("modeButton").innerHTML = mode.toUpperCase();
}

function createFrameBoxes() {
  let boxes = "";
  for (let i = 0; i < values.length; i++) {
    boxes += "<tr>";
    for (let j = 0; j < values[i].length; j++) {
      let pos = spans_value[i + "," + j];
      boxes += `<td onclick='myclick(this)' row='${i}' col='${j}' class="${
        values[i][j]
      }">
                      <span>${pos || ""}</span>
                      <b></b>
                  </td>`;
    }
    boxes += "</tr>";
  }
  document.getElementById("table").innerHTML = boxes;
}

createFrameBoxes();

function myclick(box) {
  if (box.classList.contains("p")) {
    let row = box.getAttribute("row");
    let col = box.getAttribute("col");

    if (current) {
      current.style.backgroundColor = "transparent";
    }

    current = box;
    current.style.backgroundColor = "orange";
  }
}

document.body.onkeyup = function (e) {
  if (current) {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      nextMover(e.keyCode);
    }

    if (e.keyCode >= 65 && e.keyCode <= 90) {
      current.querySelector("b").innerHTML = e.key.toUpperCase();
      if (mode === "mendatar") {
        nextMover(39);
      } else {
        nextMover(40);
      }
    }

    if (e.code == "Backspace" || e.code == "Delete") {
      current.querySelector("b").innerHTML = "";
      if (mode === "mendatar") {
        nextMover(37);
      } else {
        nextMover(38);
      }
    }
  }
};

function nextMover(code) {
  let row = parseInt(current.getAttribute("row"));
  let col = parseInt(current.getAttribute("col"));

  switch (code) {
    case 37: // kiri
      col = col == 0 ? totalColums - 1 : col - 1;
      break;
    case 38: // atas
      row = row == 0 ? totalRows - 1 : row - 1;
      break;
    case 39: // kanan
      col = col == totalColums - 1 ? 0 : col + 1;
      break;
    case 40: // bawah
      row = row == totalRows - 1 ? 0 : row + 1;
      break;
    default:
      break;
  }

  if (current && current.classList.contains("p")) {
    current.style.backgroundColor = "transparent";
  }

  current = document.querySelectorAll("tr")[row].querySelectorAll("td")[col];
  if (current.classList.contains("h")) {
    nextMover(code);
  } else {
    current.style.backgroundColor = "orange";
  }
}

function key_check() {
  let wrongs = [];
  let rights = [];
  let belumDijawab = [];
  
  const whites = document.querySelectorAll(".p");

  whites.forEach((element) => {
    const row = element.getAttribute("row");
    const col = element.getAttribute("col");
    const hurufElem = element.querySelector("b");
    const huruf = hurufElem ? hurufElem.innerHTML.trim() : "";

    if (huruf && huruf !== answerKey[row][col]) {
      element.style.backgroundColor = "red";
      wrongs.push(element);
    }

    if (huruf && huruf === answerKey[row][col]) {
      element.style.backgroundColor = "greenyellow";
      rights.push(element);
    }

    if (!huruf) {
      belumDijawab.push(element);
    }
  });

  if (wrongs.length > 0) {
    alert("Jawaban Ada Yang Salah");
  } else if (wrongs.length === 0 && belumDijawab.length > 0) {
    alert("Saat ini jawaban anda benar, tetapi masih ada yang belum dijawab");
  } else {
    alert("Jawaban Anda Benar Semua");
  }
}

