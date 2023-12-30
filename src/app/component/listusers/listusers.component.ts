import { UserDataService } from './../../service/user-data.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../type/User';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageCors } from '../../type/Message';
import { Task } from '../../type/Task';
import { UserResponse } from '../../type/UserResponse';


@Component({
  selector: 'app-listusers',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './listusers.component.html',
  styleUrl: './listusers.component.css'
})
export class ListusersComponent implements OnInit {

  users : User[] = [];
  userForm !: FormGroup;
  username !: string;
  taskForm !: FormGroup
  constructor(private userData:UserDataService,private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    /*this.userForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      username: ['', Validators.required]
    });*/
    this.taskForm = this.formBuilder.group({
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      status: [''],
      label: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.username = this.userData.getUsername();
  }
  
  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      // Assuming you have a TaskService to handle adding the task
      this.userService.addTask(this.username,task).subscribe({
        next: (reponse : UserResponse) => {
          console.log(reponse);
        },
        error : (err) => {
          console.log(err + "Task not added");
        }
      });
    
    
        // (response) => {
        //   console.log('Task added successfully:', response);
        //   // Add any additional logic (e.g., redirect, notify user)
        // },
        // (error) => {
        //   console.error('Error adding task:', error);
        //   // Handle the error (e.g., display an error message)
        // }
     
    } else {
      console.log('Form is invalid');
    }
  }
  
  deleteUser(userId: number): void {
    this.userService.deleteUserById(userId).subscribe({
      next: () => {
        console.log(`User with ID ${userId} deleted successfully`);
        this.refreshUserList();
      },
      error: (err) => {
        console.log('Error deleting user:', err);
      }
    });
  }
  private refreshUserList(): void {
    this.userService.getall().subscribe({
      next: (value: User[]) => {
        this.users = value;
      },
      error: (err) => {
        console.log("Error refreshing user list: ", err);
      }
    });
  }
  getCors() : void{
    this.userService.getCorsMessage().subscribe({
      next : (value : MessageCors) => {
        console.log(value.message);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }
}
