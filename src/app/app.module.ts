import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CapturePhotoComponent } from './components/capture-photo/capture-photo.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ScanFingersComponent } from './components/scan-fingers/scan-fingers.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ImageSelectionComponent } from './components/image-selection/image-selection.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { FinishStepComponent } from './components/finish-step/finish-step.component';

@NgModule({
  declarations: [
    AppComponent,
    CapturePhotoComponent,
    ScanFingersComponent,
    ImageSelectionComponent,
    FinishStepComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatSnackBarModule,
    MatGridListModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
