import { User, updateProfile, updateEmail, updatePassword } from '@firebase/auth';
import {
  createUserWithEmailAndPassword,
  reauthenticateWithCredential, signInWithEmailAndPassword, signOut, UserCredential, EmailAuthProvider } from 'firebase/auth';
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
  reAuthUser: (payload: IAuthSignInRequestDto) => Promise<UserCredential>;
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

  async reAuthUser(payload: IAuthSignInRequestDto): Promise<UserCredential> {
    const credential = EmailAuthProvider.credential(payload.email, payload.password);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return await reauthenticateWithCredential(firebaseAuth.currentUser!, credential);
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
      await updateEmail(currentUser, payload.newEmail);
    }
  }

  async updateUserPassword(payload: IAuthChangePasswordRequestDto): Promise<void> {
    const currentUser = AuthorizationStoreService.getCurrentUser();

    if (currentUser) {
      await updatePassword(currentUser, payload.newPassword);
    }
  }

  private static getCurrentUser(): User | null {
    return firebaseAuth.currentUser;
  }
}
