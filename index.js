var slider = document.getElementById("Range");
var output = document.getElementById("demo");
var action = document.getElementById("action");
var arr = [];

const rangeHandler = () => {
  output.innerHTML = slider.value;

  slider.oninput = function () {
    output.innerHTML = slider.value;
  };
};
rangeHandler();

async function BubbleSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      const { x1, x2 } = color2divs(j, j + 1);
      await sleep(1000);

      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        swap(x1, x2);

        await sleep(2000);
      }
      await sleep(500);
      colorback(x1, x2);
    }
    markDone(arr.length - 1 - i);
    await sleep(500);
  }
}

async function HeapSort(arr) {
  var N = arr.length;

  // Build heap (rearrange array)
  for (var i = Math.floor(N / 2) - 1; i >= 0; i--) heapify(arr, N, i);

  // One by one extract an element from heap
  for (var i = N - 1; i > 0; i--) {
    // Move current root to end
    await sleep(2000);
    const { x1, x2 } = color2divs(0, i);
    await sleep(500);

    var temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    swap(x1, x2);
    await sleep(2000);
    colorback(x1, x2);
    markDone(i);
    // call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
  markDone(0);
}

function heapify(arr, N, i) {
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < N && arr[l] > arr[largest]) largest = l;

  // If right child is larger than largest so far
  if (r < N && arr[r] > arr[largest]) largest = r;

  // If largest is not root
  if (largest != i) {
    const { x1, x2 } = color2divs(i, largest);

    var sw = arr[i];
    arr[i] = arr[largest];
    arr[largest] = sw;

    swap(x1, x2);

    colorback(x1, x2);

    // Recursively heapify the affected sub-tree
    heapify(arr, N, largest);
  }
}

async function Quicksort(arr, s, e) {
  if (s === e) {
    markDone(s);
    await sleep(1000);
    return;
  } else {
    var pivot = arr[s];
    var leftI = s;
    var rightI = e;
    let i = s + 1;
    while (leftI !== rightI) {
      if (arr[i] <= pivot) {
        const { x1, x2 } = color2divs(i, leftI);
        document.getElementById(leftI).style.backgroundColor = "blue";
        await sleep(500);

        var sw = arr[i];
        arr[i] = arr[leftI];
        arr[leftI] = sw;

        swap(x1, x2);
        await sleep(2000);
        colorback(x1, x2);
        leftI++;
        i++;
      } else {
        const { x1, x2 } = color2divs(i, rightI);
        document.getElementById(leftI).style.backgroundColor = "blue";
        await sleep(500);

        var sw = arr[i];
        arr[i] = arr[rightI];
        arr[rightI] = sw;

        swap(x1, x2);
        await sleep(2000);
        colorback(x1, x2);
        rightI--;
      }
    }
    markDone(leftI);
    await sleep(500);
    console.log(leftI, rightI);

    if (leftI !== s) await Quicksort(arr, s, leftI - 1);
    if (rightI !== e) await Quicksort(arr, rightI + 1, e);
  }
}

async function InsertionSort(arr) {
  if (arr.length === 1) markDone(0);
  else {
    let i, key, j;
    for (i = 1; i < arr.length; i++) {
      key = arr[i];
      j = i - 1;
      // const { x1, x2 } = color2divs(j, j + 1);
      document.getElementById(j + 1).style.backgroundColor = "blue";
      await sleep(1500);
      while (j >= 0 && arr[j] > key) {
        const { x1, x2 } = color2divs(j, j + 1);
        document.getElementById(j + 1).style.backgroundColor = "blue";
        await sleep(500);

        var sw = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = sw;
        swap(x1, x2);
        await sleep(2000);
        colorback(x1, x2);
        markAllDone(i);
        j--;
      }
      markAllDone(i);
    }
  }
}
// ready algos ^^^

async function process() {
  let algo = document.getElementById("select").value;
  document.getElementById("randomize").disabled = true;
  document.getElementById("solve").disabled = true;
  document.getElementById("select").disabled = true;
  document.getElementById("Range").disabled = true;

  switch (algo) {
    case "1":
      await BubbleSort(arr);
      break;
    case "2":
      await HeapSort(arr);
      break;
    case "3":
      await InsertionSort(arr);
      break;
    case "4":
      await Quicksort(arr, 0, arr.length - 1);
      break;

    default:
      break;
  }
  document.getElementById("randomize").disabled = false;
}

// Utilities
const generateRandomArray = (length) => {
  arr = Array.from({ length }, () => Math.floor(Math.random() * 100));
  action.innerHTML = "";
  displayArray();
  document.getElementById("solve").disabled = false;
  document.getElementById("select").disabled = false;
  document.getElementById("Range").disabled = false;
};

const displayArray = () => {
  action.innerHTML = "";
  arr.map((e, index) => {
    action.innerHTML += `<div class='array-element' id="${index}">${e}</div>`;
    document.getElementById(`${index}`).style.height = 20 + e * 5;
    document.getElementById(`${index}`).style.left = 60 * index;
  });
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const color2divs = (id1, id2) => {
  let x1 = document.getElementById(id1);
  let x2 = document.getElementById(id2);

  x1.style.backgroundColor = "yellow";
  x2.style.backgroundColor = "yellow";

  return { x1, x2 };
};

const swap = (x1, x2) => {
  let leftX = x1.style.left;
  let rightX = x2.style.left;
  let id1 = x1.id;
  let id2 = x2.id;
  x1.id = id2;
  x2.id = id1;
  x1.style.left = rightX;
  x2.style.left = leftX;
};

const colorback = (x1, x2) => {
  x1.style.backgroundColor = "green";
  x2.style.backgroundColor = "green";
};

const markDone = (id) => {
  document.getElementById(id).style.backgroundColor = "red";
};
const markAllDone = (id) => {
  for (let i = 0; i <= id; i++) {
    document.getElementById(i).style.backgroundColor = "red";
  }
};
