import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit{
  employees: Employee[] = [];
  constructor(private employeeService: EmployeeService, private router: Router){

  }
  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }
  redirectToAdd(): void {
    this.router.navigate(['/add']);
  }
  deleteEmployee(id:number): void{
    const employee = this.employees.find(x => x.id === id);
    const confirmDelete = confirm("Are you sure want to delete");
    if(confirmDelete)
    {
      this.employees = this.employeeService.deleteEmployee(id);
    }
  }
  editEmployee(id: number): void {
    this.router.navigate(['/edit',id]);
  }
  logEmployee(employee: Employee): string {
    console.log('Employee:', employee);
    return ''; // Return an empty string to avoid displaying anything in the template
  }
  
}
