import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LinkListComponent } from './components/link-list/link-list.component';
import { SortByPipe } from '../app/pipes/sorting.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api'; // Import MessageService from PrimeNG

import { ButtonModule } from 'primeng/button'; // Import ButtonModule from PrimeNG
import { MegaMenuModule } from 'primeng/megamenu'; // Import MegaMenuModule from PrimeNG
import { InputTextModule } from 'primeng/inputtext'; // Import InputTextModule from PrimeNG
import { TooltipModule } from 'primeng/tooltip'; // Import TooltipModule from PrimeNG
import { SidebarModule } from 'primeng/sidebar'; // Import SidebarModule from PrimeNG
import { MenuModule } from 'primeng/menu'; // Import MenuModule from PrimeNG
import { ListboxModule } from 'primeng/listbox'; // Import ListboxModule from PrimeNG
import { OrderListModule } from 'primeng/orderlist'; // Import OrderListModule from PrimeNG
import { ToolbarModule } from 'primeng/toolbar'; // Import ToolbarModule from PrimeNG
import { DataViewModule } from 'primeng/dataview'; // Import DataViewModule from PrimeNG
import { CardModule } from 'primeng/card'; // Import CardModule from PrimeNG
import { DropdownModule } from 'primeng/dropdown'; // Import DropdownModule from PrimeNG
import { ToastModule } from 'primeng/toast'; // Import ToastModule from PrimeNG
import { DialogModule } from 'primeng/dialog'; // Import DialogModule from PrimeNG
import { InputTextareaModule } from 'primeng/inputtextarea'; // Import InputTextareaModule from PrimeNG
import { ChipsModule } from 'primeng/chips'; // Import ChipsModule from PrimeNG
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // Import ConfirmDialogModule from PrimeNG
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AutoCompleteModule } from 'primeng/autocomplete'; // Import AutoCompleteModule from PrimeNG
import { ScrollTopModule } from 'primeng/scrolltop';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component'; // Import ScrollTopModule from PrimeNG

@NgModule({
  declarations: [
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
    NotFoundComponent
  ],
  imports: [
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
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
