import {Component, OnDestroy} from '@angular/core';
import 'rxjs/add/observable/interval';
import {NbThemeService} from "@nebular/theme";
import {EvaluateService} from "../../services/evaluate.service";
import {ActivatedRoute} from "@angular/router";
import {EvaluationdataService} from "../../services/evaluationdata.service";

@Component({
  selector: 'ngx-coursetrack',
  styleUrls: ['./coursetrack.component.scss'],
  templateUrl: './coursetrack.component.html',
})
export class CoursetrackComponent implements OnDestroy {
  courseid = null;
  trackid = null;
  list_of_submissions = [];
  total_number_of_students = 0;
  total_number_of_submissions = 0;

  constructor(private themeService: NbThemeService, private evaluateservice: EvaluateService,
              private route: ActivatedRoute, private evaluationdata: EvaluationdataService) {
    this.courseid = this.route.snapshot.paramMap.get("courseid")
    this.trackid = this.route.snapshot.paramMap.get("trackid")
    this.evaluateservice.getcoursetrack(this.courseid, this.trackid).subscribe((result: any) => {
      this.list_of_submissions = result.list_of_submissions;
      this.total_number_of_students = result.total_number_of_students;
      this.total_number_of_submissions = result.total_number_of_submissions;
      this.evaluationdata.changeassignments(this.list_of_submissions);

    })
  }
  ngOnDestroy() {
  }
}
