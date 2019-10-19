import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {TrackslistService} from "../../services/trackslist.service";
import {ActivatedRoute} from "@angular/router";

declare var Terminal: any;
declare var attach: any;
declare var fit: any;


@Component({
  selector: 'ngx-labrun',
  styleUrls: ['./edittrack.component.scss'],
  templateUrl: './edittrack.component.html',
})
export class EdittrackComponent implements OnInit {
  server_hostname = 'localhost'
  public Editor = ClassicEditor;
  monacoeditor = {theme: 'vs-dark', language: 'shell'};
  monacocode: string = '';
  profile: any = {};
  trackid = null;
  track = {
    title: '',
    description: '',
    image: '',
    container: '',
    installscript: '',
    configscript: '',
    scenario: '',
    scenario_data: {
      home_directory: '',
      port: '',
    },
    public: false,
    challenges: []
  };

  constructor(private themeService: NbThemeService, private trackslistservice: TrackslistService,
              private route: ActivatedRoute) {
    const trackid = this.route.snapshot.paramMap.get("trackid")
    this.trackid = trackid
    this.trackslistservice.gettrack(trackid).subscribe((result: any) => {
      this.track = result.track;
    })

  }

  updatetrack() {
    this.trackslistservice.updatetrack(this.trackid, this.track).subscribe((result:any) => {
      console.log(result);
    })
  }
  deletetrack() {
    this.trackslistservice.deletetrack(this.trackid).subscribe((result: any) => {
      console.log(result);
    })
  }
  buildtrack() {
    this.trackslistservice.buildtrack(this.trackid).subscribe((result: any) => {
      console.log(result);
    })
  }
  ngOnInit() {
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
    const termport = ':8000';
    const socketUrl = `${termprotocol}${this.server_hostname}${termport}/ws/build/${this.trackid}`;
    const socket = new WebSocket(socketUrl);
    // Attach the socket to the terminal
    socket.onopen = (ev) => { term.attach(socket); };
  }
}
