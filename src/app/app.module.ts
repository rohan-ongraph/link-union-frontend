// Importing necessary modules from Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Importing components and pipes from the application
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LinkListComponent } from './components/link-list/link-list.component';
import { SortByPipe } from '../app/pipes/sorting.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Importing PrimeNG modules for UI components
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollTopModule } from 'primeng/scrolltop';

// Importing components for other pages
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Importing HTTP interceptor for adding authentication token to requests
import { AuthInterceptor } from './interceptors/auth-header.interceptor';

// Importing message and confirmation service from primeNG api
import { ConfirmationService, MessageService } from 'primeng/api';

// Importing infinite scroll directive
import { ScrollNearEndDirective } from './directives/scroll-near-end.directive';


@NgModule({
  declarations: [
    // Declaring all components and pipes
    AppComponent,
    SignInComponent,
    SignUpComponent,
    LinkListComponent,
    SortByPipe,
    AboutComponent,
    ContactComponent,
    HomeComponent,
    NavbarComponent,
    UserProfileComponent,
    NotFoundComponent,
    ScrollNearEndDirective,
  ],
  imports: [
    // Importing required Angular and PrimeNG modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ToolbarModule,
    ConfirmDialogModule,
    ScrollTopModule,
    DialogModule,
    DropdownModule,
    CardModule,
    ChipsModule,
    MegaMenuModule,
    MenuModule,
    SidebarModule,
    InputTextareaModule,
    TooltipModule,
    ProgressSpinnerModule,
  ],
  providers: [
    // Providing services and HTTP interceptor
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent] // Bootstrapping the root component
})
export class AppModule { } // Defining the AppModule class
