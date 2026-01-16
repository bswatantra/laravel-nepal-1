import { ForgotPasswordForm } from "./components/forgot-password-form"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium text-red-500">
          <div className="bg-primary flex size-9 items-center justify-center rounded-md text-red-500">
            <Logo size={24} />
          </div>
          Laravel Nepal
        </Link>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
