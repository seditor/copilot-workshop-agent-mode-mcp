const STORAGE_KEY = "todo-list-items";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyMessage = document.querySelector("#empty-message");
const remainingCount = document.querySelector("#remaining-count");
const clearCompletedButton = document.querySelector("#clear-completed-button");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const THEME_STORAGE_KEY = "todo-list-theme";
const systemThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
let currentFilter = "all";

// 從瀏覽器儲存空間載入待辦資料，若資料損壞則使用空陣列。
let todos = loadTodos();

function loadTodos() {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch (error) {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getEffectiveTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme || (systemThemeQuery.matches ? "dark" : "light");
}

function updateThemeButton() {
  const isDark = getEffectiveTheme() === "dark";
  themeToggle.textContent = isDark ? "☀️ 淺色模式" : "🌙 深色模式";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "切換至淺色模式" : "切換至深色模式");
}

function applyTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  updateThemeButton();
}

function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }
  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
}

function renderTodos() {
  todoList.innerHTML = "";

  getFilteredTodos().forEach((todo) => {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " completed" : ""}`;
    item.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為完成`);

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);

    item.append(checkbox, text, deleteButton);
    todoList.append(item);
  });

  const emptyMessages = {
    all: "還沒有任何待辦事項，新增一個吧！",
    active: "目前沒有未完成的待辦事項。",
    completed: "目前沒有已完成的待辦事項，其他項目仍在清單中，只是被目前篩選條件過濾掉了。",
  };
  emptyMessage.textContent = emptyMessages[currentFilter];
  emptyMessage.hidden = getFilteredTodos().length > 0;
  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  const hasCompletedTodos = todos.some((todo) => todo.completed);
  clearCompletedButton.disabled = !hasCompletedTodos;
  remainingCount.textContent = `未完成：${unfinishedCount} 項`;
}

clearCompletedButton.addEventListener("click", () => {
  const shouldClear = window.confirm("確定要清除所有已完成的待辦事項嗎？此操作無法復原。");

  if (!shouldClear) {
    return;
  }

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
});

themeToggle.addEventListener("click", () => {
  const nextTheme = getEffectiveTheme() === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    renderTodos();
  });
});

systemThemeQuery.addEventListener("change", () => {
  if (!localStorage.getItem(THEME_STORAGE_KEY)) {
    updateThemeButton();
  }
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) {
    todoInput.focus();
    return;
  }

  todos.push({
    id: crypto.randomUUID(),
    text,
    completed: false,
  });
  saveTodos();
  renderTodos();
  todoForm.reset();
  todoInput.focus();
});

todoList.addEventListener("change", (event) => {
  if (!event.target.matches(".todo-checkbox")) {
    return;
  }

  const todo = todos.find((item) => item.id === event.target.closest(".todo-item").dataset.id);
  if (todo) {
    todo.completed = event.target.checked;
    saveTodos();
    renderTodos();
  }
});

todoList.addEventListener("click", (event) => {
  if (!event.target.matches(".delete-button")) {
    return;
  }

  const item = event.target.closest(".todo-item");
  todos = todos.filter((todo) => todo.id !== item.dataset.id);
  saveTodos();
  renderTodos();
});

applyTheme();
renderTodos();