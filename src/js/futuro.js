document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector(".goals");
  const addBtn = document.getElementById("addIdea");
  const input = document.getElementById("newIdea");

  if (!list) return;

  // 1️⃣ Obtener ideas base del HTML
  const baseIdeas = Array.from(list.querySelectorAll("li")).map(li => {
    const checkbox = li.querySelector("input");
    const text = li.textContent.trim();
    const done = checkbox ? checkbox.checked : false;
    return { text, done };
  });

  // 2️⃣ Obtener las guardadas del localStorage
  const savedList = JSON.parse(localStorage.getItem("ideasDeCitas")) || [];

  // 3️⃣ Combinar (manteniendo checks del guardado)
  const combined = [
    ...baseIdeas.map(base => {
      const match = savedList.find(s => s.text === base.text);
      return match ? { ...base, done: match.done } : base;
    }),
    ...savedList.filter(s => !baseIdeas.some(b => b.text === s.text)),
  ];

  // 4️⃣ Renderizar de cero
  list.innerHTML = "";
  combined.forEach(item => {
    const li = createListItem(item.text, item.done);
    list.appendChild(li);
  });

  // 5️⃣ Guardar inmediatamente el estado inicial
  saveList();

  // ➕ Agregar nueva idea
  addBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;
    const li = createListItem(text, false);
    list.appendChild(li);
    input.value = "";
    saveList();
  });

  // 🧩 Función para crear cada elemento
  function createListItem(text, done) {
    const li = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    const deleteBtn = document.createElement("button");

    checkbox.type = "checkbox";
    checkbox.checked = done;
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");

    label.appendChild(checkbox);
    label.append(` ${text}`);
    li.appendChild(label);
    li.appendChild(deleteBtn);

    // Eventos
    checkbox.addEventListener("change", saveList);
    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveList();
    });

    return li;
  }

  // 💾 Guardar toda la lista actual
  function saveList() {
    const items = [];
    list.querySelectorAll("li").forEach(li => {
      const text = li.querySelector("label").textContent.trim();
      const done = li.querySelector("input").checked;
      items.push({ text, done });
    });
    localStorage.setItem("ideasDeCitas", JSON.stringify(items));
  }
});
