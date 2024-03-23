import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { issueReducers } from './store/issue.reducer';
import { provideEffects } from '@ngrx/effects';
import { IssuesEffects } from './store/issues.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideStore({
      issues: issueReducers,
    }),
    provideEffects([IssuesEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};
