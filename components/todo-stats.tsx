"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Todo } from "@/hooks/use-todos"
import { CheckCircle2, Circle, Clock, Trash2 } from "lucide-react"

interface TodoStatsProps {
  todos: Todo[]
  filter: "all" | "active" | "completed"
  onFilterChange: (filter: "all" | "active" | "completed") => void
  onClearCompleted: () => void
}

export function TodoStats({ todos, filter, onFilterChange, onClearCompleted }: TodoStatsProps) {
  const totalTodos = todos.length
  const completedTodos = todos.filter((todo) => todo.completed).length
  const activeTodos = totalTodos - completedTodos

  return (
    <Card className="p-6 border-0 bg-card/30 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Circle className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">全体</span>
            <Badge variant="secondary">{totalTodos}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary" />
            <span className="text-sm text-muted-foreground">進行中</span>
            <Badge variant="secondary">{activeTodos}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">完了</span>
            <Badge variant="secondary">{completedTodos}</Badge>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button size="sm" variant={filter === "all" ? "default" : "outline"} onClick={() => onFilterChange("all")}>
            すべて
          </Button>
          <Button
            size="sm"
            variant={filter === "active" ? "default" : "outline"}
            onClick={() => onFilterChange("active")}
          >
            進行中
          </Button>
          <Button
            size="sm"
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => onFilterChange("completed")}
          >
            完了済み
          </Button>
          {completedTodos > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={onClearCompleted}
              className="text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              完了済みを削除
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
