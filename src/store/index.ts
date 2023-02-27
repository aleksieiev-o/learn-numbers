import { SettingsStore } from './SettingsStore';
import Bowser from 'bowser';

interface IRootStore {
  settingsStore: SettingsStore;
  bowserParser: Bowser.Parser.Parser;
}

export class RootStore implements IRootStore {
  settingsStore: SettingsStore;

  bowserParser: Bowser.Parser.Parser;

  constructor() {
    this.bowserParser = Bowser.getParser(window.navigator.userAgent);

    this.settingsStore = new SettingsStore(this);
  }

  get bowserOs(): Bowser.Parser.OSDetails {
    return this.bowserParser.getOS();
  }

  get bowserBrowser(): Bowser.Parser.Details {
    return this.bowserParser.getBrowser();
  }

  get bowserEngine(): Bowser.Parser.Details {
    return this.bowserParser.getEngine();
  }

  get bowserPlatform(): Bowser.Parser.PlatformDetails {
    return this.bowserParser.getPlatform();
  }
}
