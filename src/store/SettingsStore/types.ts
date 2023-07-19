import { RootStore } from '../index';
import { SettingsStoreService } from './service';

export enum IAppLocale {
  EN_US = 'en-US',
  RU_RU = 'ru-RU',
}

export enum IAppTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum BaseSettingsEndpoints {
  APP_SETTINGS = '[id]/app-settings',
  SPEECH_SETTINGS = '[id]/speech-settings',
}

export enum SettingsEndpoints {
  APP_LOCALE = '[id]/app-settings/appLocale',
  APP_THEME = '[id]/app-settings/appTheme',

  SPEECH_MIN_VALUE = '[id]/speech-settings/speechMinValue',
  SPEECH_MAX_VALUE = '[id]/speech-settings/speechMaxValue',
  SPEECH_VOLUME = '[id]/speech-settings/speechVolume',
  SPEECH_RATE = '[id]/speech-settings/speechRate',
  SPEECH_PITCH = '[id]/speech-settings/speechPitch',
  SPEECH_LOCALE = '[id]/speech-settings/speechLocale',
}

export interface IAppSettings {
  appLocale: IAppLocale;
  appTheme: IAppTheme;
}

export interface ISpeechSettings {
  speechMinValue: number;
  speechMaxValue: number;
  speechVolume: number;
  speechRate: number;
  speechPitch: number;
  speechLocale: string;
}

export interface ISettingsStore {
  rootStore: RootStore;
  settingsStoreService: SettingsStoreService;
  appSettings: IAppSettings;
  speechSettings: ISpeechSettings;

  updateAppLocale: (locale: IAppLocale) => void;
  updateAppTheme: (theme: IAppTheme) => void;

  updateSpeechMinValue: (value: number) => void;
  updateSpeechMaxValue: (value: number) => void;
  updateSpeechVolumeValue: (value: number) => void;
  updateSpeechRateValue: (value: number) => void;
  updateSpeechPitchValue: (value: number) => void;
  updateSpeechLocale: (locale: string) => void;
}
