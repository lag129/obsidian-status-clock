import { App, PluginSettingTab, Setting } from "obsidian";
import type StatusClockPlugin from "./main";

export interface Settings {
  clockIcon: string;
  timeFormat: string;
}

export const DEFAULT_SETTINGS: Settings = {
  clockIcon: "⏰",
  timeFormat: "HH:mm:ss",
};

export class StatusClockSettingTab extends PluginSettingTab {
  plugin: StatusClockPlugin;

  constructor(app: App, plugin: StatusClockPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("Default Icon")
      .setDesc("Choose the default icon for the clock")
      .addDropdown((dropdown) =>
        dropdown
          .addOptions({
            "⏰": "⏰",
            "⏲": "⏲",
            "": "none",
          })
          .setValue(this.plugin.settings.clockIcon)
          .onChange(async (value) => {
            this.plugin.settings.clockIcon = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Time Format")
      .setDesc("Choose the time format")
      .addDropdown((dropdown) =>
        dropdown
          .addOptions({
            "HH:mm:ss": "HH:mm:ss",
            "HH:mm": "HH:mm",
          })
          .setValue(this.plugin.settings.timeFormat)
          .onChange(async (value) => {
            this.plugin.settings.timeFormat = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
