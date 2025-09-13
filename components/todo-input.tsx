"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Sparkles } from "lucide-react"

interface TodoInputProps {
  onAddTodo: (text: string, priority: "low" | "medium" | "high") => void
}

export function TodoInput({ onAddTodo }: TodoInputProps) {
  const [text, setText] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAddTodo(text.trim(), priority)
      setText("")
      setPriority("medium")
    }
  }

  return (
    <Card className="p-6 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="新しいタスクを入力してください..."
              className="text-lg py-6 px-4 border-0 bg-input/50 focus:bg-input focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
          <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
            <SelectTrigger className="w-32 py-6 border-0 bg-input/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">低</SelectItem>
              <SelectItem value="medium">中</SelectItem>
              <SelectItem value="high">高</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="w-full py-6 text-lg font-medium bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          disabled={!text.trim()}
        >
          <Plus className="w-5 h-5 mr-2" />
          タスクを追加
          <Sparkles className="w-4 h-4 ml-2" />
        </Button>
      </form>
    </Card>
  )
}
