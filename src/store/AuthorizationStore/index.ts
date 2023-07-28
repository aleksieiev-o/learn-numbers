import {makeAutoObservable} from 'mobx';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { User } from '@firebase/auth';
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

interface IUser {
  uid: string;
  displayName: string | null
  email: string | null
}

enum EnumAuthStateChangeType {
  UNDEFINED,
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
}

interface IAuthorizationStore {
  rootStore: RootStore;
  authorizationStoreService: AuthorizationStoreService;
  user: IUser;
  isAuth: boolean;
  authStateChangeType: EnumAuthStateChangeType,
  signInEmailPassword: (payload: IAuthSignInRequestDto) => Promise<void>;
  singUpEmailAndPassword: (payload: IAuthSignInRequestDto) => Promise<void>;
  singOut: () => Promise<void>;
  reAuthUser: (payload: IAuthSignInRequestDto) => Promise<void>;
  updateUserProfile: (payload: IAuthChangeUserProfileRequestDto) => void;
  updateUserEmail: (payload: IAuthChangeEmailRequestDto) => void;
  updateUserPassword: (payload: IAuthChangePasswordRequestDto) => void;
}

export class AuthorizationStore implements IAuthorizationStore {
  rootStore: RootStore;
  authorizationStoreService: AuthorizationStoreService;

  user: IUser = {} as IUser;
  isAuth = false;
  authStateChangeType = EnumAuthStateChangeType.UNDEFINED;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.authorizationStoreService = new AuthorizationStoreService(this);

    makeAutoObservable(this);

    onAuthStateChanged(firebaseAuth, async (user: User | null) => {
      this.rootStore.globalLoaderStore.setGlobalLoading(true);

      if (user && user.uid) {
        await this.initApp();
      } else {
        this.resetLocalData();
      }

      this.rootStore.globalLoaderStore.setGlobalLoading(false);
    });
  }

  async signInEmailPassword(payload: IAuthSignInRequestDto): Promise<void> {
    this.authStateChangeType = EnumAuthStateChangeType.SIGN_IN;
    await this.authorizationStoreService.signInEmailPassword(payload);
  }

  async singUpEmailAndPassword(payload: IAuthSignInRequestDto): Promise<void> {
    this.authStateChangeType = EnumAuthStateChangeType.SIGN_UP;
    await this.authorizationStoreService.singUpEmailAndPassword(payload);
  }

  async singOut(): Promise<void> {
    this.authStateChangeType = EnumAuthStateChangeType.SIGN_OUT;
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

  private async initApp(): Promise<void> {
    await this.reloadFirebaseUser();

    this.setAuth(true);

    if (this.authStateChangeType === EnumAuthStateChangeType.SIGN_UP) {
      await this.rootStore.settingsStore.createAppSettings();
      await this.rootStore.settingsStore.createSpeechSettings();
    }

    await this.rootStore.settingsStore.fetchAppSettings();
    await this.rootStore.settingsStore.fetchSpeechSettings();
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
    this.user = {} as User;
    this.setAuth(false);
  }
}
