"use client"

import React from 'react'
import { RotateCcw, Settings, X, Dices, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { useThemeManager } from '@/hooks/use-theme-manager'
import { useCircularTransition } from '@/hooks/use-circular-transition'
import { colorThemes, tweakcnThemes } from '@/config/theme-data'
import { cn } from '@/lib/utils'
import type { ImportedTheme } from '@/types/theme-customizer'
import "@/components/theme-customizer/circular-transition.css"

interface LandingThemeCustomizerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LandingThemeCustomizer({ open, onOpenChange }: LandingThemeCustomizerProps) {
  const {
    applyImportedTheme,
    isDarkMode,
    resetTheme,
    applyRadius,
    setBrandColorsValues,
    applyTheme,
    applyTweakcnTheme,
  } = useThemeManager()

  const { toggleTheme } = useCircularTransition()

  const [selectedTheme, setSelectedTheme] = React.useState("default")
  const [selectedTweakcnTheme, setSelectedTweakcnTheme] = React.useState("")
  const [importModalOpen, setImportModalOpen] = React.useState(false)
  const [importedTheme, setImportedTheme] = React.useState<ImportedTheme | null>(null)

  const handleReset = () => {
    setSelectedTheme("default")
    resetTheme()
    applyRadius("0.5rem")
  }



  const handleRandomShadcn = () => {
    const randomTheme = colorThemes[Math.floor(Math.random() * colorThemes.length)]
    setSelectedTheme(randomTheme.value)
    applyTheme(randomTheme.value, isDarkMode)
  }




  const handleLightMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDarkMode === false) return
    toggleTheme(event)
  }

  const handleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isDarkMode === true) return
    toggleTheme(event)
  }

  React.useEffect(() => {
    if (importedTheme) {
      applyImportedTheme(importedTheme, isDarkMode)
    } else if (selectedTheme) {
      applyTheme(selectedTheme, isDarkMode)
    } else if (selectedTweakcnTheme) {
      const selectedPreset = tweakcnThemes.find(t => t.value === selectedTweakcnTheme)?.preset
      if (selectedPreset) {
        applyTweakcnTheme(selectedPreset, isDarkMode)
      }
    }
  }, [isDarkMode, importedTheme, selectedTheme, selectedTweakcnTheme, applyImportedTheme, applyTheme, applyTweakcnTheme])

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
        <SheetContent
          side="right"
          className="w-100 p-0 gap-0 pointer-events-auto [&>button]:hidden overflow-hidden flex flex-col"
          onInteractOutside={(e) => {
            if (importModalOpen) {
              e.preventDefault()
            }
          }}
        >
          <SheetHeader className="space-y-0 p-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Settings className="h-4 w-4" />
              </div>
              <SheetTitle className="text-lg font-semibold">Customize Theme</SheetTitle>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handleReset} className="cursor-pointer h-8 w-8">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => onOpenChange(false)} className="cursor-pointer h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Mode Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Mode</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={!isDarkMode ? "secondary" : "outline"}
                  size="sm"
                  onClick={handleLightMode}
                  className="cursor-pointer mode-toggle-button relative overflow-hidden"
                >
                  <Sun className="h-4 w-4 mr-1 transition-transform duration-300" />
                  Light
                </Button>
                <Button
                  variant={isDarkMode ? "secondary" : "outline"}
                  size="sm"
                  onClick={handleDarkMode}
                  className="cursor-pointer mode-toggle-button relative overflow-hidden"
                >
                  <Moon className="h-4 w-4 mr-1 transition-transform duration-300" />
                  Dark
                </Button>
              </div>
            </div>

            <Separator />

            {/* Shadcn UI Theme Presets */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Shadcn UI Theme Presets</Label>
                <Button variant="outline" size="sm" onClick={handleRandomShadcn} className="cursor-pointer">
                  <Dices className="h-3.5 w-3.5 mr-1.5" />
                  Random
                </Button>
              </div>

              <Select value={selectedTheme} onValueChange={(value) => {
                setSelectedTheme(value)
                setSelectedTweakcnTheme("")
                setBrandColorsValues({})
                setImportedTheme(null)
                applyTheme(value, isDarkMode)
              }}>
                <SelectTrigger className="w-full cursor-pointer">
                  <SelectValue placeholder="Choose Shadcn Theme" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <div className="p-2">
                    {colorThemes.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value} className="cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ backgroundColor: theme.preset.styles.light.primary }}
                            />
                            <div
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ backgroundColor: theme.preset.styles.light.secondary }}
                            />
                            <div
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ backgroundColor: theme.preset.styles.light.accent }}
                            />
                            <div
                              className="w-3 h-3 rounded-full border border-border/20"
                              style={{ backgroundColor: theme.preset.styles.light.muted }}
                            />
                          </div>
                          <span>{theme.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </div>
                </SelectContent>
              </Select>
            </div>
            <Separator />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

// Floating trigger button for landing page
export function LandingThemeCustomizerTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={cn(
        "fixed top-1/2 -translate-y-1/2 h-12 w-12 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer right-4"
      )}
    >
      <Settings className="h-5 w-5" />
    </Button>
  )
}
