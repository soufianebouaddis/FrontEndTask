import { UserDataService } from './../../service/user-data.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../type/User';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageCors } from '../../type/Message';
import { Task } from '../../type/Task';
import { UserResponse } from '../../type/UserResponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';


@Component({
  selector: 'app-listusers',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './listusers.component.html',
  styleUrl: './listusers.component.css'
})
export class ListusersComponent implements OnInit {
  

  authenticated_user !: UserResponse;
  authenticatedUserTasks !: Task[];
  userForm !: FormGroup;
  username !: string;
  taskForm !: FormGroup
  constructor(private userData: UserDataService, private formBuilder: FormBuilder, private userService: UserService,private modalService: NgbModal) { }

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
    this.getUserAuth();
  }
  getUserAuth() {
    this.userService.getUserbyUsername(this.username).subscribe({
      next: (user: UserResponse) => {
        this.authenticatedUserTasks = user.tasks;
        this.authenticated_user = user;
        console.log(this.authenticated_user);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      // Assuming you have a TaskService to handle adding the task
      task.status="NOTYET";
      this.userService.addTask(this.username, task).subscribe({
        next: (reponse: UserResponse) => {
          console.log(reponse);
        },
        error: (err) => {
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

  deleteTask(idtask : number | undefined){
    if(idtask !== undefined){
      this.userService.deleteUserTask(this.username,idtask).subscribe({
        next:(res : string)=>{
          console.log("task deleted");
        },
        error:(err) => {
          console.log(err);
        }
      })
    }else{
      alert('Task ID is undefined');
    }
  }
  
  openDialog(username:string,task: Task): void {
    const modalRef = this.modalService.open(TaskDialogComponent, { size: 'lg' });
    modalRef.componentInstance.task = task;
    modalRef.componentInstance.username = username;
  }
  /*deleteUser(userId: number): void {
    this.userService.deleteUserById(userId).subscribe({
      next: () => {
        console.log(`User with ID ${userId} deleted successfully`);
        this.refreshUserList();
      },
      error: (err) => {
        console.log('Error deleting user:', err);
      }
    });
  }*/
  /*private refreshUserList(): void {
    this.userService.getall().subscribe({
      next: (value: User[]) => {
        this.users = value;
      },
      error: (err) => {
        console.log("Error refreshing user list: ", err);
      }
    });
  }*/
  /*getCors() : void{
    this.userService.getCorsMessage().subscribe({
      next : (value : MessageCors) => {
        console.log(value.message);
      },
      error : (err) => {
        console.log(err);
      }
    })
  }*/

}
