import {child, DataSnapshot, get, ref, set} from 'firebase/database';
import {firebaseDataBase} from '../../firebase';
import {EnumBaseSettingsEndpoints, IAppSettings, ISpeechSettings, EnumSettingsEndpoints} from './types';
import {RootStore} from '../index';

interface ISettingsStoreService {
  rootStore: RootStore;

  fetchAppSettings: () => Promise<IAppSettings>;
  fetchSpeechSettings: () => Promise<ISpeechSettings>;

  createSettings: <T, P>(value: T, endpoint: P & EnumBaseSettingsEndpoints) => void;
  updateSettingsItem: <T, P>(value: T, endpoint: P & EnumSettingsEndpoints) => Promise<T>;
}

export class SettingsStoreService implements ISettingsStoreService {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  async fetchAppSettings(): Promise<IAppSettings> {
    return await this.fetchSettings<IAppSettings, EnumBaseSettingsEndpoints.APP_SETTINGS>(EnumBaseSettingsEndpoints.APP_SETTINGS);
  }

  async fetchSpeechSettings(): Promise<ISpeechSettings> {
    return await this.fetchSettings<ISpeechSettings, EnumBaseSettingsEndpoints.SPEECH_SETTINGS>(EnumBaseSettingsEndpoints.SPEECH_SETTINGS);
  }

  async createSettings<T, P>(value: T, endpoint: P & EnumBaseSettingsEndpoints) {
    if (this.rootStore.authorizationStore.isAuth) {
      const path = this.getSettingsEndpoint(endpoint);
      await set(ref(firebaseDataBase, path), value);
    }
  }

  async updateSettingsItem<T, P>(value: T, endpoint: P & EnumSettingsEndpoints): Promise<T> {
    if (this.rootStore.authorizationStore.isAuth) {
      const path = this.getSettingsEndpoint(endpoint);
      await set(ref(firebaseDataBase, path), value);
      return await this.fetchSettingsItem<T, P>(endpoint);
    }

    return Promise.resolve(value);
  }

  private async fetchSettings<T, P>(endpoint: P & EnumBaseSettingsEndpoints): Promise<T> {
    const path = this.getSettingsEndpoint(endpoint);
    const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
    return snapshot.val();
  }

  private async fetchSettingsItem<T, P>(endpoint: P & EnumSettingsEndpoints): Promise<T> {
    const path = this.getSettingsEndpoint(endpoint);
    const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
    return snapshot.val();
  }

  private getSettingsEndpoint(endpoint: EnumSettingsEndpoints | EnumBaseSettingsEndpoints): string {
    return `${endpoint}`.replace('[id]', this.rootStore.authorizationStore.userUid);
  }
}
