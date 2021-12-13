import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Base64String } from '@digitalpersona/core';

interface IStepModel {
  fingerprint: Base64String;
  photo: any;
  selectedImage: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public isFingeringDeviceConnected = false;
  public stepModel!: IStepModel;
  public step = 0;

  constructor() {
    this.stepModel = {
      fingerprint: '',
      photo: '',
      selectedImage: '',
    };
  }

  public updateSampleAcquired = (data: Base64String) => {
    this.stepModel.fingerprint = data;
  };

  public changeStep(step: StepperSelectionEvent): void {
    this.step = step.selectedIndex;
    if (step.selectedIndex === 0) {
      this.stepModel = {
        fingerprint: '',
        photo: '',
        selectedImage: '',
      };
    }
  }

  public capturedPhoto(photo: Base64String) {
    this.stepModel.photo = photo;
  }

  public selectImage = (data: any) => {
    this.stepModel.selectedImage = data.image64;
  };
}
