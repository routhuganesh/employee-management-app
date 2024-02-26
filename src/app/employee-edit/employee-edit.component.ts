import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  employeeId!: number;
  employee: any = {};
  employeeForm!: FormGroup;
  constructor(private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder,
    private employeeService: EmployeeService) {
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = params['id'];
      // Retrieve the employee details from the service
      this.employee = this.employeeService.getEmployeeById(this.employeeId);
      this.initForm(this.employee);
    });

  }
  initForm(employee: any) {
    this.employeeForm = this.fb.group({
      id: [employee.id, Validators.required],
      name: [employee.name, Validators.required],
      contactNumber: [employee.contactNumber, Validators.required],
      email: [employee.email, [Validators.required, Validators.email]],
      gender: [employee.gender, Validators.required],
      skills: this.fb.array([]) // You may need to populate this array with existing skills data
    });

    if (employee.skills && employee.skills.length > 0) {
      employee.skills.forEach((skill: any) => {
        this.addSkill(skill);
      });
    }
    

  }
  get skillsAndExpForms() {
    return this.employeeForm.get('skills') as FormArray;
  }
  addSkill(skillData?: any) {
    const skillFormGroup = this.fb.group({
      skill: [skillData ? skillData.skill : '', Validators.required],
      experience: [skillData ? skillData.experience : '',Validators.required]
    });

    (this.employeeForm.get('skills') as FormArray).push(skillFormGroup);
  }

  deleteSkill(index: number) {
    (this.employeeForm.get('skills') as FormArray).removeAt(index);
  }

  onSubmit() {
    console.log(this.employeeForm.value);
    this.employee = this.employeeForm.value;
    this.employee.id = this.employeeId;
    this.employeeService.editEmployee(this.employeeId,this.employee);
    this.router.navigate(['']);
  }
}
