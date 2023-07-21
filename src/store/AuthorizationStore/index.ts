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

export interface IAuthChangeUserProfileRequestDto {
  displayName: string;
  photoURL?: string | null;
}

export interface IAuthChangeEmailRequestDto {
  email: string;
}

export interface IAuthChangePasswordRequestDto {
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
  singOut: () => Promise<void>;
  updateUserProfile: (payload: IAuthChangeUserProfileRequestDto) => void;
  updateUserEmail: (payload: IAuthChangeEmailRequestDto) => void;
  updateUserPassword: (payload: IAuthChangePasswordRequestDto) => void;
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
    this.setAuth(true);

    await this.rootStore.settingsStore.createAppSettings();
    await this.rootStore.settingsStore.createSpeechSettings();
  }

  async singOut() {
    await this.authorizationStoreService.singOut();
  }

  async updateUserProfile(payload: IAuthChangeUserProfileRequestDto) {
    await this.authorizationStoreService.updateUserProfile(payload);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.setUser(firebaseAuth.currentUser!); // TODO fix param currentUser
  }

  async updateUserEmail(payload: IAuthChangeEmailRequestDto) {
    await this.authorizationStoreService.updateUserEmail(payload);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.setUser(firebaseAuth.currentUser!); // TODO fix param currentUser
  }

  async updateUserPassword(payload: IAuthChangePasswordRequestDto) {
    await this.authorizationStoreService.updateUserPassword(payload);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.setUser(firebaseAuth.currentUser!); // TODO fix param currentUser
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
