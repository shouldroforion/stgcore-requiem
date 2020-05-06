import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        PagesModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
