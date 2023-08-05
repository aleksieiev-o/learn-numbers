import { RootStore } from '../index';
import { SettingsStoreService } from './service';

export enum EnumAppLocale {
  EN_US = 'en-US',
  RU_RU = 'ru-RU',
}

export enum EnumAppTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum EnumBaseSettingsEndpoints {
  APP_SETTINGS = '[id]/app-settings',
  SPEECH_SETTINGS = '[id]/speech-settings',
}

export enum EnumSettingsEndpoints {
  APP_LOCALE = '[id]/app-settings/appLocale',
  APP_THEME = '[id]/app-settings/appTheme',

  SPEECH_RANGE_VALUE = '[id]/speech-settings/speechRangeValue',
  SPEECH_VOLUME = '[id]/speech-settings/speechVolume',
  SPEECH_RATE = '[id]/speech-settings/speechRate',
  SPEECH_PITCH = '[id]/speech-settings/speechPitch',
}

export interface IAppSettings {
  appLocale: EnumAppLocale;
  appTheme: EnumAppTheme;
}

export interface IRangeValue {
  speechMinValue: number;
  speechMaxValue: number;
}

export interface IRemoteSpeechSettings {
  speechRangeValue: IRangeValue;
  speechVolume: number;
  speechRate: number;
  speechPitch: number;
}

export interface ILocalSpeechSettings {
  speechLocale: string;
}

export interface ISettingsStore {
  rootStore: RootStore;
  settingsStoreService: SettingsStoreService;
  appSettings: IAppSettings;
  remoteSpeechSettings: IRemoteSpeechSettings;
  localeSpeechSettings: ILocalSpeechSettings;

  fetchAppSettings: () => Promise<void>;
  fetchSpeechSettings: () => Promise<void>;

  updateAppLocale: (locale: EnumAppLocale) => Promise<void>;
  updateAppTheme: (theme: EnumAppTheme) => Promise<void>;

  updateSpeechRangeValue: (value: IRangeValue) => Promise<void>;
  updateSpeechVolumeValue: (value: number) => Promise<void>;
  updateSpeechRateValue: (value: number) => Promise<void>;
  updateSpeechPitchValue: (value: number) => Promise<void>;
  updateSpeechLocale: (value: string) => void;

  createAppSettings: () => Promise<void>;
  createSpeechSettings: () => Promise<void>;
}
