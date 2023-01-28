import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private _http: HttpClient) { }

  getClasses(){
    return this._http.get(environment.baseURL + 'class');
  }
  getClasseById(id:string){
    return this._http.get(environment.baseURL + 'class/' + id);
  }
  addClass(classInfo: any){
    return this._http.post(environment.baseURL + 'class', classInfo);
  }
  takeAttendance(attendanceDetails:any){
    return this._http.post(environment.baseURL + 'class/attendance', attendanceDetails);
  }
  getAttendanceReportByDate(className:string, date:string){
    console.log(date);
    return this._http.get(environment.baseURL + 'class/attendance/'+date + '/' + className);
  }
}
