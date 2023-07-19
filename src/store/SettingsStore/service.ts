import { ref, set, get, child, DataSnapshot } from 'firebase/database';
import { firebaseDataBase } from '../../firebase';
import {BaseSettingsEndpoints, IAppLocale, IAppSettings, IAppTheme, ISpeechSettings, SettingsEndpoints} from './types';
import { RootStore } from '../index';

interface ISettingsStoreService {
  rootStore: RootStore;

  fetchAppSettings: () => Promise<IAppSettings>;
  fetchSpeechSettings: () => Promise<ISpeechSettings>;

  updateSettingsItem: <T, P>(value: T, endpoint: P & SettingsEndpoints) => Promise<T>;
}

export class SettingsStoreService implements ISettingsStoreService {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async fetchAppSettings(): Promise<IAppSettings> {
    const appLocale = await this.fetchSettingsItem<IAppLocale, SettingsEndpoints.APP_LOCALE>(SettingsEndpoints.APP_LOCALE);
    const appTheme = await this.fetchSettingsItem<IAppTheme, SettingsEndpoints.APP_THEME>(SettingsEndpoints.APP_THEME);

    return Promise.resolve({ appLocale, appTheme });
  }

  async fetchSpeechSettings(): Promise<ISpeechSettings> {
    const speechMinValue = await this.fetchSettingsItem<number, SettingsEndpoints.SPEECH_MIN_VALUE>(SettingsEndpoints.SPEECH_MIN_VALUE);
    const speechMaxValue = await this.fetchSettingsItem<number, SettingsEndpoints.SPEECH_MAX_VALUE>(SettingsEndpoints.SPEECH_MAX_VALUE);
    const speechPitch = await this.fetchSettingsItem<number, SettingsEndpoints.SPEECH_PITCH>(SettingsEndpoints.SPEECH_PITCH);
    const speechRate = await this.fetchSettingsItem<number, SettingsEndpoints.SPEECH_RATE>(SettingsEndpoints.SPEECH_RATE);
    const speechVolume = await this.fetchSettingsItem<number, SettingsEndpoints.SPEECH_VOLUME>(SettingsEndpoints.SPEECH_VOLUME);
    const speechLocale = await this.fetchSettingsItem<string, SettingsEndpoints.SPEECH_LOCALE>(SettingsEndpoints.SPEECH_LOCALE);

    return Promise.resolve({ speechMinValue, speechMaxValue, speechPitch, speechRate, speechVolume, speechLocale });
  }

  async updateSettingsItem<T, P>(value: T, endpoint: P & SettingsEndpoints): Promise<T> {
    if (this.rootStore.authorizationStore.isAuth) {
      const path = this.getSettingsEndpoint(endpoint);
      await set(ref(firebaseDataBase, path), value);
      return await this.fetchSettingsItem<T, P>(endpoint);
    }

    return Promise.resolve(value);
  }

  async createSettings<T, P>(value: T, endpoint: P & BaseSettingsEndpoints) {
    if (this.rootStore.authorizationStore.isAuth) {
      const path = this.getSettingsEndpoint(endpoint);
      await set(ref(firebaseDataBase, path), value);
    }
  }

  private async fetchSettingsItem<T, P>(endpoint: P & SettingsEndpoints): Promise<T> {
    const path = this.getSettingsEndpoint(endpoint);
    const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
    return snapshot.val();
  }

  private getSettingsEndpoint(endpoint: SettingsEndpoints | BaseSettingsEndpoints): string {
    return `${endpoint}`.replace('[id]', this.rootStore.authorizationStore.userUid);
  }
}
