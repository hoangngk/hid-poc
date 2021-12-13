import {
  Component,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-capture-photo',
  templateUrl: './capture-photo.component.html',
  styleUrls: ['./capture-photo.component.scss'],
})
export class CapturePhotoComponent {
  @Input() public capturedPhoto: string;
  @Output() public captured = new EventEmitter();

  @ViewChild('video')
  public video: ElementRef;
  @ViewChild('canvas')
  public canvas: ElementRef;

  public isPhotoCaptured: boolean;

  constructor() {
    this.isPhotoCaptured = false;
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    this.isPhotoCaptured = false;
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(this.video.nativeElement, 0, 0, 640, 480);
    const photo = this.canvas.nativeElement.toDataURL('image/png');
    this.captured.emit(photo);
    setTimeout(() => {
      this.isPhotoCaptured = true;
    }, 1000);
  }
}
