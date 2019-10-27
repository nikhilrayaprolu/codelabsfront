import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {NewlabService} from "../../services/newlab.service";
import {TrackslistService} from "../../services/trackslist.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import 'rxjs/add/observable/interval';
import {Observable } from 'rxjs';
declare var WIDE: any;
declare var Terminal: any;
declare var attach: any;
declare var fit: any;

@Component({
  selector: 'ngx-labrun',
  styleUrls: ['./labrun.component.scss'],
  templateUrl: './labrun.component.html',
})
export class LabrunComponent implements OnDestroy {
  porttoconnect = '';
  trackid = null;
  courseid = null;
  studentid = null;
  containerid = null;
  submitted = false;
  track = null;
  challenges = null;
  showchallenges = 0;
  showeditor = false;
  showterminal = true;
  inlineiframe = false;
  currentchallenge = -1;
  iframeelement = null;
  server_editor_port = 3000;
  server_editor_url = null;
  container_hostname = '.example.com';
  server_terminal_url = null;
  server_terminal_port = 80;
  server_ping = null;
  iframe_tabs = [];
  instructor = false;
  // use only in development
  // server_editor_url = 'http://localhost:3000';
  // server_terminal_url = 'http://localhost:3000';
  constructor(private themeService: NbThemeService, private trackslistservice: TrackslistService,
              private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    const trackid = this.route.snapshot.paramMap.get("trackid");
    const courseid = this.route.snapshot.paramMap.get("courseid");
    const studentid = this.route.snapshot.paramMap.get("studentid");
    const instructor = this.route.snapshot.paramMap.get("instructor");
    this.trackid = trackid;
    this.courseid = courseid;
    this.studentid = studentid;
    if (instructor) {
      this.instructor = true;
    }
    this.runtrack(trackid, courseid, studentid)
  }
  runtrack(trackid, courseid, studentid) {
    this.trackslistservice.runtrack(trackid, courseid, studentid, this.instructor).subscribe((result: any) => {
      this.submitted = result.submitted;
      this.track = result.track;
      this.challenges = result.challenges;
      this.containerid = result.container_data.container_id;
      this.server_editor_url = 'http://' + result.container_data.container_id.slice(0, 10) + '-' +
        this.server_editor_port + this.container_hostname;
      this.server_terminal_url = result.container_data.container_id.slice(0, 10) + '-' +
        this.server_terminal_port + this.container_hostname + '/shell';
      if (this.track.scenario === 'editor-terminal' || this.track.scenario === 'iframe-editor-terminal') {
        this.showeditor = true;
      }
      if (this.track.scenario === 'iframe-editor') {
        this.showterminal = false;
        this.inlineiframe = true;
      }
      if (this.track.scenario === 'iframe-terminal' || this.track.scenario === 'iframe-editor-terminal') {
        const urlforiframe = 'http://' + this.containerid.slice(0, 10) + '-' +
          this.track.scenario_data.port + this.container_hostname;
        const new_iframe = {
          'address': urlforiframe,
          'port': this.track.scenario_data.port
        }
        this.iframe_tabs = [new_iframe];
      }
      if (this.track.scenario === 'iframe-editor') {
        const urlforiframe = 'http://' + this.containerid.slice(0, 10) + '-' +
          this.track.scenario_data.port + this.container_hostname;
        this.iframeelement = urlforiframe;
      }
      setTimeout(() => {
        if (this.showeditor) {
          WIDE.init(this.server_editor_url);
        }
        if (this.showterminal) {
          this.startterminal();
        }
      }, 3000);
      if (this.server_ping) {
        this.server_ping.unsubscribe()
      }
      this.server_ping = Observable.interval(300000)
        .subscribe((val) => {
          this.trackslistservice.keepcontaineralive(result.container_data.container_id).subscribe((resp: any) => {
            if (!resp.container_exists) {
                this.runtrack(trackid, courseid, studentid);
            }
          });
        });
  });
  }
  startterminal() {
    console.log("came here")
    Terminal.applyAddon(attach);
    Terminal.applyAddon(fit);
    // The terminal
    const term = new Terminal();
    // No idea what this does
    // This kinda makes sense
    const termcontainer = document.getElementById('terminal');
    term.open(termcontainer);
    // Open the websocket connection to the backend
    const termprotocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    const termport = ':80';
    const socketUrl = `${termprotocol}${this.server_terminal_url}`;
    const socket = new WebSocket(socketUrl);
    // Attach the socket to the terminal
    socket.onopen = (ev) => { term.attach(socket); };
    socket.onerror = (ev) => { this.runtrack(this.trackid, this.courseid, this.studentid)};
    // Not going to worry about close/error for the websocket
  }

  nextchallenge() {
    if (this.currentchallenge < this.challenges.length-1)
    {
      if (this.showchallenges == 0) {
        this.showchallenges = 1;
        //a hacky fix to be removed in later stages
        setTimeout(()=> {    //<<<---    using ()=> syntax
          this.startterminal();
        }, 3000);
      }
      this.currentchallenge += 1;
      //this.startterminal();
    }
  }
  previouschallenge() {
    if (this.currentchallenge > 0)
      this.currentchallenge -= 1
    if (this.currentchallenge == 0) {
      this.showchallenges = 0;
      this.currentchallenge = -1;
    }
  }
  submitlab() {
    this.trackslistservice.submitlab(this.trackid, this.courseid, this.studentid).subscribe((result: any) => {
      console.log(result);
      this.submitted = result.submitted;

    })
  }
  startiframe(port) {
    this.trackslistservice.startiframe(this.containerid, port).subscribe((result: any) => {
      if (result.success) {
        const urlforiframe = 'http://' + this.containerid.slice(0, 10) + '-' +
          port + this.container_hostname;
        this.iframeelement = this.sanitizer
          .bypassSecurityTrustHtml(`<iframe class="iframe_code" src="${urlforiframe}"></iframe>`);
        const new_iframe = {
          'address': urlforiframe,
          'port': port
        }
        this.iframe_tabs.push(new_iframe);
      }
    })
  }

  snapshotcontainer() {
    this.trackslistservice.snapshotcontainer(this.containerid, this.trackid).subscribe((result: any) => {
      console.log(result);
      this.submitted = result.submitted;

    })
  }
  ngOnDestroy() {
  }
}
