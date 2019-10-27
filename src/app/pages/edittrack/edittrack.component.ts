import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {TrackslistService} from "../../services/trackslist.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";

declare var Terminal: any;
declare var attach: any;
declare var fit: any;


@Component({
  selector: 'ngx-edittrack',
  styleUrls: ['./edittrack.component.scss'],
  templateUrl: './edittrack.component.html',
})
export class EdittrackComponent implements OnInit {
  server_hostname = 'localhost'
  buildstarted = false;
  showchallenges = 0;
  public Editor = ClassicEditor;
  challengeindex = -1;
  monacoeditor = {theme: 'vs-dark', language: 'shell'};
  monacocode: string = '';
  profile: any = {};
  fileuploadprogress = 0;
  trackid = null;
  newchallenge = {
    title: '',
    notes: '',
    setupscript: '',
    checkscript: '',
    cleanscript: '',
    newchallenge: true,
    track: null,
    challenge_position: 0,
  };
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
    labtype: '',
    colablink: '',
    public: false,
  };
  challenges: any[] = [];

  constructor(private themeService: NbThemeService, private trackslistservice: TrackslistService,
              private route: ActivatedRoute, private router: Router) {
    const trackid = this.route.snapshot.paramMap.get("trackid")
    this.trackid = trackid
    this.trackslistservice.gettrack(trackid).subscribe((result: any) => {
      this.track = result.track;
      this.challenges = result.challenges;
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
    this.buildstarted = true;
    this.trackslistservice.buildtrack(this.trackid).subscribe((result: any) => {
      console.log(result);
    })
  }
  savecurrentchallenge(challengeindex){
    this.trackslistservice.updatechallenge(this.challenges[challengeindex].id, this.challenges[challengeindex])
      .subscribe((result: any) => {
        console.log(result);

      });
  }
  nextchallenge(challengeindex) {
    if (challengeindex < this.challenges.length - 1) {
      if (this.showchallenges === 0) {
        this.showchallenges = 1;
      }
      this.challengeindex += 1;
    }
  }
  previouschallenge() {
    if (this.challengeindex > 0)
      this.challengeindex -= 1
    if (this.challengeindex === 0) {
      this.showchallenges = 0;
      this.challengeindex = -1;
    }
  }
  removechallenge(challengeindex) {
    if (this.challenges[this.challengeindex].id) {
      this.trackslistservice.deletechallenge(this.challenges[this.challengeindex].id).subscribe((result: any) => {
        console.log(result);
        if (result.sucess === true) {
          this.challenges.splice(challengeindex, 1);
        }
      });
    } else {
      this.challenges.splice(challengeindex, 1);
      this.challengeindex -= 1
      if (this.challengeindex == -1) {
        this.showchallenges = 0;
      }
    }
  }
  copytrack() {
    this.trackslistservice.copytrack(this.trackid).subscribe((result: any) => {
      if (result.success) {
        this.router.navigate(['pages/edittrack', result.trackid]);
      } else {
        console.log(result.errror)
      }
    })
  }
  backtotrack(challengeindex) {
    this.challengeindex = -1
    this.showchallenges = 0
  }
  edittrackchallenges () {
    this.challengeindex = 0;
    this.showchallenges = 1;
  }
  public files: NgxFileDropEntry[] = [];
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);


           // You could upload it like this:
           const formData = new FormData()
           formData.append('file', file, droppedFile.relativePath)

          this.trackslistservice.uploadFile(this.trackid, formData, droppedFile.relativePath)
            .subscribe((event: HttpEvent<any>) => {
            if (event.type === HttpEventType.UploadProgress) {
              // This is an upload progress event. Compute and show the % done:
              const percentDone = Math.round(100 * event.loaded / event.total);
              this.fileuploadprogress = percentDone;
              console.log(`File is ${percentDone}% uploaded.`);
            } else if (event instanceof HttpResponse) {
              console.log(event);
            }
          })


        });
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
  deletefolder() {
    this.trackslistservice.deletetrackfolder(this.trackid).subscribe((result: any) => {
      console.log(result);
    })
  }
  addnewchallenge() {
    this.newchallenge.track = this.trackid;
    this.challenges.push(this.newchallenge);
    this.challengeindex += 1;
    if (!this.showchallenges) {
      this.showchallenges = 1;
    }
  }
  submitnewchallenge(challengeindex) {
    this.trackslistservice.submitnewchallenge(this.challenges[challengeindex]).subscribe((result: any) => {
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
