import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Base64, Base64UrlString, Base64String } from '@digitalpersona/core';
import {
  FingerprintReader,
  QualityCode,
  QualityReported,
  SampleFormat,
  SamplesAcquired,
} from '@digitalpersona/devices';

enum ScanStatus {
  Successful = 'successful',
  Failed = 'failed',
  Empty = 'empty',
}

enum StatusColor {
  EMPTY = 'gray',
  SUCCESS = 'green',
  FAILED = 'red',
}

@Component({
  selector: 'app-scan-fingers',
  templateUrl: './scan-fingers.component.html',
  styleUrls: ['./scan-fingers.component.scss'],
})
export class ScanFingersComponent implements OnInit {
  private reader!: FingerprintReader;

  @Input() public fingerprint: Base64String;

  @Input() public isReaderConnected: boolean;
  @Output() public isReaderConnectedChange = new EventEmitter<boolean>();

  @Input() public step: number;
  @Output() public stepChange = new EventEmitter<number>();

  @Output() public updateSampleAcquired = new EventEmitter<Base64String>();

  public scanStatus: ScanStatus;
  public eScanStatus = ScanStatus;

  constructor(private domSanitizer: DomSanitizer) {
    this.isReaderConnected = false;
    this.step = 1;
    this.reader = new FingerprintReader();
    this.scanStatus = ScanStatus.Empty;
  }

  ngOnInit(): void {
    this.handleFingerprintDeviceEvent();
  }

  public handleDeviceConnectionStatus = (isConnected: boolean) => {
    this.isReaderConnectedChange.emit(isConnected);
  };

  public resetScanningStatus = () => {
    this.scanStatus = ScanStatus.Empty;
    this.stepChange.emit(1);
  };

  get scanStatusColor(): StatusColor {
    if (!this.isReaderConnected) {
      return StatusColor.EMPTY;
    }

    switch (this.scanStatus) {
      case ScanStatus.Failed:
        return StatusColor.FAILED;
      case ScanStatus.Successful:
        return StatusColor.SUCCESS;
      default:
        return StatusColor.EMPTY;
    }
  }

  get scanStatusMessage(): string {
    if (!this.isReaderConnected) {
      return 'Please connect fingerprint device';
    }

    switch (this.scanStatus) {
      case ScanStatus.Empty:
        return 'Please scan your fingers';
      case ScanStatus.Successful:
        return 'Scan successful';
      case ScanStatus.Failed:
        return 'Scan failed';
      default:
        return '';
    }
  }

  get fingerprintPhoto(): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(
      `data:image/png;base64, ${this.fingerprint}`
    );
  }

  private handleFingerprintDeviceEvent = async () => {
    this.reader.on('DeviceConnected', () => {
      this.handleDeviceConnectionStatus(true);
    });

    this.reader.on('DeviceDisconnected', () => {
      this.resetScanningStatus();
      this.handleDeviceConnectionStatus(false);
    });

    this.reader.on('QualityReported', (event: QualityReported) => {
      const { quality } = event;
      this.handleQualityReport(quality);
    });

    this.reader.on('SamplesAcquired', this.manageSampleAcquired);

    this.reader.startAcquisition(SampleFormat.PngImage);
  };

  private manageSampleAcquired = async (data: SamplesAcquired) => {
    const { samples } = data;

    if (!samples || !samples.length) {
      return;
    }
    const base64ImageData: Base64String = Base64.fromBase64Url(
      samples[0] as unknown as Base64UrlString
    );
    this.updateSampleAcquired.emit(base64ImageData);
  };

  private handleQualityReport = (quality: QualityCode) => {
    if (quality === QualityCode.Good) {
      this.scanStatus = ScanStatus.Successful;
      this.stepChange.emit(2);
    } else {
      this.scanStatus = ScanStatus.Failed;
      this.stepChange.emit(1);
    }
  };
}
