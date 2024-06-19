"use client";
import { Settings, SettingsType } from "@/types/settings";
import { getDefaultSettings, settingsSchema } from "@/utils/settings";
import { EyeClosedIcon, EyeOpenIcon, ResetIcon } from "@radix-ui/react-icons";
import {
  Flex,
  IconButton,
  Skeleton,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { useState } from "react";

interface FormInputProps {
  label: string;
  index: keyof Settings;
  enableButton?: boolean;
  placeholder?: boolean;
  setSettings: (newValue: any) => any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
  loading: boolean;
  settings: Settings;
  inputProps?: any;
  inputType?: SettingsType;
}

export function FormInput({
  label,
  index,
  enableButton,
  placeholder,
  setSettings,
  loading,
  settings,
  handleInputChange,
  inputProps,
  inputType = "text",
}: FormInputProps) {
  const [showContent, setShowContent] = useState(inputType !== "secret");

  const resetSettingToDefault = () => {
    setSettings((old: any) => ({
      ...old,
      [index]: getDefaultSettings()[index],
    }));
  };

  const FunctionButton = () => {
    if (enableButton) {
      switch (inputType) {
        case "secret":
          return (
            <Skeleton loading={loading}>
              <Tooltip content={showContent ? "Hide content" : "Show content"}>
                <IconButton
                  onClick={() => setShowContent(!showContent)}
                  type="button"
                  variant="soft"
                  disabled={settings[index] === getDefaultSettings()[index]}
                >
                  {showContent ? (
                    <EyeOpenIcon width={16} height={16} />
                  ) : (
                    <EyeClosedIcon width={16} height={16} />
                  )}
                </IconButton>
              </Tooltip>
            </Skeleton>
          );
        case "text":
          return (
            <Skeleton loading={loading}>
              <Tooltip content="Reset to default">
                <IconButton
                  onClick={resetSettingToDefault}
                  type="button"
                  variant="soft"
                  disabled={settings[index] === getDefaultSettings()[index]}
                >
                  <ResetIcon width={16} height={16} />
                </IconButton>
              </Tooltip>
            </Skeleton>
          );
      }
    }
    return (
      <Skeleton loading={loading}>
        <IconButton disabled className="opacity-0" />
      </Skeleton>
    );
  };

  return (
    <Flex gap="3" align="center" justify="between">
      <Skeleton loading={loading}>
        <label htmlFor="apiURL">{label}</label>
      </Skeleton>
      <Flex gap="3" align="center">
        <Skeleton loading={loading}>
          <TextField.Root
            placeholder={placeholder ? getDefaultSettings()[index] : undefined}
            type={showContent ? "text" : "password"}
            radius="large"
            key={index}
            id={index}
            name={index}
            value={settings[index]}
            onChange={handleInputChange}
            className="w-[320px]"
            {...inputProps}
          />
        </Skeleton>
        <FunctionButton />
      </Flex>
    </Flex>
  );
}
