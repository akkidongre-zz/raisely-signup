import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { SignupService } from './signup/signup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations : []
})
export class AppComponent implements OnInit, OnDestroy {

  mediaSizeSub : Subscription;
  mediaSize;

  constructor(
    mediaObs : MediaObserver,
    private signupService : SignupService
  ) {
    this.mediaSizeSub = mediaObs.media$.subscribe((change : MediaChange) => {
      this.mediaSize = change.mqAlias;
    })
  }

  ngOnInit(){
  }

  ngOnDestroy() {
    this.mediaSizeSub.unsubscribe();
  }

}
