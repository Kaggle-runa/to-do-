"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

export interface Todo {
  id: string
  text: string
  completed: boolean
  created_at: string
  priority: "low" | "medium" | "high"
  user_id: string
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // ユーザー認証状態を確認
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        fetchTodos()
      }
      setLoading(false)
    }

    getUser()

    // 認証状態の変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchTodos()
      } else {
        setTodos([])
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("todos").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("ToDoの取得に失敗しました:", error)
    } else {
      setTodos(data || [])
    }
  }

  const addTodo = async (text: string, priority: "low" | "medium" | "high" = "medium") => {
    if (!user) return

    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          text,
          priority,
          user_id: user.id,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("ToDoの追加に失敗しました:", error)
    } else {
      setTodos([data, ...todos])
    }
  }

  const toggleTodo = async (id: string) => {
    const todo = todos.find((t) => t.id === id)
    if (!todo) return

    const { error } = await supabase.from("todos").update({ completed: !todo.completed }).eq("id", id)

    if (error) {
      console.error("ToDoの更新に失敗しました:", error)
    } else {
      setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
    }
  }

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id)

    if (error) {
      console.error("ToDoの削除に失敗しました:", error)
    } else {
      setTodos(todos.filter((t) => t.id !== id))
    }
  }

  const editTodo = async (id: string, newText: string) => {
    const { error } = await supabase.from("todos").update({ text: newText }).eq("id", id)

    if (error) {
      console.error("ToDoの編集に失敗しました:", error)
    } else {
      setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)))
    }
  }

  const clearCompleted = async () => {
    const completedIds = todos.filter((t) => t.completed).map((t) => t.id)

    const { error } = await supabase.from("todos").delete().in("id", completedIds)

    if (error) {
      console.error("完了済みToDoの削除に失敗しました:", error)
    } else {
      setTodos(todos.filter((t) => !t.completed))
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return {
    todos,
    user,
    loading,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    signOut,
  }
}
