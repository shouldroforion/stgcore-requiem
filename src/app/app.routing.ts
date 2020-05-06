import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { MethodologyComponent } from './pages/methodology/methodology.component';
import { ServicesComponent } from './pages/services/services.component';
import { LandingComponent } from './pages/landing/landing.component';

const routes: Routes =[
    { path: 'landing',              component: LandingComponent },
    { path: 'methodology',          component: MethodologyComponent },
    { path: 'services',             component: ServicesComponent },
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes,{
          useHash: true
        })
    ],
    exports: [
    ],
})
export class AppRoutingModule { }
