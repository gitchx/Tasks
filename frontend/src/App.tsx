import './App.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { fetchTasks, addTask, deleteTask } from "@/lib/api";
import type { Task } from "@/lib/api";

function App() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  // タスク一覧取得
  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // タスク追加
  const handleAddTask = async () => {
    if (input.trim() === "") return;
    await addTask(input.trim());
    setInput("");
    loadTasks();
  };

  // タスク削除
  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center">
        <div className="w-full max-w-lg2 flex flex-col flex-1 pt-4 min-h-0 px-10 py-20">

          {/* 見出し（固定） */}
          <div className="bg-background border rounded-t-md px-4 py-2 font-medium flex">
            <div className="flex-1">Tasks</div>
            <div className="w-24 text-right pr-9"></div>
          </div>

          {/* スクロール領域 */}
          <div className="flex-1 overflow-y-auto border border-t-0 rounded-b-md min-h-0">
            <div className="pb-28 divide-y">
              {tasks.map(t => (
                <div key={t.id} className="flex items-start px-4 py-2 gap-2">
                  <div className="flex-1 break-words">{t.text}</div>
                  <div className="w-24 flex justify-end pr-6">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteTask(t.id)}
                    >
                      削除
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 下固定入力バー */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur border-t px-4 py-3">
        <div className="mx-auto w-full max-w-lg2 flex gap-2">
          <Input
            placeholder="新しいタスクを入力"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddTask}>追加</Button>
        </div>
      </div>
    </>
  )
}

export default App
