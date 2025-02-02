import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.models';

export const loadUsers = createAction('[User] load users');
export const loadUsersSuccess = createAction('[User] load users successfully', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User] load users failed', props<{ error: string }>()); // New

export const updateUser = createAction('[User] update users', props<{ user: User }>());
export const updateUserSuccess = createAction('[User] updated users successfully', props<{ user: User }>());
