"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Flex,
  Heading,
  Separator,
  Skeleton,
} from "@radix-ui/themes";
import { getDefaultSettings, validateSettingsClient } from "@/utils/settings";
import { toast } from "sonner";
import { Settings, SettingsIndex } from "@/types/settings";
import { FormInput } from "@/components/FormInput/FormInput";
import { settingsSchema } from "@/utils/settingsSchema";

// Avoid mapping values that are not allowed
function mapSettingsData(settings: Settings): Settings {
  const res: Settings = getDefaultSettings();

  function isKey<T extends object>(x: T, k: PropertyKey): k is keyof T {
    return k in x;
  }

  for (const [key, value] of Object.entries(settings)) {
    if (isKey(getDefaultSettings(), key) && value) {
      res[key] = value;
    }
  }

  return res;
}

export default function Page() {
  const [settings, setSettings] = useState<Settings>(getDefaultSettings());
  const [loading, setLoading] = useState<boolean>(true);
  const [enableSaving, setEnableSaving] = useState(true);

  useEffect(() => {
    // Fetch settings on component mount
    const fetchSettings = async () => {
      try {
        const response = await axios.get("/api/settings");
        setSettings(mapSettingsData(response.data.data));
      } catch (error) {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnableSaving(false);
    try {
      await validateSettingsClient(settings);
    } catch (error) {
      setEnableSaving(true);
      return;
    }

    try {
      await axios.post("/api/settings", settings);
      toast.success("Settings saved successfully");
    } catch (error) {
      toast.error("Failed to save settings");
    }

    setEnableSaving(true);
  };

  return (
    <Card className="min-w-[600px]">
      <form onSubmit={handleSubmit}>
        <Flex gap="4" direction="column">
          <Skeleton loading={loading}>
            <Heading size="6">Settings</Heading>
          </Skeleton>
          {Object.keys(settingsSchema).map((category, index) => (
            <React.Fragment key={category}>
              {/* Separator only after first and before last */}
              {index > 0 && index < Object.keys(settingsSchema).length && (
                <Separator className="w-full" />
              )}
              <Flex gap="2" direction="column">
                <Skeleton loading={loading}>
                  <Heading size="3">{category}</Heading>
                </Skeleton>

                {Object.keys(settingsSchema[category].settings).map(
                  (settingsKey: any) => {
                    const settingsData =
                      settingsSchema[category].settings[
                        settingsKey as SettingsIndex
                      ];
                    return (
                      <FormInput
                        key={settingsKey}
                        label={settingsData.label}
                        placeholder
                        index={settingsKey}
                        handleInputChange={handleInputChange}
                        loading={loading}
                        setSettings={setSettings}
                        settings={settings}
                        enableButton
                        inputType={settingsData.type}
                      />
                    );
                  }
                )}
              </Flex>
            </React.Fragment>
          ))}
          <div className="flex justify-end">
            <Skeleton loading={loading}>
              <Button type="submit" disabled={!enableSaving}>
                Save Settings
              </Button>
            </Skeleton>
          </div>
        </Flex>
      </form>
    </Card>
  );
}
