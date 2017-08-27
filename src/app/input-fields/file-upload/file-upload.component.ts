import { Component, OnInit } from '@angular/core';
import { ElementRef, Input, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;

  constructor(private http: Http) {}

  upload() {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    console.log('UPLOAD');
    console.log(inputEl);
    console.log(inputEl.files);
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
        for (let i = 0; i < fileCount; i++) {
            formData.append('file[]', inputEl.files.item(i));
        }
        
        // this.http
        //     .post('http://your.upload.url', formData)
            // do whatever you do...
            // subscribe to observable to listen for response
    }
  }
  ngOnInit() {
  }
}