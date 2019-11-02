import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
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
export class EvalsubmissionComponent implements AfterViewInit {
  trackid = null;
  courseid = null;
  studentid = null;
  serial_number = null;
  submitted_assignments = [];
  grade = 0;
  evaluation_server_host = 'http://localhost:3000';
  server_editor_url = '';
  constructor(private themeService: NbThemeService, private evaluateservice: EvaluateService,
              private route: ActivatedRoute, private evaluationdata: EvaluationdataService,
              private router: Router) {
    this.trackid = this.route.snapshot.paramMap.get("trackid");
    this.courseid = this.route.snapshot.paramMap.get("courseid");
    this.studentid = this.route.snapshot.paramMap.get("studentid");
    this.serial_number = this.route.snapshot.paramMap.get("serial_number");
    this.evaluationdata.current_assignments.subscribe(assignment => {
      this.submitted_assignments = assignment;
      if (!this.submitted_assignments.length) {
        this.evaluateservice.getcoursetrack(this.courseid, this.trackid).subscribe((result: any) => {
          this.evaluationdata.changeassignments(result.list_of_submissions);

        })
      }
      console.log(this.submitted_assignments);
    });
    this.server_editor_url = this.evaluation_server_host + '/' + this.trackid +
      '/' + this.courseid + '/' + this.studentid;
  }
  nextsubmission() {
    if (this.serial_number < this.submitted_assignments.length - 1) {
      console.log(this.submitted_assignments);
      console.log(this.serial_number + 1)
      const studentid = this.submitted_assignments[+this.serial_number + 1].student_id;
      console.log(studentid);
      this.router.navigate(['/pages/evalsubmission/', this.trackid, this.courseid, studentid, +this.serial_number + 1]);
      this.studentid = studentid;
      this.serial_number = this.serial_number + 1;
      this.server_editor_url = this.evaluation_server_host + '/' + this.trackid +
        '/' + this.courseid + '/' + this.studentid;
      this.loadScript();
      setTimeout(() => {
        WIDE.init(this.server_editor_url, "evaluate");
      }, 3000);
    }
  }
  previoussubmission() {
    if (this.serial_number > 0) {
      const studentid = this.submitted_assignments[+this.serial_number - 1].student_id;
      console.log(studentid);
      this.router.navigate(['/pages/evalsubmission/', this.trackid, this.courseid, studentid, +this.serial_number - 1]);
      this.studentid = studentid;
      this.serial_number = this.serial_number - 1;
      this.server_editor_url = this.evaluation_server_host + '/' + this.trackid +
        '/' + this.courseid + '/' + this.studentid;
      this.loadScript();
      setTimeout(() => {
        WIDE.init(this.server_editor_url, "evaluate");
      }, 3000);
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
  public loadScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = './assets/js/code.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  ngAfterViewInit(): void {
    this.loadScript();
    setTimeout(() => {
      WIDE.init(this.server_editor_url, "evaluate");
    }, 3000);
  }
}
