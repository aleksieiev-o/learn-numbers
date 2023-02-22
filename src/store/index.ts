import { SettingsStore } from './SettingsStore';

interface IRootStore {
  settingsStore: SettingsStore;
}

export class RootStore implements IRootStore {
  settingsStore: SettingsStore;

  constructor() {
    this.settingsStore = new SettingsStore(this);
  }
}
