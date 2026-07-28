export default function AuthLayout({ children, }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center min-h-screen py-2">
            <div>
                {children}
            </div>
        </div>
    )
}