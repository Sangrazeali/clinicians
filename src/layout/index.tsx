import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { Suspense } from "react"

export default function Layout() {
    return (
        <>
            <Header />
            <main className="bg-zinc-50">
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    )
}