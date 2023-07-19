import Bowser from 'bowser';
import { makeAutoObservable } from 'mobx';
import { RootStore } from '../index';
import { SettingsStoreService } from './service';
import {
  BaseSettingsEndpoints,
  IAppLocale,
  IAppSettings,
  IAppTheme,
  ISettingsStore,
  ISpeechSettings,
  SettingsEndpoints
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
      appLocale: window.localStorage.getItem('i18nextLng') as IAppLocale || IAppLocale.EN_US,
      appTheme: IAppTheme.LIGHT,
    };

    this.speechSettings = {
      speechMinValue: 1,
      speechMaxValue: 10,
      speechPitch: 1,
      speechRate: 1,
      speechVolume: 1,
      speechLocale: SettingsStore.getCurrentLocaleName(this.rootStore.bowserBrowser),
    };

    makeAutoObservable(this);
  }

  async fetchAppSettings() {
    this.appSettings = await this.settingsStoreService.fetchAppSettings();
  }

  async fetchSpeechSettings() {
    this.speechSettings = await this.settingsStoreService.fetchSpeechSettings();
  }

  async updateAppLocale(value: IAppLocale) {
    this.appSettings.appLocale = await this.settingsStoreService.updateSettingsItem<IAppLocale, SettingsEndpoints.APP_LOCALE>(value, SettingsEndpoints.APP_LOCALE);
  }

  async updateAppTheme(value: IAppTheme) {
    this.appSettings.appTheme = await this.settingsStoreService.updateSettingsItem<IAppTheme, SettingsEndpoints.APP_THEME>(value, SettingsEndpoints.APP_THEME);
  }

  async updateSpeechMinValue(value: number) {
    this.speechSettings.speechMinValue = await this.settingsStoreService.updateSettingsItem<number, SettingsEndpoints.SPEECH_MIN_VALUE>(value, SettingsEndpoints.SPEECH_MIN_VALUE);
  }

  async updateSpeechMaxValue(value: number) {
    this.speechSettings.speechMaxValue = await this.settingsStoreService.updateSettingsItem<number, SettingsEndpoints.SPEECH_MAX_VALUE>(value, SettingsEndpoints.SPEECH_MAX_VALUE);
  }

  async updateSpeechVolumeValue(value: number) {
    this.speechSettings.speechVolume = await this.settingsStoreService.updateSettingsItem<number, SettingsEndpoints.SPEECH_VOLUME>(value, SettingsEndpoints.SPEECH_VOLUME);
  }

  async updateSpeechRateValue(value: number) {
    this.speechSettings.speechRate = await this.settingsStoreService.updateSettingsItem<number, SettingsEndpoints.SPEECH_RATE>(value, SettingsEndpoints.SPEECH_RATE);
  }

  async updateSpeechPitchValue(value: number) {
    this.speechSettings.speechPitch = await this.settingsStoreService.updateSettingsItem<number, SettingsEndpoints.SPEECH_PITCH>(value, SettingsEndpoints.SPEECH_PITCH);
  }

  async updateSpeechLocale(value: string) {
    this.speechSettings.speechLocale = await this.settingsStoreService.updateSettingsItem<string, SettingsEndpoints.SPEECH_LOCALE>(value, SettingsEndpoints.SPEECH_LOCALE);
  }

  async createAppSettings() {
    await this.settingsStoreService.createSettings<IAppSettings, BaseSettingsEndpoints.APP_SETTINGS>(this.appSettings, BaseSettingsEndpoints.APP_SETTINGS);
  }

  async createSpeechSettings() {
    await this.settingsStoreService.createSettings<ISpeechSettings, BaseSettingsEndpoints.SPEECH_SETTINGS>(this.speechSettings, BaseSettingsEndpoints.SPEECH_SETTINGS);
  }

  private static getCurrentLocaleName(browser: Bowser.Parser.Details) {
    switch (browser.name) {
      case 'Chrome' : return 'Google US English';
      case 'Firefox' : return 'urn:moz-tts:speechd:English%20(America)?en';
      default: return '';
    }
  }
}
