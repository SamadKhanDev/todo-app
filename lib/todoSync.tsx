export const triggerTodoUpdate = () => {
  window.dispatchEvent(new Event("todo-update"));
};
