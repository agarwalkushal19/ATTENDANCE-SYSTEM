import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-list-class',
  templateUrl: './list-class.component.html',
  styleUrls: ['./list-class.component.css']
})
export class ListClassComponent {
  constructor(private _classService: ClassService, private _router:Router, private _teacherService:TeacherService){}
  classes : any[] = [];
  teachers: any[] = [];
  isTeacher = false;
  routeToAddClass(){
    this._router.navigateByUrl("class/add-class");
  }
  getTecherNameByEmail(email:string){
    let teacher:any = this.teachers.filter(teacher => teacher.email === email);
    if(teacher.length){
      return teacher[0].name;
    }else {
      return "";
    }
  }
  routeToAttendance(id:string){
    this._router.navigateByUrl('class/attendance/' + id);
  }
  ngOnInit(){
    if(localStorage.getItem('role') === 'teacher'){
      this.isTeacher = true;
    }else {
      this.isTeacher = false;
    }
    this._classService.getClasses().subscribe((classesRes: any) => {
      this.classes = classesRes.classes;
      this._teacherService.getTeacher().subscribe((teacherRes:any) => {
        this.teachers = teacherRes.teachers;
        this.classes.forEach(item => {
          item.teacherName = this.getTecherNameByEmail(item.teacher);
        })
      })
    })


  }
}
