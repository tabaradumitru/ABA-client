import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ConfigurationService } from '@services/configuration.service';
import { GLOBAL_SPINNER } from '@constants/loading-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'ABA-client';
  loadingConstant = GLOBAL_SPINNER;

  constructor(private primengConfig: PrimeNGConfig,
              public configurationService: ConfigurationService,
              private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }
}
