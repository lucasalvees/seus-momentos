import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { EditMomentComponent } from './components/pages/edit-moment/edit-moment.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MomentComponent } from './components/pages/moment/moment.component';
import { PublicarComponent } from './components/pages/publicar/publicar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'publicar/new', component: PublicarComponent },
  { path: 'moments/edit/:id', component: EditMomentComponent },
  { path: 'moments/:id', component: MomentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
