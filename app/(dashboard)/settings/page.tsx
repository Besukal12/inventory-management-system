"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Save } from "lucide-react";

type SettingsForm = {
  businessName: string;
  currency: string;
  theme: string;
};

const defaultSettings: SettingsForm = {
  businessName: "Flux Inventory",
  currency: "USD",
  theme: "light",
};

const applyTheme = (theme: string) => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = theme === "dark" || (theme === "system" && prefersDark);

  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.classList.toggle("light", !isDark);
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsForm>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch("/api/settings", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch settings");
        }

        const data = await response.json();
        const nextTheme = data.settings?.theme || defaultSettings.theme;

        setSettings({
          businessName: data.settings?.businessName || defaultSettings.businessName,
          currency: data.settings?.currency || defaultSettings.currency,
          theme: nextTheme,
        });

        applyTheme(nextTheme);
      } catch (error) {
        console.error("Error loading settings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSaving(true);
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      const data = await response.json();
      const nextTheme = data.settings?.theme || settings.theme;

      setSettings({
        businessName: data.settings?.businessName || settings.businessName,
        currency: data.settings?.currency || settings.currency,
        theme: nextTheme,
      });

      applyTheme(nextTheme);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Update your business details and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Business Name</label>
                <input
                  type="text"
                  value={settings.businessName}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      businessName: event.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Currency</label>
                <select
                  value={settings.currency}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      currency: event.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white"
                  disabled={loading}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Theme Preference</label>
                <select
                  value={settings.theme}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      theme: event.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 rounded-full border focus:ring-2 focus:ring-accent outline-none appearance-none bg-white"
                  disabled={loading}
                >
                  <option value="system">System Default</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading || saving}
                className="bg-sidebar text-sidebar-foreground hover:bg-sidebar/90 px-6 py-3 rounded-full inline-flex items-center gap-2 font-medium transition-all shadow-sm disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

