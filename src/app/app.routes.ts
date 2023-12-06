import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContactsComponent } from './contacts/contacts.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { 
                path: 'login', 
                component: LoginComponent
            },
            
        ]
    },
    {
        path: 'home',
        component: MainLayoutComponent,
        children: [
            { 
                path: 'contacts', 
                component: ContactsComponent
            },
            { 
                path: 'dashboard', 
                component: DashboardComponent
            }
            
        ]
    }
];
