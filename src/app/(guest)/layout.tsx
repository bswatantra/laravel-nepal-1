"use client"


import { ReactNode, useState } from "react";
import { LandingNavbar } from "./landing/components/navbar";
import { LandingFooter } from "./landing/components/footer";
import { LandingThemeCustomizer, LandingThemeCustomizerTrigger } from "./landing/components/landing-theme-customizer";

export default function GuestLayout({ children }: { children: ReactNode }) {
    const [themeCustomizerOpen, setThemeCustomizerOpen] = useState(false)

    return (
        <div className="min-h-screen bg-background">
            <LandingNavbar />
            <main>{children}</main>
            <LandingFooter />
            {/* Theme Customizer */}
            <LandingThemeCustomizerTrigger onClick={() => setThemeCustomizerOpen(true)} />
            <LandingThemeCustomizer open={themeCustomizerOpen} onOpenChange={setThemeCustomizerOpen} />
        </div>
    )
}