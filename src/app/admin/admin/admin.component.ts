import {Component, OnInit} from '@angular/core';
import {LessonsService} from '../../shared/service/lessons.service';
import {Lessons} from '../../shared/model/Lessons.model';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Params} from '../../shared/model/Params.model';
import {Status} from '../../shared/model/Status.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss', './admin.adaptive.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class AdminComponent implements OnInit {

  lessons: Lessons;
  arrayLessons = Array();
  id: number;
  isStatusSuccess = false;
  isStatusError: boolean;

  /**
   *  for validation.
   * ***/
  homeWorkForm: FormGroup;

  /**
   *  show error validation message.
   * **/
  isSubmitted = false;

  constructor(private lessonsService: LessonsService,
              private modalService: NgbModal,
              private fb: FormBuilder) {

  }

  ngOnInit() {
    this.createFormGroup();
    this.getLessons();
  }

  getLessons() {
    this.lessonsService.getLessons().subscribe((data: Lessons) => {
      this.lessons = data;

      for (let i = 0; i < Object.keys(data).length; i++) {
        this.arrayLessons.push(data[i]);
      }

    });
  }


  /***
   *  Form Group for validation
   * **/

  createFormGroup() {
    return this.homeWorkForm = this.fb.group({
      name: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      end_date: ['', [Validators.required]],
      text: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  /***
   *  FormGroup controls
   * ***/

  public get f() {
    return this.homeWorkForm.controls;
  }

  /**
   *  reset password form
   * **/

  revert() {
    this.homeWorkForm.reset();
  }

  /**
   * open modal view
   * **/
  openModalViewHomeWork(view) {
    this.modalService.open(view);
  }

  submitHomeWorkSave() {
    this.isSubmitted = true;

    if (this.homeWorkForm.invalid) {
      console.log(this.homeWorkForm.invalid);
      return;
    }

    for (let i = 0; i < Object.keys(this.arrayLessons).length; i++) {
      if (this.f.name.value === this.arrayLessons[i]['name']) {
        this.id = this.arrayLessons[i]['id'];
      }
    }

    const homeWork = new Params(this.id,
      this.f.end_date.value.toISOString().slice(0, 10),
      this.f.text.value);
    console.log(homeWork);
    this.lessonsService.createHomework(homeWork).subscribe((data: Status) => {

      if (data.status === 'ok') {
        this.isStatusSuccess = true;
        this.modalService.dismissAll(1);
      }
    }, error => {
      this.isStatusError = true;
    });

  }
}
