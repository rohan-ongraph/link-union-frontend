import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AboutComponent } from './components/about/about.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LinkListComponent } from './components/link-list/link-list.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '', // Default route to HomeComponent
    component: HomeComponent
  },
  {
    path: 'list', // Route for LinkListComponent
    component: LinkListComponent,
    canActivate: [authGuard] // Apply AuthGuard for access control
  },
  {
    path: 'signUp', // Route for SignUpComponent
    component: SignUpComponent
  },
  {
    path: 'signIn', // Route for SignInComponent
    component: SignInComponent
  },
  {
    path: 'about', // Route for AboutComponent
    component: AboutComponent,
    canActivate: [authGuard] // Apply AuthGuard for access control
  },
  {
    path: 'profile', // Route for UserProfileComponent
    component: UserProfileComponent,
    canActivate: [authGuard] // Apply AuthGuard for access control
  },
  {
    path: 'contact', // Route for ContactComponent
    component: ContactComponent,
    canActivate: [authGuard] // Apply AuthGuard for access control
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Set up the RouterModule with the defined routes
  exports: [RouterModule] // Export the RouterModule for use in AppModule
})
export class AppRoutingModule { }
