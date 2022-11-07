import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
export interface students {
  studentName: '';
  class: '';
  percentage: '';
  rollNumber: '';
}
@Component({
  selector: 'app-msc-students',
  templateUrl: './msc-students.component.html',
  styleUrls: ['./msc-students.component.scss'],
})
export class MscStudentsComponent implements OnInit {
  updateButtonVisible: any;
  currentUpdateStudentId: any;
  studentData: any[] = [];
  dataSource: Subject<Object[]> = new BehaviorSubject<Object[]>([]);
  displayedColumns: string[] = [
    'studentName',
    'rollNumber',
    'class',
    'percentage',
    'delete',
  ];

  constructor(private database: DatabaseService, private store: Firestore) {}

  ngOnInit(): void {
    this.updateButtonVisible = false;
    this.database.allDataSubject.subscribe((value) => {
      console.log('called');
      this.dataSource.next(value);
    });
  }

  studentsGroup = new FormGroup({
    studentName: new FormControl('', []),
    rollNumber: new FormControl('', []),
    class: new FormControl('', []),
    percentage: new FormControl('', []),
  });

  addStudents(data: any) {
    if (this.updateButtonVisible) {
      this.database.update(this.currentUpdateStudentId, data);
      this.updateButtonVisible = false;
      this.studentsGroup.reset();
    } else {
      this.database.putData(data);
      this.studentsGroup.reset();
    }
  }
  delete(id: string) {
    this.database.delete(id);
  }

  update(id: string) {
    this.updateButtonVisible = true;
    this.currentUpdateStudentId = id;
    let data: any;
    this.database.fetchParticularStudentData(id).then((value) => {
      data = value;
      this.studentsGroup.patchValue({
        studentName: data.studentName,
        rollNumber: data.rollNumber,
        percentage: data.percentage,
        class: data.class,
      });
    });
  }

  updateClick() {
    this.updateButtonVisible = false;
  }
}
