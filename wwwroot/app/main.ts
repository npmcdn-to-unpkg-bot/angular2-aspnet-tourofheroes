import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

import {AppComponent} from './app.component';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS])
  .then(success => console.log(`Bootstrap success`))
  .catch(error => console.log(error));
