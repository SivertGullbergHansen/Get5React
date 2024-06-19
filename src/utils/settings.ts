import { Settings, SettingsIndex } from "@/types/settings";
import axios from "axios";
import { toast } from "sonner";
import { settingsSchema } from "./settingsSchema";

// Predefined settings with default values
export const getDefaultSettings = (): Settings => {
  const settings: any = {};

  Object.keys(settingsSchema).forEach((category) => {
    Object.keys(settingsSchema[category].settings).forEach((settingKey) => {
      settings[settingKey] =
        settingsSchema[category].settings[settingKey as SettingsIndex].default;
    });
  });

  return settings;
};

export async function validateSettingsClient(newSettings: Settings) {
  const validateEndpoint = async () => {
    try {
      const response = await axios.post("/api/settings/verify", newSettings);
      if (response.status === 200) {
        return true;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error: any) {
      throw new Error(
        `Failed to validate settings, server responded: ${
          JSON.parse(error.request.response).message
        }`
      );
    }
  };

  toast.promise(validateEndpoint, {
    loading: "Checking settings...",
    success: "Settings are valid!",
    error: (err) => err.message || "Failed to validate settings",
  });

  return validateEndpoint();
}

// Validate the settings object
export function isValidSettings (obj: Settings) {
  let isValid = true
  const def = getDefaultSettings();

  console.log(def, obj);
  

  Object.keys(def).forEach((key) => {
    if (typeof obj[key as keyof Settings] !== typeof def[key as keyof Settings])
    {
      isValid = false;
      return;
      }
  });

  return isValid;
};