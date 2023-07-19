import { makeAutoObservable } from 'mobx';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { User as FirebaseUser } from '@firebase/auth';
import { AuthorizationStoreService } from './service';
import { RootStore } from '../index';

export interface IAuthSignInRequestDto {
  email: string;
  password: string;
}

export interface User {
  uid: string;
  displayName: string | null
  email: string | null
}

interface IAuthorizationStore {
  rootStore: RootStore;
  authorizationStoreService: AuthorizationStoreService;
  user: User;
  isAuth: boolean;
  signInEmailPassword: (payload: IAuthSignInRequestDto) => void;
  singUpEmailAndPassword: (payload: IAuthSignInRequestDto) => void;
  singOut: () => void;
}

export class AuthorizationStore implements IAuthorizationStore {
  rootStore: RootStore;
  authorizationStoreService: AuthorizationStoreService;

  user: User = {} as User;
  isAuth = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.authorizationStoreService = new AuthorizationStoreService(this);

    makeAutoObservable(this);

    onAuthStateChanged(firebaseAuth, async (user: FirebaseUser | null) => {
      this.rootStore.globalLoaderStore.setGlobalLoading(true);

      if (user && user.uid) {
        this.setUser(user);

        this.setAuth(true);

        await this.rootStore.settingsStore.fetchAppSettings();
        await this.rootStore.settingsStore.fetchSpeechSettings();

        await this.rootStore.globalLoaderStore.setGlobalLoading(false);
      } else {
        this.resetLocalData();

        this.rootStore.globalLoaderStore.setGlobalLoading(false);
      }
    });
  }

  async signInEmailPassword(payload: IAuthSignInRequestDto) {
    const user = await this.authorizationStoreService.signInEmailPassword(payload);
    this.setUser(user);

    await this.rootStore.settingsStore.fetchAppSettings();

    this.setAuth(true);
  }

  async singUpEmailAndPassword(payload: IAuthSignInRequestDto) {
    const user = await this.authorizationStoreService.singUpEmailAndPassword(payload);
    this.setUser(user);

    await this.rootStore.settingsStore.setDefaultAppSettings();

    this.setAuth(true);
  }

  async singOut() {
    await this.authorizationStoreService.singOut();
  }

  get userUid(): string {
    return this.user.uid;
  }

  private setUser(fbUser: FirebaseUser): void {
    this.user = {
      uid: fbUser.uid,
      displayName: fbUser.displayName,
      email: fbUser.email,
    };
  }

  private setAuth(status: boolean): void {
    this.isAuth = status;
  }

  private resetLocalData(): void {
    this.setUser({} as FirebaseUser);
    this.setAuth(false);
  }
}
