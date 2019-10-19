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
  track = null;
  challenges = null;
  showchallenges = 0;
  currentchallenge = -1;
  iframeelement = null;
  server_editor_port = 3000;
  server_editor_url = null;
  container_hostname = '.example.com'
  server_terminal_url = null;
  server_terminal_port = 80;
  server_ping = null;
  // use only in development
  // server_editor_url = 'http://localhost:3000';
  // server_terminal_url = 'http://localhost:3000';
  constructor(private themeService: NbThemeService, private trackslistservice: TrackslistService,
              private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    const trackid = this.route.snapshot.paramMap.get("trackid");
    const courseid = this.route.snapshot.paramMap.get("courseid");
    const studentid = this.route.snapshot.paramMap.get("studentid");
    this.trackid = trackid;
    this.runtrack(trackid, courseid, studentid)
  }
  runtrack(trackid, courseid, studentid) {
    this.trackslistservice.runtrack(trackid, courseid, studentid).subscribe((result: any) => {
      this.track = result.track;
      this.challenges = result.challenges;
      this.server_editor_url = 'http://' + result.container_data.container_id.slice(0, 10) + '-' +
        this.server_editor_port + this.container_hostname;
      this.server_terminal_url = result.container_data.container_id.slice(0, 10) + '-' +
        this.server_terminal_port + this.container_hostname + '/shell';
      setTimeout(() => {
        WIDE.init(this.server_editor_url);
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
  startiframe() {
    const urlforiframe = "http://test-3003.example.com/?token=64daf64b27146db8e64fa6d0c73550591c6fd5632dc54cba";
    this.iframeelement = this.sanitizer.bypassSecurityTrustHtml(`<iframe class="iframe_code" src="${urlforiframe}"></iframe>`);
  }
  ngOnDestroy() {
  }
}
