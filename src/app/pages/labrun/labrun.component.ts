import {AfterViewInit, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {TrackslistService} from "../../services/trackslist.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import 'rxjs/add/observable/interval';
import {Observable} from 'rxjs';
import {FileSystemFileEntry, NgxFileDropEntry} from "ngx-file-drop";
import {HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";
import {server} from "../../config";

declare var WIDE: any;
declare var Terminal: any;
declare var attach: any;
declare var fit: any;

@Component({
  selector: 'ngx-labrun',
  styleUrls: ['./labrun.component.scss'],
  templateUrl: './labrun.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LabrunComponent implements AfterViewInit {
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
  container_colab_webview = '';
  fileuploadprogress = 0;
  showingiframe = false
  // use only in development
  // server_editor_url = 'http://localhost:3000';
  // server_terminal_url = 'http://localhost:3000';
  constructor(private themeService: NbThemeService, private trackslistservice: TrackslistService,
              private route: ActivatedRoute, private sanitizer: DomSanitizer,
              private changeDetection: ChangeDetectorRef) {
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
  }
  runtrack(trackid, courseid, studentid) {
    this.trackslistservice.runtrack(trackid, courseid, studentid, this.instructor).subscribe((result: any) => {
      this.courseid = result.container_data.course_id;
      this.studentid = result.container_data.student_id;
      this.submitted = result.submitted;
      this.track = result.track;
      this.challenges = result.challenges;
      if (!this.challenges.length) {
        this.showchallenges = 1;
      }
      this.containerid = result.container_data.container_id;
      if (this.containerid) {
        this.server_editor_url = 'http://' + result.container_data.container_id.slice(0, 10) + '-' +
          this.server_editor_port + this.container_hostname;
        this.server_terminal_url = result.container_data.container_id.slice(0, 10) + '-' +
          this.server_terminal_port + this.container_hostname + '/shell';
        if (this.track.scenario === 'editor-terminal' || this.track.scenario === 'iframe-editor-terminal') {
          this.showeditor = true;
        }
        if (this.track.scenario === 'iframe-editor') {
          this.showterminal = false;
          this.showeditor = true;
          // this.inlineiframe = true;
        }
        if (this.track.scenario === 'iframe-terminal' || this.track.scenario === 'iframe-editor-terminal') {
          const urlforiframe = 'http://' + this.containerid.slice(0, 10) + '-' +
            this.track.scenario_data.port + this.container_hostname;
          const new_iframe = {
            'address': urlforiframe,
            'port': this.track.scenario_data.port
          };
          this.iframe_tabs = [new_iframe];
        }
        if (this.track.scenario === 'iframe-editor') {
          const urlforiframe = 'http://' + this.containerid.slice(0, 10) + '-' +
            this.track.scenario_data.port + this.container_hostname;
          this.iframeelement = urlforiframe;
          const new_iframe = {
            'address': urlforiframe,
            'port': this.track.scenario_data.port
          };
          setTimeout(() => {
            this.showiframe(urlforiframe);
          }, 3000);
          this.iframe_tabs = [new_iframe];
        }
        setTimeout(() => {
          if (this.showeditor && this.track.scenario != 'iframe-editor') {
            console.log(this.track.scenario);
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
                this.loadScript();
                this.runtrack(this.trackid, this.courseid, this.studentid);
              }
            });
          });
      } else {
        this.container_colab_webview = result.container_data.container_colab_webview;
      }
    });
  }
  startterminal() {
    console.log("came here")
    const termcontainer = document.getElementById('terminal');
    console.log(termcontainer.innerHTML);
    if (termcontainer.innerHTML) {
      termcontainer.innerHTML = '';
    }
    Terminal.applyAddon(attach);
    Terminal.applyAddon(fit);
    // The terminal
    const term = new Terminal();
    // No idea what this does
    // This kinda makes sense
    term.open(termcontainer);
    // Open the websocket connection to the backend
    const termprotocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    const termport = ':80';
    const socketUrl = `${termprotocol}${this.server_terminal_url}`;
    const socket = new WebSocket(socketUrl);
    // Attach the socket to the terminal
    socket.onopen = (ev) => { term.attach(socket); };
    socket.onerror = (ev) => {
      this.loadScript();
      this.runtrack(this.trackid, this.courseid, this.studentid)
    };
    // Not going to worry about close/error for the websocket
  }

  nextchallenge() {
    if (this.currentchallenge < this.challenges.length-1)
    {
      if (this.showchallenges == 0) {
        this.showchallenges = 1;
        //a hacky fix to be removed in later stages
        setTimeout(()=> {    //<<<---    using ()=> syntax
          if (this.track.scenario != 'iframe-editor') {
            this.startterminal();
          }
        }, 3000);
      }
      this.currentchallenge += 1;
      //this.startterminal();
    }
  }
  previouschallenge() {
    if (this.currentchallenge > 0)
      this.currentchallenge -= 1
    else if (this.currentchallenge == 0) {
      if (!this.challenges.length) {
        this.showchallenges = 1;
      } else {
        this.showchallenges = 0;
      }

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
      console.log(result);
      console.log(result.success);
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
        this.changeDetection.detectChanges();
        console.log(this.iframe_tabs)
      }
    })
  }

  snapshotcontainer() {
    this.trackslistservice.snapshotcontainer(this.containerid, this.trackid).subscribe((result: any) => {
      console.log(result);
      this.submitted = result.submitted;

    })
  }
  startcolab() {
    window.open(this.container_colab_webview, "_blank");
  }
  showiframe(iframeadress) {
    if (document.getElementById('iframe-embed')) {
      this.showingiframe = true;
      document.getElementById('iframe-embed').style.display = 'inline-block';
      let iframeblock = document.getElementById('iframe-block') as HTMLIFrameElement;
      iframeblock.src = iframeadress
    }
  }
  showeditorpanel() {
    this.showingiframe = false;
    document.getElementById('iframe-embed').style.display = 'none';

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

          this.trackslistservice.uploadFile(this.trackid, formData, droppedFile.relativePath,
            this.courseid, this.studentid)
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
  downloadfolder() {
    this.trackslistservice.downloadFile(this.trackid, this.courseid, this.studentid).subscribe((data:any) => {
      console.log(data);
      const url = server + '/' + data.url;
      window.open(url);
    })
  }
  resetfolder() {
    this.trackslistservice.resetFile(this.trackid, this.courseid, this.studentid).subscribe((result: any) => {
      console.log(result)
    })
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
    this.runtrack(this.trackid, this.courseid, this.studentid);
  }
}
