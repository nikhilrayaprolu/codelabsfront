import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import 'rxjs/add/observable/interval';
import {EvaluateService} from "../../services/evaluate.service";
declare var WIDE: any;
declare var Terminal: any;
declare var attach: any;
declare var fit: any;

@Component({
  selector: 'ngx-courses',
  styleUrls: ['./courses.component.scss'],
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnDestroy {
  list_of_courses = [];
  student_count = 0;
  temporary_containers = 0;
  course_count = 0;
  constructor(private themeService: NbThemeService, private evaluateservice: EvaluateService) {
    this.evaluateservice.getcourses().subscribe((result: any) => {
      this.list_of_courses = result.list_of_courses;
      this.student_count = result.student_count;
      this.temporary_containers = result.temporary_containers
      this.course_count = result.course_count;
    })
  }
  ngOnDestroy(): void {
  }
}
