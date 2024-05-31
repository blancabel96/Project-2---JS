document
  .getElementById("selected-currency")
  .addEventListener("click", function () {
    document.getElementById("dropdown-options").style.display = "block";
  });

document.querySelectorAll(".dropdown-option").forEach(function (option) {
  option.addEventListener("click", function () {
    document.getElementById("selected-currency").innerText = this.innerText;
    document.getElementById("dropdown-options").style.display = "none";
    document.getElementById("selected-currency").dataset.value =
      this.dataset.value;
  });
});

async function convert() {
  const amount = document.getElementById("amount").value;
  const currency = document.getElementById("selected-currency").dataset.value;
  if (!currency) {
    alert("Please select a currency");
    return;
  }
  const response = await fetch(
    `https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`
  );
  const data = await response.json();
  const rate = data.rates[0].mid;
  const result = amount * rate;
  document.getElementById("result").innerText = `${result.toFixed(2)} PLN`;
}

document.addEventListener("click", function (e) {
  if (!document.querySelector(".dropdown").contains(e.target)) {
    document.getElementById("dropdown-options").style.display = "none";
  }
});
