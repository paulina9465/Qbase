import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Visualization3DComponent } from '../visualization3-d/visualization3-d.component';
import { VisualizationDialogComponent } from '../visualization-dialog/visualization-dialog.component';
import { VisualizationComponent } from '../visualization/visualization.component';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';
import * as svg from 'save-svg-as-png';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import { saveAs } from "file-saver";


@Component({
  selector: 'app-tetrad',
  templateUrl: './tetrad.component.html',
  styleUrls: ['./tetrad.component.css']
})

export class TetradComponent implements OnInit {
  _3d_structure;
  _2d_structure_varna;
  _2d_structure_rchie;
  data: Tetrad;
  csvData: Tetrad;
  tetradId: number;
  sub;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.tetradId = +params.get('tetradId');
      this.http.get<Tetrad>(this.baseUrl + 'api/Tetrad/GetTetradById?id=' + this.tetradId).subscribe(result => {
        this.data = result;
        this.data.id = 'T' + this.data.id;
        this.data.quadruplexId = 'Q' + this.data.quadruplexId;
        this.csvData = JSON.parse(JSON.stringify(this.data));

        this.http.get<number[]>(this.baseUrl + 'api/Tetrad/GetOtherTetradsInTheSamePdb?tetradId=' + this.tetradId + '&pdbId=' + this.data.pdbId).subscribe(result => {
          if (result) {
            this.data.tetradsInTheSamePdb = result;
            this.csvData.tetradsInTheSamePdb = result.join(";");
          }
          else {
           this.data.tetradsInTheSamePdb = [];
            this.csvData.tetradsInTheSamePdb = '';
          }
           if (this.data.quadruplexId != '-') {
            this.http.get<number[]>(this.baseUrl + 'api/Tetrad/GetOtherTetradsInTheSameQuadruplex?tetradId=' + this.tetradId + '&quadruplexId=' + this.data.quadruplexId.slice(1)).subscribe(result => {
              if (result) {
                this.data.tetradsInTheSameQuadruplex = result;
                this.csvData.tetradsInTheSameQuadruplex = result.join(";");
              }
              else {
                this.data.tetradsInTheSameQuadruplex = [];
                this.csvData.tetradsInTheSameQuadruplex = '';
              }
            }, error => console.error(error));
          }
          else {
            this.data.tetradsInTheSameQuadruplex = [];
          }
        }, error => console.error(error));
      }, error => console.error(error));

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  show3dStructure() {
    let dialogRef = this.dialog.open(Visualization3DComponent, {
      data: {
        pdbId: this.data.pdbIdentifier,
        url: this.baseUrl + 'api/tetrad/GetCifFile?tetradId=' + this.tetradId
      }
    });
  }

  show2dStructure(type: any) {
    let dialogRef = this.dialog.open(VisualizationDialogComponent, {
      data: { type: type, id: this.data.id },
    });
  }

  setTwoNumberDecimal(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

   downloadZip(): void {
     this.http.get("/static/pymol/" + this.data.id + ".png", { responseType: "arraybuffer" })
       .subscribe(data => {
         this._3d_structure = data;

         this.http.get("/static/varna/" + this.data.id + ".svg", { responseType: "arraybuffer" })
           .subscribe(data => {
             this._2d_structure_varna = data;

             this.http.get("/static/rchie/" + this.data.id + ".svg", { responseType: "arraybuffer" })
               .subscribe(data => {
                 this._2d_structure_rchie = data;

                 var zip =new JSZip();
                 let tetrad = this.generateFile([this.csvData])
                 zip.file("3d_structure.png", this._3d_structure);
                 zip.file("2d_structure_varna.svg", this._2d_structure_varna);
                 zip.file("2d_structure_rchie.svg", this._2d_structure_rchie);
                 zip.file("tetrad" + ".csv", tetrad);
                 zip.generateAsync({ type: "blob" })
                   .then(blob => saveAs(blob,'data.zip'));

               });
           });
       });
  }

  generateFile(data: any) {
    const replacer = (key, value) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    return  new Blob([csvArray], {type: 'text/csv' })
  }
}

interface Tetrad {
  id: any;
  quadruplexId: any;
  pdbId: number;
  pdbIdentifier: string;
  assemblyId: number;
  molecule: string;
  sequence: string;
  onzClass: string;
  planarity: string;
  tetradsInTheSameQuadruplex: any;
  tetradsInTheSamePdb: any;
  experiment: string;
  dot_bracket: string;
}
