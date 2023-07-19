import { User } from '@firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import {AuthorizationStore, IAuthSignInRequestDto} from './index';

interface IAuthorizationStoreService {
  authorizationStore: AuthorizationStore;
  signInEmailPassword: (payload: IAuthSignInRequestDto) => Promise<User>;
  singUpEmailAndPassword: (payload: IAuthSignInRequestDto) => Promise<User>;
  singOut: () => Promise<void>;
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
}
