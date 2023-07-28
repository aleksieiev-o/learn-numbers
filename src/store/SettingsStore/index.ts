import {makeAutoObservable} from 'mobx';
import { RootStore } from '../index';
import { SettingsStoreService } from './service';
import {
  EnumBaseSettingsEndpoints,
  EnumAppLocale,
  IAppSettings,
  EnumAppTheme,
  ISettingsStore,
  ISpeechSettings,
  EnumSettingsEndpoints
} from './types';

export class SettingsStore implements ISettingsStore {
  rootStore: RootStore;

  settingsStoreService: SettingsStoreService;

  appSettings: IAppSettings;
  speechSettings: ISpeechSettings;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    this.settingsStoreService = new SettingsStoreService(this.rootStore);

    this.appSettings = {
      appLocale: window.localStorage.getItem('i18nextLng') as EnumAppLocale || EnumAppLocale.EN_US,
      appTheme: window.localStorage.getItem('chakra-ui-color-mode') as EnumAppTheme || EnumAppTheme.LIGHT,
    };

    this.speechSettings = {
      speechMinValue: 1,
      speechMaxValue: 10,
      speechPitch: 1,
      speechRate: 1,
      speechVolume: 1,
      speechLocale: 'Google US English',
      // speechLocale: SettingsStore.getCurrentLocaleName(this.rootStore.bowserBrowser),
    };

    makeAutoObservable(this);
  }

  async fetchAppSettings(): Promise<void> {
    this.appSettings = await this.settingsStoreService.fetchAppSettings();
  }

  async fetchSpeechSettings(): Promise<void> {
    this.speechSettings = await this.settingsStoreService.fetchSpeechSettings();
  }

  async createAppSettings(): Promise<void> {
    await this.settingsStoreService
      .createSettings<IAppSettings, EnumBaseSettingsEndpoints.APP_SETTINGS>(this.appSettings, EnumBaseSettingsEndpoints.APP_SETTINGS);
  }

  async createSpeechSettings(): Promise<void> {
    await this.settingsStoreService
      .createSettings<ISpeechSettings, EnumBaseSettingsEndpoints.SPEECH_SETTINGS>(this.speechSettings, EnumBaseSettingsEndpoints.SPEECH_SETTINGS);
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
    this.speechSettings.speechMinValue = await this.settingsStoreService
      .updateSettingsItem<number, EnumSettingsEndpoints.SPEECH_MIN_VALUE>(value, EnumSettingsEndpoints.SPEECH_MIN_VALUE);
  }

  async updateSpeechMaxValue(value: number): Promise<void> {
    this.speechSettings.speechMaxValue = await this.settingsStoreService
      .updateSettingsItem<number, EnumSettingsEndpoints.SPEECH_MAX_VALUE>(value, EnumSettingsEndpoints.SPEECH_MAX_VALUE);
  }

  async updateSpeechVolumeValue(value: number): Promise<void> {
    this.speechSettings.speechVolume = await this.settingsStoreService
      .updateSettingsItem<number, EnumSettingsEndpoints.SPEECH_VOLUME>(value, EnumSettingsEndpoints.SPEECH_VOLUME);
  }

  async updateSpeechRateValue(value: number): Promise<void> {
    this.speechSettings.speechRate = await this.settingsStoreService
      .updateSettingsItem<number, EnumSettingsEndpoints.SPEECH_RATE>(value, EnumSettingsEndpoints.SPEECH_RATE);
  }

  async updateSpeechPitchValue(value: number): Promise<void> {
    this.speechSettings.speechPitch = await this.settingsStoreService
      .updateSettingsItem<number, EnumSettingsEndpoints.SPEECH_PITCH>(value, EnumSettingsEndpoints.SPEECH_PITCH);
  }

  async updateSpeechLocale(value: string): Promise<void> {
    this.speechSettings.speechLocale = await this.settingsStoreService
      .updateSettingsItem<string, EnumSettingsEndpoints.SPEECH_LOCALE>(value, EnumSettingsEndpoints.SPEECH_LOCALE);
  }

  // private static getCurrentLocaleName(browser: Bowser.Parser.Details) {
  //   switch (browser.name) {
  //     case 'Chrome' : return 'Google US English';
  //     case 'Firefox' : return 'urn:moz-tts:speechd:English%20(America)?en';
  //     default: return '';
  //   }
  // }
}
