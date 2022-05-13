import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardsGuard } from './guards/auth-guards.guard';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then((module) => module.AuthModule),
  },
  { path: 'main', canActivate: [AuthGuardsGuard], component: MainComponent },
  { path: '**', redirectTo: 'main' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [MainComponent],
  exports: [RouterModule],
})
export class AppRoutingModule {}
