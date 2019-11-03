import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NewlabService} from "../../services/newlab.service";


@Component({
  selector: 'ngx-labnew',
  styleUrls: ['./labnew.component.scss'],
  templateUrl: './labnew.component.html',
})
export class LabnewComponent implements OnDestroy {
  public Editor = ClassicEditor;
  monacoeditor = {theme: 'vs-dark', language: 'shell'};
  monacocode: string = '';
  profile: any = {};
  tracks = [];
  newlab = {
    topic: '',
    tags: '',
    timelimit: {hour: 13, minute: 30},
    tracks: this.tracks
  };
  newtrack = {
    title: '',
    description: '',
    image: '',
    container: '',
    installscript: '',
    configscript: '',
    scenario: '',
    labtype: 'new',
    colablink: '',
    scenario_data: {
      home_directory: '',
      port: '',
    },
    challenges: []
  };
  newchallenge = {
    title: '',
    notes: '',
    setupscript: '',
    checkscript: '',
    cleanscript: '',
    challenge_position: 0,
  };
  constructor(private themeService: NbThemeService, private newlabservice: NewlabService) {
  }
  cloneobject(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
  addNewTrack() {
    this.tracks.push(this.cloneobject(this.newtrack));
  }
  addNewChallenge(track) {
    console.log(track)
    const challenge_position = track.challenges.length
    let new_challenge = this.cloneobject(this.newchallenge)
    new_challenge['challenge_position'] = challenge_position;
    track.challenges.push(new_challenge);
  }
  removeNewChallenge(track) {
    track.challenges.pop()
  }
  removeNewTrack() {
    this.tracks.pop()
  }
  saveimageconfig() {
    this.newlabservice.savelab(this.newtrack).subscribe((result: any) => {
      console.log(result);
    })
  }
  saveandbuildimage() {

  }

  ngOnDestroy() {
  }
}
