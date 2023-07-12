import { SettingsStore } from './SettingsStore';
import Bowser from 'bowser';
import { AuthorizationStore } from './AuthorizationStore';
import { GlobalLoaderStore } from './GlobalLoaderStore';

interface IRootStore {
  bowserParser: Bowser.Parser.Parser;

  globalLoaderStore: GlobalLoaderStore;
  authorizationStore: AuthorizationStore;
  settingsStore: SettingsStore;
}

export class RootStore implements IRootStore {
  bowserParser: Bowser.Parser.Parser;

  globalLoaderStore: GlobalLoaderStore;

  authorizationStore: AuthorizationStore;
  settingsStore: SettingsStore;

  constructor() {
    this.bowserParser = Bowser.getParser(window.navigator.userAgent);

    this.globalLoaderStore = new GlobalLoaderStore();

    this.authorizationStore = new AuthorizationStore(this);
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
