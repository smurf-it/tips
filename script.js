
var tips = [];

// Load tips from cookies on page load
window.addEventListener('load', function () {
  var storedTips = getCookie('tips');
  if (storedTips) {
    tips = JSON.parse(storedTips);
    updateTipList();
  }
});

function addTip() {
  var tipInput = document.getElementById("tip");
  var tipValue = parseFloat(tipInput.value);

  if (!isNaN(tipValue)) {
    tips.push(tipValue);
    tipInput.value = "";
    updateTipList();
    saveTipsToCookies();
  }
}

function removeTip(index) {
  tips.splice(index, 1);
  updateTipList();
  saveTipsToCookies();
}

function calculateSum() {
  var sum = tips.reduce(function (a, b) {
    return a + b;
  }, 0);

  document.getElementById("sum").textContent = "Total Tips: €" + sum.toFixed(2);
}

function updateTipList() {
  var tipList = document.getElementById("tipList");
  tipList.innerHTML = "";

  tips.forEach(function (tip, index) {
    var li = document.createElement("li");
    li.classList.add("tip-item");

    var span = document.createElement("span");
    span.textContent = "€" + tip.toFixed(2) + " (Order " + (index + 1) + ")";

    var button = document.createElement("button");
    button.textContent = "X";
    button.onclick = function () {
      removeTip(index);
    };

    li.appendChild(span);
    li.appendChild(button);
    tipList.appendChild(li);
  });
}

function saveTipsToCookies() {
  setCookie('tips', JSON.stringify(tips));
}

function clearTips() {
  tips = [];
  updateTipList();
  saveTipsToCookies();
}

// Helper function to get a cookie by name
function getCookie(name) {
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

// Helper function to set a cookie
function setCookie(name, value) {
  document.cookie = name + '=' + value + '; path=/';
}