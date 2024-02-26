import { Injectable } from '@angular/core';
import { Employee, Skill } from './employee.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeData = new BehaviorSubject<any>(null);
  public employeeData$ = this.employeeData.asObservable();

  setEmployeeData(data: any){
    this.employeeData.next(data);
  }

  private employees: Employee[] = [];
  private skills: Skill[] = [];
  constructor() { }

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(x => x.id == id)
  }

  addEmployee(employee: Employee): void {
    if(employee.skills)
    {
    const skillIdGenerator = () => Math.floor(Math.random() * 1000); // Example skill ID generator

  for (let i = 0; i < employee.skills.length; i++) {
    const skill = employee.skills[i];
    skill.id = skillIdGenerator();
  }
    this.employees.push(employee);
  }
}

  deleteEmployee(id: number): Employee[] {
    return this.employees = this.employees.filter(x => x.id !== id);
  }


  editEmployee(employeeId: number, updatedEmployee: Employee): void {
    const index = this.employees.findIndex(x => x.id == employeeId);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }
  addSkill(skill: Skill): void {
    skill.id = Math.floor(Math.random() * 1000);
    this.skills.push(skill);
  }

  deleteSkill (id: number): void {
    this.skills.filter( x => x.id !== id);
  }

  }
