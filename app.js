let cat = "Все",
  selected = "";
const cards = document.querySelector("#cards");
// Обновление карточек с учётом поиска и выбранной категории.
function render() {
  let q = document.querySelector("#query").value.trim().toLowerCase();
  let list = places.filter(
    (p) =>
      (cat === "Все" || p.cat === cat) &&
      (!q || (p.name + " " + p.cat + " " + p.desc + " " + p.address).toLowerCase().includes(q)),
  );
  cards.innerHTML = list.length
    ? list
        .map(
          (p) =>
            `<article class="card fade"><div class="photo" style="background-color:#294336;background-image:${p.img ? `url('${p.img}')` : `linear-gradient(135deg,#253b33,#52624b)`}">${!p.img ? `<div class="photo-placeholder">${p.name}</div>` : ""}<span class="badge">${p.tag}</span><button class="heart" aria-label="Добавить в избранное" onclick="this.classList.toggle('on')">♡</button></div><div class="cardbody"><div class="meta">${p.cat} · Мирный</div><h3>${p.name}</h3><div class="address">⌖ ${p.address}</div><div class="desc">${p.desc}</div><div class="foot"><a class="source-link" href="${p.url}" target="_blank" rel="noopener noreferrer">Контакты ↗</a><button class="book" onclick="openBook('${p.name}')">Забронировать ↗</button></div></div></article>`,
        )
        .join("")
    : '<div class="empty">Ничего не нашли. Попробуйте другую категорию или запрос.</div>';
}
// Переключение категории и синхронизация фильтров.
function setCat(c) {
  cat = c;
  document.querySelector("#select").value = c;
  document
    .querySelectorAll(".chip")
    .forEach((x) => x.classList.toggle("active", x.dataset.cat === c));
  render();
}
document.querySelectorAll(".chip").forEach((x) => (x.onclick = () => setCat(x.dataset.cat)));
document.querySelector("#search").onsubmit = (e) => {
  e.preventDefault();
  setCat(document.querySelector("#select").value);
  document.querySelector("#places").scrollIntoView();
};
// Открытие формы для выбранного заведения.
function openBook(n) {
  selected = n;
  document.querySelector("#modalTitle").textContent = n;
  document.querySelector("#bookDate").value = document.querySelector("#date").value;
  modal.showModal();
}
document.querySelector("#booking").onsubmit = (e) => {
  e.preventDefault();
  const data = {
    place: selected,
    date: document.querySelector("#bookDate").value,
    time: document.querySelector("#time").value,
    name: document.querySelector("#name").value,
  };
  localStorage.setItem("mesto-booking", JSON.stringify(data));
  modal.close();
  document.querySelector("#successText").textContent =
    `${data.name}, ваша демонстрационная бронь в «${data.place}» сохранена на ${data.date} в ${data.time}.`;
  success.showModal();
};
render();
