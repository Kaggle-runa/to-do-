"use client"

import { useState } from "react"
import { TodoHeader } from "@/components/todo-header"
import { TodoInput } from "@/components/todo-input"
import { TodoList } from "@/components/todo-list"
import { TodoStats } from "@/components/todo-stats"
import { useTodos } from "@/hooks/use-todos"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function TodoApp() {
  const { todos, user, loading, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted, signOut } = useTodos()
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center space-y-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-2">
                おしゃれなToDoアプリ
              </h1>
              <p className="text-muted-foreground">ログインしてタスクを管理しましょう</p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/auth/login">ログイン</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/auth/signup">新規登録</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-muted-foreground">ようこそ、{user.email}さん</div>
          <Button variant="outline" size="sm" onClick={signOut}>
            ログアウト
          </Button>
        </div>

        <TodoHeader />

        <div className="space-y-8">
          <TodoInput onAddTodo={addTodo} />

          <TodoStats todos={todos} filter={filter} onFilterChange={setFilter} onClearCompleted={clearCompleted} />

          <TodoList todos={filteredTodos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} onEditTodo={editTodo} />
        </div>
      </div>
    </div>
  )
}
