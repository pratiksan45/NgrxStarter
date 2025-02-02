import { ActionReducerMap } from '@ngrx/store';
import { userReducer, UserState } from './reducers/user.reducer';
import { UserEffects } from './effects/user.effects';
import { selectAllUsers, selectUsersLoading, selectUsersError } from './selectors/user.selectors';

// Define the overall state shape
export interface AppState {
  users: UserState;
}

// Combine reducers
export const reducers: ActionReducerMap<AppState> = {
  users: userReducer,
};

// Export selectors
export { selectAllUsers, selectUsersLoading, selectUsersError };

// Export effects
export { UserEffects };