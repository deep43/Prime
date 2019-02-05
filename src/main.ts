import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import {LicenseManager} from 'ag-grid-enterprise';
LicenseManager.setLicenseKey
('Evaluation_License-_Not_For_Production_Valid_Until_21_March_2019__MTU1MzEyNjQwMDAwMA==55c1c4911961eb8e64b1fc5ac61b07d1');

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
