"use client"

import { TodoItem } from "./todo-item"
import { Card } from "@/components/ui/card"
import type { Todo } from "@/hooks/use-todos"
import { ListTodo } from "lucide-react"

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: string) => void
  onDeleteTodo: (id: string) => void
  onEditTodo: (id: string, newText: string) => void
}

export function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <Card className="p-12 text-center border-0 bg-card/30 backdrop-blur-sm">
        <ListTodo className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
        <h3 className="text-xl font-medium text-muted-foreground mb-2">タスクがありません</h3>
        <p className="text-muted-foreground">上記のフォームから新しいタスクを追加してください</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggleTodo(todo.id)}
          onDelete={() => onDeleteTodo(todo.id)}
          onEdit={(newText) => onEditTodo(todo.id, newText)}
        />
      ))}
    </div>
  )
}
