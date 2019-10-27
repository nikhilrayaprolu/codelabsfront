import {Component, OnDestroy} from '@angular/core';
import 'rxjs/add/observable/interval';
import {NbThemeService} from "@nebular/theme";
import {EvaluateService} from "../../services/evaluate.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ngx-courseview',
  styleUrls: ['./courseview.component.scss'],
  templateUrl: './courseview.component.html',
})
export class CourseviewComponent implements OnDestroy {
  courseid = null;
  list_of_tracks = [];
  number_of_tracks = 0;
  constructor(private themeService: NbThemeService, private evaluateservice: EvaluateService,
              private route: ActivatedRoute) {
    this.courseid = this.route.snapshot.paramMap.get("courseid")
    this.evaluateservice.getcourseview(this.courseid).subscribe((result: any) => {
      this.list_of_tracks = result.list_of_tracks;
      this.number_of_tracks = result.number_of_tracks;
    })
  }
  ngOnDestroy() {
  }
}
