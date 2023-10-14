import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AuthComponent } from './auth/auth.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { UserComponent } from './user/user.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OfflinePageComponent } from './offline-page/offline-page.component';
import { HelloSecurityComponent } from './exercises/1-hello-security/1-hello-security.component';
import { TrophiesComponent } from './trophies/trophies.component';
import { ClansComponent } from './clans/clans.component';
import { BinaryBattlersComponent } from './clans/binary-battlers/binary-battlers.component';
import { CryptoCrusadersComponent } from './clans/crypto-crusaders/crypto-crusaders.component';
import { NetworkNomadsComponent } from './clans/network-nomads/network-nomads.component';
import { SystemSentinelsComponent } from './clans/system-sentinels/system-sentinels.component';
import { LeaderboardComponent } from './clans/leaderboard/leaderboard.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeContentComponent,
    CodeEditorComponent,
    ExercisesComponent,
    UserComponent,
    OfflinePageComponent,
    HelloSecurityComponent,
    TrophiesComponent,
    ClansComponent,
    BinaryBattlersComponent,
    CryptoCrusadersComponent,
    NetworkNomadsComponent,
    SystemSentinelsComponent,
    LeaderboardComponent,
  ],
  imports: [
    BrowserModule,
    EditorModule, 
    MonacoEditorModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
