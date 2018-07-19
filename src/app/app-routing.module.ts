import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {KeysPipe} from './directive/keys';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'},
    {path: 'home', component: HomeComponent,}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        FormsModule,
        CommonModule
    ],
    declarations: [
        HomeComponent,
        KeysPipe
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
