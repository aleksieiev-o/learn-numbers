import {makeAutoObservable} from 'mobx';
import { RootStore } from '../index';
import { SettingsStoreService } from './service';
import {
  EnumBaseSettingsEndpoints,
  EnumAppLocale,
  IAppSettings,
  EnumAppTheme,
  ISettingsStore,
  IRemoteSpeechSettings,
  EnumSettingsEndpoints, ILocalSpeechSettings
} from './types';

export class SettingsStore implements ISettingsStore {
  rootStore: RootStore;

  settingsStoreService: SettingsStoreService;

  appSettings: IAppSettings;
  remoteSpeechSettings: IRemoteSpeechSettings;
  localeSpeechSettings: ILocalSpeechSettings;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.settingsStoreService = new SettingsStoreService(this.rootStore);

    /** Init appSettings */
    this.appSettings = {
      appLocale: window.localStorage.getItem('i18nextLng') as EnumAppLocale || EnumAppLocale.EN_US,
      appTheme: window.localStorage.getItem('chakra-ui-color-mode') as EnumAppTheme || EnumAppTheme.LIGHT,
    };

    /** Init remoteSpeechSettings */
    this.remoteSpeechSettings = {
      speechMinValue: 1,
      speechMaxValue: 10,
      speechPitch: 1,
      speechRate: 1,
      speechVolume: 1,
    };

    /** Init localeSpeechSettings */
    const speech: SpeechSynthesis = window.speechSynthesis;
    let defaultVoice: SpeechSynthesisVoice | undefined = undefined;

    if (speech) {
      speech.onvoiceschanged = () => {
        const speechLocaleURI = window.localStorage.getItem('speechLocalURI');
        defaultVoice = SettingsStore.getDefaultVoice(speech);
        this.localeSpeechSettings = {
          speechLocale: speechLocaleURI ? speechLocaleURI : defaultVoice.voiceURI,
          // speechLocale: SettingsStore.getCurrentLocaleName(this.rootStore.bowserBrowser),
        };
        if (!speechLocaleURI) {
          this.updateSpeechLocalURI();
        }
      };
    }

    const speechLocaleURI = window.localStorage.getItem('speechLocalURI');
    defaultVoice = SettingsStore.getDefaultVoice(speech);
    this.localeSpeechSettings = {
      speechLocale: speechLocaleURI ? speechLocaleURI : defaultVoice.voiceURI,
      // speechLocale: SettingsStore.getCurrentLocaleName(this.rootStore.bowserBrowser),
    };
    if (!speechLocaleURI) {
      this.updateSpeechLocalURI();
    }

    makeAutoObservable(this);
  }

  async fetchAppSettings(): Promise<void> {
    this.appSettings = await this.settingsStoreService.fetchAppSettings();
  }

  async fetchSpeechSettings(): Promise<void> {
    this.remoteSpeechSettings = await this.settingsStoreService.fetchSpeechSettings();
  }

  async createAppSettings(): Promise<void> {
    await this.settingsStoreService
      .createSettings<IAppSettings, EnumBaseSettingsEndpoints.APP_SETTINGS>(this.appSettings, EnumBaseSettingsEndpoints.APP_SETTINGS);
  }

  async createSpeechSettings(): Promise<void> {
    await this.settingsStoreService
      .createSettings<IRemoteSpeechSettings, EnumBaseSettingsEndpoints.SPEECH_SETTINGS>(this.remoteSpeechSettings, EnumBaseSettingsEndpoints.SPEECH_SETTINGS);
  }

  async updateAppLocale(value: EnumAppLocale): Promise<void> {
    this.appSettings.appLocale = await this.settingsStoreService
      .updateSettingsItem<EnumAppLocale, EnumSettingsEndpoints.APP_LOCALE>(value, EnumSettingsEndpoints.APP_LOCALE);
  }

  async updateAppTheme(value: EnumAppTheme): Promise<void> {
    this.appSettings.appTheme = await this.settingsStoreService
      .updateSettingsItem<EnumAppTheme, EnumSettingsEndpoints.APP_THEME>(value, EnumSettingsEndpoints.APP_THEME);
  }

  async updateSpeechMinValue(value: number): Promise<void> {
    this.remoteSpeechSettings.speechMinValue = await this.settingsStoreService
      .updateSettingsItem<number, EnumSettingsEndpoints.SPEECH_MIN_VALUE>(value, EnumSettingsEndpoints.SPEECH_MIN_VALUE);
  }

  async updateSpeechMaxValue(value: number): Promise<void> {
    this.remoteSpeechSettings.speechMaxValue = await this.settingsStoreService
      .updateSettingsItem<number, EnumSettingsEndpoints.SPEECH_MAX_VALUE>(value, EnumSettingsEndpoints.SPEECH_MAX_VALUE);
  }

  async updateSpeechVolumeValue(value: number): Promise<void> {
    this.remoteSpeechSettings.speechVolume = await this.settingsStoreService
      .updateSettingsItem<number, EnumSettingsEndpoints.SPEECH_VOLUME>(value, EnumSettingsEndpoints.SPEECH_VOLUME);
  }

  async updateSpeechRateValue(value: number): Promise<void> {
    this.remoteSpeechSettings.speechRate = await this.settingsStoreService
      .updateSettingsItem<number, EnumSettingsEndpoints.SPEECH_RATE>(value, EnumSettingsEndpoints.SPEECH_RATE);
  }

  async updateSpeechPitchValue(value: number): Promise<void> {
    this.remoteSpeechSettings.speechPitch = await this.settingsStoreService
      .updateSettingsItem<number, EnumSettingsEndpoints.SPEECH_PITCH>(value, EnumSettingsEndpoints.SPEECH_PITCH);
  }

  updateSpeechLocale(value: string): void {
    this.localeSpeechSettings.speechLocale = value;
    this.updateSpeechLocalURI();
  }

  private updateSpeechLocalURI(): void {
    window.localStorage.setItem('speechLocalURI', this.localeSpeechSettings.speechLocale);
  }

  private static getDefaultVoice(speech: SpeechSynthesis): SpeechSynthesisVoice {
    // TODO change Non-Null Assertion Operator
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return speech.getVoices().find((item) => item.default)!;
  }

  // private static getCurrentLocaleName(browser: Bowser.Parser.Details) {
  //   switch (browser.name) {
  //     case 'Chrome' : return 'Google US English';
  //     case 'Firefox' : return 'urn:moz-tts:speechd:English%20(America)?en';
  //     default: return '';
  //   }
  // }
}
