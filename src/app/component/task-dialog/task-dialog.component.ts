import { UserService } from './../../service/user.service';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from '../../type/Task';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css'
})
export class TaskDialogComponent {

  @Input() task!: Task;
  @Input() username !: string;
  taskForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private userService: UserService) {
    this.taskForm = this.fb.group({
      date_debut: [null, Validators.required],
      date_fin: [null, Validators.required],
      status: [null, Validators.required],
      label: [null, Validators.required],
      description: [null, Validators.required],
    });
  }

  updateTask(idtask: number | undefined, editedTask: Task) {

    if(idtask !== undefined){
      this.userService.updateUserTask(this.username, idtask, editedTask).subscribe({
        next: (res: Task) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }else{
      alert("Task ID undefined you cannot updated it");
    }
  }
  saveChanges() {
    if (this.taskForm.valid) {
      const editedTask: Task = this.taskForm.value;
      this.updateTask(this.task.id, editedTask);
      this.activeModal.close('Save changes');
    } else {
      console.log('Form is invalid');
    }
  }
}

