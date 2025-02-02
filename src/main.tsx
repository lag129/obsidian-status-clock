import { h, render } from "preact";
import { Plugin } from "obsidian";
import { DEFAULT_SETTINGS, Settings, StatusClockSettingTab } from "./settings";
import { AppHelper } from "./appHelper";
import { StatusClock } from "./components/StatusClock";

export default class StatusClockPlugin extends Plugin {
  settings: Settings;
  appHelper: AppHelper;
  statusBarItem: HTMLElement;

  async onload() {
    await this.loadSettings();
    this.appHelper = new AppHelper(this.app);

    this.statusBarItem = this.addStatusBarItem();
    this.display();

    this.addSettingTab(new StatusClockSettingTab(this.app, this));
  }

  private display() {
    render(
      h(StatusClock, {
        clockIcon: this.settings.clockIcon,
        timeFormat: this.settings.timeFormat,
      }),
      this.statusBarItem,
    );
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.display();
  }

  onunload() {
    this.statusBarItem.remove();
  }
}
