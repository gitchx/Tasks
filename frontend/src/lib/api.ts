const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type Task = {
  id: number;
  text: string;
  completed: number;
  created_at: string;
};

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE_URL}/tasks.php`);
  return await res.json();
}

export async function addTask(text: string): Promise<void> {
  await fetch(`${API_BASE_URL}/tasks.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
}

export async function deleteTask(id: number): Promise<void> {
  await fetch(`${API_BASE_URL}/tasks.php`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
}

export async function updateTask(id: number, updates: Partial<Pick<Task, "text"|"completed">>): Promise<void> {
  await fetch(`${API_BASE_URL}/tasks.php`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...updates })
  });
}
