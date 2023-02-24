import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Observable } from "rxjs";

const USERNAME = "username";
const PASSWORD = "password";
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }
  //  apiKey
  public heroesUrl = 'https://api.openweathermap.org/data/2.5/forecast?mode=json&lang=vi&appid=a20d637d18b631166acb9619322539e9';
  public tinhThanhUrl = 'https://provinces.open-api.vn/api/'
  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveUser(username: string, password: string): void {
    window.sessionStorage.removeItem(USERNAME);
    window.sessionStorage.setItem(USERNAME, username);
    window.sessionStorage.removeItem(PASSWORD);
    window.sessionStorage.setItem(PASSWORD, password);
  }

  public getUser(): any {
    const username = window.sessionStorage.getItem(USERNAME);
    const password = window.sessionStorage.getItem(PASSWORD);
    return { username: username, password: password }
  }

  public isLogin(): boolean {
    const username = window.sessionStorage.getItem(USERNAME);
    const password = window.sessionStorage.getItem(PASSWORD);
    if (username == undefined || password == undefined) {
      return false;
    }
    return true;
  }
  getApiMap(data: any): Observable<any[]> {
    let headers = new HttpHeaders()
    headers = headers.append('content-type', 'application/json')
    const httpParams: HttpParamsOptions = { fromObject: data } as HttpParamsOptions;
    const options = { params: new HttpParams(httpParams) };
    // let httpOptions = {
    //   headers: new HttpHeaders(
    //     {
    //       'Access-Control-Allow-Origin': '*',
    //       'Content-Type': 'application/json',
    //       'Authorization': `a20d637d18b631166acb9619322539e9`,
    //     })
    // };
    // const headerDict = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    // }

    // const requestOptions = {                                                                                                                                                                                 
    //   headers: new Headers(headerDict), 
    // };

    return this.http.get<any[]>(this.heroesUrl, options)
  }
  getTinhThanh() {
    return this.http.get<any[]>(this.tinhThanhUrl)
  }
}