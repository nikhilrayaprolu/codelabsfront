import {Component, OnDestroy} from '@angular/core';
import 'rxjs/add/observable/interval';
import {NbThemeService} from "@nebular/theme";
import {EvaluateService} from "../../services/evaluate.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EvaluationdataService} from "../../services/evaluationdata.service";
declare var WIDE: any;

@Component({
  selector: 'ngx-evalsubmission',
  styleUrls: ['./evalsubmission.component.scss'],
  templateUrl: './evalsubmission.component.html',
})
export class EvalsubmissionComponent implements OnDestroy {
  trackid = null;
  courseid = null;
  studentid = null;
  serial_number = null;
  submitted_assignments = [];
  grade = 0;
  evaluation_server_host = 'http://localhost:3000';
  server_editor_url = '';
  constructor(private themeService: NbThemeService, private evaluateservice: EvaluateService,
              private route: ActivatedRoute, private evaluationdata: EvaluationdataService, private router: Router) {
    this.trackid = this.route.snapshot.paramMap.get("trackid");
    this.courseid = this.route.snapshot.paramMap.get("courseid");
    this.studentid = this.route.snapshot.paramMap.get("studentid");
    this.serial_number = this.route.snapshot.paramMap.get("serial_number");
    this.evaluationdata.current_assignments.subscribe(assignment => this.submitted_assignments = assignment);
    this.server_editor_url = this.evaluation_server_host + '/' + this.trackid +
      '/' + this.courseid + '/' + this.studentid;
    setTimeout(() => {
      WIDE.init(this.server_editor_url, "evaluate");
    }, 3000);
  }
  nextsubmission() {
    if (this.serial_number < this.submitted_assignments.length - 1) {
      const studentid = this.submitted_assignments[this.serial_number + 1];
      this.router.navigate(['/evalsubmission/', this.trackid, this.courseid, studentid, this.serial_number + 1]);
    }
  }
  previoussubmission() {
    if (this.serial_number > 0) {
      const studentid = this.submitted_assignments[this.serial_number - 1];
      this.router.navigate(['/evalsubmission/', this.trackid, this.courseid, studentid, this.serial_number - 1]);
    }
  }
  gradesubmission() {
    this.evaluateservice.gradesubmission(this.submitted_assignments[this.serial_number].id, this.grade)
      .subscribe((result: any) => {
      console.log(result);
    })
  }
  runcode() {
    let laburl = '/pages/labrun/' + this.trackid + '/' + this.courseid + '/' + this.studentid + '/instructor/'
    window.open(laburl, "_blank");
  }
  ngOnDestroy() {
  }
}
