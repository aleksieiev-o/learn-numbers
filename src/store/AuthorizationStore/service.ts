import { User, updateProfile, updateEmail, updatePassword } from '@firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import {
  AuthorizationStore,
  IAuthChangeEmailRequestDto, IAuthChangePasswordRequestDto,
  IAuthChangeUserProfileRequestDto,
  IAuthSignInRequestDto
} from './index';

interface IAuthorizationStoreService {
  authorizationStore: AuthorizationStore;
  signInEmailPassword: (payload: IAuthSignInRequestDto) => Promise<User>;
  singUpEmailAndPassword: (payload: IAuthSignInRequestDto) => Promise<User>;
  singOut: () => Promise<void>;
  updateUserProfile: (payload: IAuthChangeUserProfileRequestDto) => void;
  updateUserEmail: (payload: IAuthChangeEmailRequestDto) => void;
  updateUserPassword: (payload: IAuthChangePasswordRequestDto) => void;
}

export class AuthorizationStoreService implements IAuthorizationStoreService {
  authorizationStore: AuthorizationStore;

  constructor(authorizationStore: AuthorizationStore) {
    this.authorizationStore = authorizationStore;
  }

  async signInEmailPassword(payload: IAuthSignInRequestDto): Promise<User> {
    const { email, password } = payload;
    const userCredential: UserCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential.user;
  }

  async singUpEmailAndPassword(payload: IAuthSignInRequestDto): Promise<User> {
    const { email, password } = payload;
    const userCredential: UserCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential.user;
  }

  async singOut(): Promise<void> {
    return await signOut(firebaseAuth);
  }

  async updateUserProfile(payload: IAuthChangeUserProfileRequestDto): Promise<void> {
    const currentUser = AuthorizationStoreService.getCurrentUser();

    if (currentUser) {
      await updateProfile(currentUser, payload);
    }
  }

  async updateUserEmail(payload: IAuthChangeEmailRequestDto): Promise<void> {
    const currentUser = AuthorizationStoreService.getCurrentUser();

    if (currentUser) {
      await updateEmail(currentUser, payload.email);
    }
  }

  async updateUserPassword(payload: IAuthChangePasswordRequestDto): Promise<void> {
    const currentUser = AuthorizationStoreService.getCurrentUser();

    if (currentUser) {
      await updatePassword(currentUser, payload.password);
    }
  }

  private static getCurrentUser(): User | null {
    return firebaseAuth.currentUser;
  }
}
