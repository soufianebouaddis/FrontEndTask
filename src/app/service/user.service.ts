import { LoginRequest } from './../type/LoginRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../type/User';
import { MessageCors } from '../type/Message';
import { LoginResponse } from '../type/LoginReponse';
import { Task } from '../type/Task';
import { UserResponse } from '../type/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private refreshTokenKey = '';
  constructor(private http:HttpClient) { }

  public getall() : Observable<User[]>{
    return this.http.get<User[]>("http://localhost:9090/api/users/userslist");
  }
  addUser(newUser: User): Observable<User> {
    return this.http.post<User>("http://localhost:8081/USER-SERVICES/api/users/register", newUser);
  }
  deleteUserById(userId: number): Observable<any> {
    const url = `http://localhost:9090/api/users/user/${userId}`;
    return this.http.delete(url);
  }

  getCorsMessage() : Observable<MessageCors> {
    return this.http.get<MessageCors>("http://localhost:8081/USER-SERVICES/api/users/cors");
  }
  authenticate(auth : LoginRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse>("http://localhost:8081/USER-SERVICES/api/users/login", auth)
    .pipe(
      tap(response => {
        if (response.refreshToken) {
          localStorage.setItem(this.refreshTokenKey, response.refreshToken);
        }
      })
    );
  }
  addTask(username : string , task : Task):Observable<UserResponse>{
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${refreshToken}`
    });
    return this.http.post<UserResponse>(`http://localhost:8081/USER-SERVICES/api/users/${username}`,task,{ headers });
  }
}
