import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from './employee';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public selectedEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee | null, mode: string) {    
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type='button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    switch(mode) {
      case 'add':
        button.setAttribute('data-target', '#addEmployeeModal');
        break;
      case 'edit':
        this.selectedEmployee = employee;
        button.setAttribute('data-target', '#editEmployeeModal');        
        break;
      case 'delete':
        this.selectedEmployee = employee;
        button.setAttribute('data-target', '#deleteEmployeeModal');
        break;
      default:
        break;        
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddEmployee(addForm: NgForm): void {    
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEditEmployee(employee: Employee): void {
    document.getElementById('edit-employee-form')?.click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number | undefined): void {
    document.getElementById('delete-employee-form')?.click();
    if (typeof employeeId === "number") {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        (response: String) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    } else {
      console.log("Unable to get employee id");
    }
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (this.employees.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
