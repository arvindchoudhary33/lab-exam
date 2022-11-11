import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  updateButtonVisible: any;
  currentUpdateStudentId: any;
  studentData: any[] = [];
  dataSource: Subject<Object[]> = new BehaviorSubject<Object[]>([]);
  displayedColumns: string[] = ['name', 'email', 'address', 'actions'];

  constructor(private database: DatabaseService, private store: Firestore) {}

  ngOnInit(): void {
    this.updateButtonVisible = false;
    this.database.allDataSubject.subscribe((value) => {
      this.dataSource.next(value);
    });
  }

  dataGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  clearForm() {
    console.log('clear');
    this.dataGroup.reset();
    this.dataGroup.get('name')?.setErrors(null);
    this.dataGroup.get('email')?.setErrors(null);
    this.dataGroup.get('address')?.setErrors(null);
    this.dataGroup.invalid;
    // this.dataGroup.clearValidators();
    // this.dataGroup.markAsUntouched();
    // this.dataGroup.markAsPristine();
  }
  addDetails(data: any) {
    if (this.updateButtonVisible) {
      this.database.update(this.currentUpdateStudentId, data);
      this.clearForm();
      this.updateButtonVisible = false;
    } else {
      this.database.putData(data);
      this.clearForm();
    }
  }
  delete(id: string) {
    this.database.delete(id);
  }

  update(id: string) {
    this.updateButtonVisible = true;
    this.currentUpdateStudentId = id;
    let data: any;
    this.database.fetchDataById(id).then((value) => {
      data = value;
      this.dataGroup.patchValue({
        name: data.name,
        email: data.email,
        address: data.address,
      });
    });
  }

  updateClick() {
    this.updateButtonVisible = false;
  }
}
