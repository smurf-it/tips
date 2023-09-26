var tips = [];

function addTip() {
    var tipInput = document.getElementById("tip");
    var tipValue = parseFloat(tipInput.value);

    if (!isNaN(tipValue)) {
        tips.push(tipValue);
        tipInput.value = "";
        updateTipList();
    }
}

function removeTip(index) {
    tips.splice(index, 1);
    updateTipList();
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