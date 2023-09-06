import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../tutores-permisos/upgrade.component';
import { LoginGuard } from 'app/guards/login.guard';
import { NinosCrearComponent } from 'app/modules/ninos-crear/ninos-crear.component';
import { CasasComponent } from 'app/casas/casas.component';
import { ParticipantsTableComponent } from 'app/components/participants-table/participants-table.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    // canActivate:[LoginGuard],
    { path: 'principal', canActivate:[LoginGuard],
    component: DashboardComponent },
    { path: 'perfil-usuario',   component: UserProfileComponent },
    { path: 'lista-niños',     component: TableListComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'permiso-tutores',        component: UpgradeComponent },
    { path: 'casas',        component: CasasComponent },
    {
        path: 'crear-niños',
        component: NinosCrearComponent
    },
    {
        path: 'participantes',
        component: ParticipantsTableComponent
    }
];
