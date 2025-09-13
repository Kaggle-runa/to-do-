"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import type { Todo } from "@/hooks/use-todos"
import { Trash2, Edit3, Check, X, AlertCircle, Circle, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface TodoItemProps {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
  onEdit: (newText: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(editText.trim())
    }
    setIsEditing(false)
    setEditText(todo.text)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditText(todo.text)
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Zap className="w-4 h-4" />
      case "medium":
        return <AlertCircle className="w-4 h-4" />
      case "low":
        return <Circle className="w-4 h-4" />
      default:
        return <Circle className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-secondary text-secondary-foreground"
      case "low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "高"
      case "medium":
        return "中"
      case "low":
        return "低"
      default:
        return "中"
    }
  }

  return (
    <Card
      className={cn(
        "p-4 transition-all duration-200 border-0 shadow-sm hover:shadow-md",
        todo.completed ? "bg-muted/30 backdrop-blur-sm" : "bg-card/50 backdrop-blur-sm hover:bg-card/70",
      )}
    >
      <div className="flex items-center gap-4">
        <Checkbox checked={todo.completed} onCheckedChange={onToggle} className="w-5 h-5" />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex gap-2">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEdit()
                  if (e.key === "Escape") handleCancel()
                }}
                className="flex-1"
                autoFocus
              />
              <Button size="sm" onClick={handleEdit} variant="outline">
                <Check className="w-4 h-4" />
              </Button>
              <Button size="sm" onClick={handleCancel} variant="outline">
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "text-lg flex-1 transition-all duration-200",
                  todo.completed && "line-through text-muted-foreground",
                )}
              >
                {todo.text}
              </span>
              <Badge variant="secondary" className={cn("text-xs", getPriorityColor(todo.priority))}>
                {getPriorityIcon(todo.priority)}
                <span className="ml-1">{getPriorityLabel(todo.priority)}</span>
              </Badge>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={onDelete}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
