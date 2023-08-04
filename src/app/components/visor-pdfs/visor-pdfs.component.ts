import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import WebViewer from '@pdftron/webviewer';
import WebViewerInstance from "@pdftron/webviewer";

@Component({
  selector: 'app-visor-pdfs',
  templateUrl: './visor-pdfs.component.html',
  styleUrls: ['./visor-pdfs.component.scss']
})
export class VisorPdfsComponent implements AfterViewInit {

  wvInstance?: WebViewerInstance;
  @ViewChild('viewer') viewer!: ElementRef;
  constructor() { }

  ngAfterViewInit(): void {

    WebViewer({
      path: '../lib',
      enableOfficeEditing:true, //para archivos de edicion
      //initialDoc: '../assets/FICHA DE ACTIV 01-08.pdf'
      //licenseKey: 'your_license_key'  // sign up to get a free trial key at https://dev.apryse.com
    }, this.viewer.nativeElement).then((instance: any) => {
      this.wvInstance = instance;     
    })
  }


}


