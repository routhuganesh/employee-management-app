import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Skill } from '../employee.model';
import { TrackByFunction } from '@angular/core';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  employeeForm!: FormGroup;
  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router){

  }
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['',Validators.required],
      skills: this.fb.array([
        this.fb.group({
          skill: [''],
          experience: [''],
        })
      ]),
    });
  }
  
  onSubmit(): void {
    if(this.employeeForm.valid){
      const employee = this.employeeForm.value;
      console.log(this.employeeForm.value);
      this.employeeService.addEmployee(employee);
      this.router.navigate(['']);
    }
  }

  get skillsAndExpForms() {
    return this.employeeForm.get('skills') as FormArray;
  }

  addSkill() {
    const skills = this.fb.group({
      skill: ['', Validators.required],
      experience: ['', Validators.required],
    });

    this.skillsAndExpForms.push(skills);
  }

  deleteSkill(index: number): void {
    this.skillsAndExpForms.removeAt(index);
  }
  
  
}
