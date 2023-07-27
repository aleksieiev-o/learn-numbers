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
}

export interface IAuthChangeEmailRequestDto extends IAuthSignInRequestDto {
  newEmail: string;
}

export interface IAuthChangePasswordRequestDto extends IAuthSignInRequestDto {
  newPassword: string;
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
  reAuthUser: (payload: IAuthSignInRequestDto) => Promise<void>;
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
        await this.reloadFirebaseUser();

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

  async signInEmailPassword(payload: IAuthSignInRequestDto): Promise<void> {
    await this.authorizationStoreService.signInEmailPassword(payload);
    await this.reloadFirebaseUser();
    await this.rootStore.settingsStore.fetchAppSettings();
    this.setAuth(true);
  }

  async singUpEmailAndPassword(payload: IAuthSignInRequestDto): Promise<void> {
    await this.authorizationStoreService.singUpEmailAndPassword(payload);
    await this.reloadFirebaseUser();
    this.setAuth(true);

    await this.rootStore.settingsStore.createAppSettings();
    await this.rootStore.settingsStore.createSpeechSettings();
  }

  async singOut(): Promise<void> {
    await this.authorizationStoreService.singOut();
  }

  async reAuthUser(payload: IAuthSignInRequestDto): Promise<void> {
    await this.authorizationStoreService.reAuthUser(payload);
  }

  async updateUserProfile(payload: IAuthChangeUserProfileRequestDto): Promise<void> {
    await this.authorizationStoreService.updateUserProfile(payload);
    await this.reloadFirebaseUser();
  }

  async updateUserEmail(payload: IAuthChangeEmailRequestDto): Promise<void> {
    await this.authorizationStoreService.updateUserEmail(payload);
    await this.reloadFirebaseUser();
  }

  async updateUserPassword(payload: IAuthChangePasswordRequestDto): Promise<void> {
    await this.authorizationStoreService.updateUserPassword(payload);
    await this.reloadFirebaseUser();
  }

  get userUid(): string {
    return this.user.uid;
  }

  private async reloadFirebaseUser(): Promise<void> {
    await firebaseAuth.currentUser?.reload();

    if (firebaseAuth.currentUser) {
      this.user = {
        uid: firebaseAuth.currentUser.uid,
        displayName: firebaseAuth.currentUser.displayName,
        email: firebaseAuth.currentUser.email,
      };
    }
  }

  private setAuth(status: boolean): void {
    this.isAuth = status;
  }

  private resetLocalData(): void {
    this.user = {} as FirebaseUser;
    this.setAuth(false);
  }
}
