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
      //enableOfficeEditing:true, //para archivos de edicion
      //initialDoc: '../assets/FICHA DE ACTIV 01-08.pdf'
       // initialDoc: '../assets/FICHA DE ACTIV 01-08.pdf'
      //licenseKey: 'your_license_key'  // sign up to get a free trial key at https://dev.apryse.com
    }, this.viewer.nativeElement).then((instance: any) => {
      this.wvInstance = instance; 
      instance.UI.setTheme('dark');  
      instance.UI.setLanguage('es'); 
      instance.UI.loadDocument('https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fangular-auth-d02f6.appspot.com%2Fo%2FCambio%2520GLPI.docx%3Falt%3Dmedia%26token%3D8e94e55e-4cdd-4218-82d8-2997b411829f&wdOrigin=BROWSELINK');
    })
  }


}


