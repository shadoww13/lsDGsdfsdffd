document.addEventListener("DOMContentLoaded", () => {
  const clickSound = document.getElementById("clickSound");
  function playClick() {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
    }
  }

  const popularPairs = [
    { flag1: "🇺🇸", code1: "USD", code2: "EUR", flag2: "🇪🇺" },
    { flag1: "🇬🇧", code1: "GBP", code2: "USD", flag2: "🇺🇸" },
    { flag1: "🇯🇵", code1: "JPY", code2: "USD", flag2: "🇺🇸" },
    { flag1: "🇨🇭", code1: "CHF", code2: "USD", flag2: "🇺🇸" },
    { flag1: "🇨🇦", code1: "CAD", code2: "USD", flag2: "🇺🇸" },
    { flag1: "🇦🇺", code1: "AUD", code2: "USD", flag2: "🇺🇸" }
  ];

  const pairsList = document.getElementById("pairsList");
  popularPairs.forEach(pair => {
    const li = document.createElement("li");
    li.className = "pair";
    li.innerHTML = `
      <span class="flag">${pair.flag1}</span>
      <span class="name">${pair.code1}</span>
      →
      <span class="name">${pair.code2}</span>
      <span class="flag">${pair.flag2}</span>
    `;
    li.addEventListener("click", () => {
      playClick();
      alert(`${pair.code1}/${pair.code2} clicked`);
    });
    pairsList.appendChild(li);
  });

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      playClick();
      alert(`${btn.textContent} clicked`);
    });
  });
});
