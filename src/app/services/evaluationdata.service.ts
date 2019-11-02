import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EvaluationdataService {

  private submitted_assignment = new BehaviorSubject<any>([]);
  current_assignments = this.submitted_assignment.asObservable();

  constructor() { }

  changeassignments(new_assignments: any) {
    this.submitted_assignment.next(new_assignments);
    console.log(this.submitted_assignment);
    console.log(this.current_assignments);
  }
}
