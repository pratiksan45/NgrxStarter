import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.models';
import { loadUsers, updateUser } from '../../store/actions/user.actions';
import { selectAllUsers, selectUsersLoading, selectUsersError } from '../../store/selectors/user.selectors';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  editForm: FormGroup;
  editingUser: User | null = null;

  constructor(private store: Store, private fb: FormBuilder) {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUsersLoading);
    this.error$ = this.store.select(selectUsersError);

    this.editForm = this.fb.group({
      name: [''],
      username: [''],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  /**   * 
   * @param user 
   * Edit user flow - Dispatch an action for editing state
   */
  onEditUser(user: User): void {
    
    console.log(user)
    if(this.editingUser?.id === user.id){
      this.editingUser = null;
    } else {
      this.editingUser = user
      this.name?.setValue(user.name);
      this.username?.setValue(user.username)
      this.email?.setValue(user.email)
    }
  }

  /**   * 
   * @param user 
   * function to merge form data with user data and dispath the updated user action
   */
  saveUser(user: User): void {
    if(this.editForm.valid && this.editingUser){
    const updatedUser = { ...user, ...this.editForm.value }; 
    this.editingUser = null;
    this.store.dispatch(updateUser({ user: updatedUser })); // 
    // this.store.dispatch(loadUsers());
    }
  }

  get name(): AbstractControl | null{
    return this.editForm.get('name')!;
  }

  get username(): AbstractControl| null {
    return this.editForm.get('username')!;
  }

  get email(): AbstractControl | null{
    return this.editForm.get('email')!;
  }


}