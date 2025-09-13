import { CheckCircle2 } from "lucide-react"

export function TodoHeader() {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-primary rounded-2xl shadow-lg">
          <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          タスク管理
        </h1>
      </div>
      <p className="text-muted-foreground text-lg">効率的にタスクを管理して、生産性を向上させましょう</p>
    </div>
  )
}
