import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              登録完了！
            </CardTitle>
            <CardDescription>メールを確認してアカウントを有効化してください</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              登録が完了しました。メールボックスを確認して、アカウントを有効化してからログインしてください。
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
