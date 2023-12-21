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
import { MarkdownModule } from 'ngx-markdown';
import { HelloSecurityComponent } from './exercises/1-hello-security/1-hello-security.component';
import { TrophiesComponent } from './trophies/trophies.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OfflinePageComponent } from './offline-page/offline-page.component';
import { TrophiesPageComponent } from './trophies/trophies-page/trophies-page.component';
import { ChatLibModule } from '@gabriele-salvo/socket-chat-angular';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeContentComponent,
    CodeEditorComponent,
    ExercisesComponent,
    UserComponent,
    HelloSecurityComponent,
    TrophiesComponent,
    NavbarComponent,
    OfflinePageComponent,
    TrophiesPageComponent,
  ],
  exports: [CodeEditorComponent],
  imports: [
    BrowserModule,
    EditorModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
    MarkdownModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    ChatLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
export class CodeEditorModule {}
