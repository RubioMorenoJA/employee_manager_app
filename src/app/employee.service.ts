import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from './employee';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl: string = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public getEmployee(employeeId: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.apiServerUrl}/employee/find/${employeeId}`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<String> {
    return this.httpClient.delete<String>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
}
