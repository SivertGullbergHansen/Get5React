import { SettingsIndex, SettingsType } from "@/types/settings";

interface Schema {
    [category: string]: {
      label: string;
      settings:
        {
          [key in SettingsIndex]: {
            default: string | number | boolean;
            type: SettingsType;
            showButton: boolean;
            label: string;
          };
        };
    };
}
  
export const settingsSchema: Schema = {
    G5API: {
      label: "G5API",
      settings: {
        apiURL: {
          default: "localhost:3001",
          type: "text",
          showButton: true,
          label: "Endpoint",
        },
      },
    },
  };