import { Base64String } from '@digitalpersona/core';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-finish-step',
  templateUrl: './finish-step.component.html',
  styleUrls: ['./finish-step.component.scss'],
})
export class FinishStepComponent implements OnInit {
  @Input() selectedImage: Base64String;

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  get imgSrc(): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(
      `data:image/jpeg;base64, ${this.selectedImage}`
    );
  }
}
