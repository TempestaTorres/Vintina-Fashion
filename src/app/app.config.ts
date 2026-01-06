import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withInMemoryScrolling, withRouterConfig, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import {provideSweetAlert2} from '@sweetalert2/ngx-sweetalert2';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {loggingInterceptor} from './interceptors/logging-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi(),),
    {provide: HTTP_INTERCEPTORS, useClass: loggingInterceptor, multi: true},
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideSweetAlert2({
      fireOnInit: false,
      dismissOnDestroy: true,
    }),
    provideRouter(routes, withRouterConfig({paramsInheritanceStrategy: 'always'}), withInMemoryScrolling({
      anchorScrolling: 'enabled',
    }),  withViewTransitions())
  ]
};
