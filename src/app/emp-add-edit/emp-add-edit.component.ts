import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
  ) {

    this.empForm = this.fb.group({

      FirstnameFeild: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      LastnameFeild: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      emailFeild: ['', [Validators.required, Validators.email]],
      dateFeild: ['', Validators.required],
      genderFeild: ['', Validators.required],
      educationFeild: ['', Validators.required],
      companyFeild: ['', Validators.required],
      experienceFeild: ['', Validators.required],
      packageFeild: ['', Validators.required]

    });
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.data) {
      this.empService.updateEmployee(this.data.id, this.empForm.value).subscribe({
        next: (val: any) => {   //if we get ok response from API then this method will call
          this.coreService.openSnackBar('Employee Updated..', 'done');
          this.dialogRef.close(true); // to close the modal

        },
        error: (err: any) => {  //otherwise this error method gets called.
          console.log(err);
        }
      })
    } else {

      this.empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {   //if we get ok response from API then this method will call
          this.coreService.openSnackBar('Employee Added Successfully..', 'done');
          this.dialogRef.close(true); // to close the modal

        },
        error: (err: any) => {  //otherwise this error method gets called.
          console.log(err);
        }
      })
    }
  }
}
