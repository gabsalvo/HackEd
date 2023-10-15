import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { UserComponent } from './user/user.component';
import { OfflinePageComponent } from './offline-page/offline-page.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { HelloSecurityComponent } from './exercises/1-hello-security/1-hello-security.component';
import { TrophiesComponent } from './trophies/trophies.component';
import { ClansComponent } from './clans/clans.component';
import { BinaryBattlersComponent } from './clans/binary-battlers/binary-battlers.component';
import { SystemSentinelsComponent } from './clans/system-sentinels/system-sentinels.component';
import { CryptoCrusadersComponent } from './clans/crypto-crusaders/crypto-crusaders.component';
import { NetworkNomadsComponent } from './clans/network-nomads/network-nomads.component';
import { LeaderboardComponent } from './clans/leaderboard/leaderboard.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'offline', component: OfflinePageComponent },
  { path: '', component: HomeContentComponent},
  { path: 'auth', component:  AuthComponent }, 
  { path: 'code', component: CodeEditorComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserComponent },
  { path: 'clans', component: ClansComponent},
  { path: 'clans/binary-battlers', component: BinaryBattlersComponent, canActivate: [AuthGuard]},
  { path: 'clans/network-nomads', component: NetworkNomadsComponent, canActivate: [AuthGuard] },
  { path: 'clans/crypto-crusaders', component: CryptoCrusadersComponent, canActivate: [AuthGuard] },
  { path: 'clans/system-sentinels', component: SystemSentinelsComponent, canActivate: [AuthGuard] },
  { path: 'trophies', component: TrophiesComponent, canActivate: [AuthGuard] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard] },
  { path: 'exercises', component: ExercisesComponent, canActivate: [AuthGuard] },
  { path: 'exercises/1-hello-security', component: HelloSecurityComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
