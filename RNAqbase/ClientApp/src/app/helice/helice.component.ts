import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { SelectionModel } from '@angular/cdk/collections';
import { CsvModule } from '@ctrl/ngx-csv';

@Component({
  selector: 'app-helice',
  templateUrl: './helice.component.html',
  styleUrls: ['./helice.component.css']
})
export class HeliceComponent implements OnInit {

  selection = new SelectionModel<Helix>(true, []);
  dataSource = new MatTableDataSource<Helix>();
  csvData: Helix[] = [];
  areButtonsHidden: boolean = true;
  filteredDataLength = this.dataSource.data.length;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  displayedColumns = [
    'id', 'pdbId', 'pdbDeposition', 'assemblyId', 'molecule',
    'sequence', 'type_strand', 'numberOfQudaruplexes', 'quadruplexId', 'numberOfTetrads', 'select'
  ];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit() {
    this.http.get<Helix[]>(this.baseUrl + 'api/Helix/GetHelices').subscribe(result => {
        this.dataSource = new MatTableDataSource(result);

        for (let val of result){
          val.quadruplexesIds =  Array.from(new Set( val.quadruplexesIds.split(',') ))
        }

        this.csvData = JSON.parse(JSON.stringify(result));
        for(let val of result){
          val.helix_id = 'H' + val.id;
        }

        for (let val of this.csvData){
          for (let i = 0; i < val.quadruplexesIds.length; i++) {
            val.quadruplexesIds[i] = 'Q' + val.quadruplexesIds[i];
          }
        }
        for (let val of this.csvData){
          val.id =  'H' + val.id;
        }

        for (let val of result) {
          val.quadruplexesIds = JSON.parse(JSON.stringify(val.quadruplexesIds));
          for (let i = 0; i < val.quadruplexesIds.length; i++) {
            val.quadruplexesIds[i] = 'Q' + val.quadruplexesIds[i];
          }
        }

        this.dataSource.filterPredicate = (data: Helix, filter: string): boolean => {
          const dataStr = Object.keys(data).reduce((currentTerm: string, key: string) => {
            return (currentTerm + (data as { [key: string]: any })[key] + '◬');
          }, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

          const transformedFilter = filter.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          return dataStr.indexOf(transformedFilter) != -1;
        }
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.areButtonsHidden = false;
      this.filteredDataLength = this.dataSource.data.length;
      },
      error => console.error(error));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filteredDataLength = this.dataSource.filteredData.length;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Helix): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  truncate(source) {
    let size = 30;
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }
}

interface Helix {
  id: string;
  helix_id: any;
  quadruplexesIds: any;
  pdbId: string;
  assemblyId: number;
  molecule: string;
  sequence: string;
  typeOfStrands: string;
  numberOfQudaruplexes: number;
  numberOfTetrads: number;
  pdbDeposition: string;
}
