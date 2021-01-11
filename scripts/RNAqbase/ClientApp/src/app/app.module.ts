import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { CiteUsComponent } from './citeUs/citeUs.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TetradTabelComponent } from './tetrad-tabel/tetrad-tabel.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { QuadruplexTableComponent } from './quadruplex-table/quadruplex-table.component';
import { StructureTableComponent } from './structure-table/structure-table.component';
import { VisualizationDialogComponent } from './visualization-dialog/visualization-dialog.component';
import { TetradComponent } from './tetrad/tetrad.component';
import { QuadruplexComponent } from './quadruplex/quadruplex.component';
import { CsvModule } from '@ctrl/ngx-csv';
import { VisualizationComponent } from './visualization/visualization.component';
import { Visualization3DComponent } from './visualization3-d/visualization3-d.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ArcdiagramComponent } from './arcdiagram/arcdiagram.component';
import { HeliceComponent } from './helice/helice.component';
import { HelixComponent } from './helix/helix.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {ChartsModule } from 'ng2-charts';
import {MatSelectModule} from "@angular/material/select";




@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TestComponent,
    AboutComponent,
    CiteUsComponent,
    ContactComponent,
    HelpComponent,
    StructureTableComponent,
    TetradTabelComponent,
    QuadruplexTableComponent,
    VisualizationDialogComponent,
    TetradComponent,
    QuadruplexComponent,
    VisualizationComponent,
    Visualization3DComponent,
    StatisticsComponent,
    ArcdiagramComponent,
    HeliceComponent,
    HelixComponent,
    PageNotFoundComponent
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        FormsModule,

        RouterModule.forRoot([
            {path: 'home', component: HomeComponent},
            {path: '', redirectTo: '/home', pathMatch: 'full'},
            {path: 'test', component: TestComponent},
            {path: 'about', component: AboutComponent},
            {path: 'citeUs', component: CiteUsComponent},
            // { path: 'contact', component: ContactComponent },
            {path: 'help', component: HelpComponent},
            {path: 'quadruplexes', component: QuadruplexTableComponent},
            {path: 'structures', component: StructureTableComponent},
            {path: 'tetrads', component: TetradTabelComponent},
            {path: 'tetrad/:tetradId', component: TetradComponent},
            {path: 'quadruplex/:quadruplexId', component: QuadruplexComponent},
            {path: 'statistics', component: StatisticsComponent},
            {path: 'helices', component: HeliceComponent},
            {path: 'helices/:helixId', component: HelixComponent},
            {path: '**', component: PageNotFoundComponent}
        ]),
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDialogModule,
        CsvModule,
        MatTooltipModule,
        MatIconModule,
        MatCardModule,
        ChartsModule,
        MatSelectModule,
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule
      //  IgxDoughnutChartModule,
     // IgxRingSeriesModule

    ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [VisualizationDialogComponent, VisualizationComponent, Visualization3DComponent, ArcdiagramComponent]
})

export class AppModule { }
