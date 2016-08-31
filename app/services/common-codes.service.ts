import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Rx";

import { DataService } from './data.service';

@Injectable()
export class CommonCodesService {
	
  // this will be changed with Constants.ts  
  private CONTEXT_PATH = '/OIS';
  private DATA_PATH = '/generated/data';
  
  private url = `//localhost${ this.CONTEXT_PATH }${ this.DATA_PATH }/CCO/CCO-------------------------------/CC_ENG.json`;
  private commonCodes = [];
	private isLoaded = false; // true if common codes have already been loaded

  constructor(private dataService: DataService) {
  }

	private compare(a, b) : number {
		if (a.name < b.name)
			return -1;
		if (a.name > b.name)				
			return 1;
		return 0;
	}

  getValue(category: string, code: string) : string {
    if (code && category) {
      // if no code or category returns code
      if (this.commonCodes[category]) {
        if (this.commonCodes[category][code]) {
          return this.commonCodes[category][code]['ShortName'];
        }
      }
    }
    return code;
  }

  loadCommonCodes() {
		if (this.isLoaded) {
			// already loaded, no need to read again
			return Observable.of(false);
		} else {
			return this.dataService.getJson(this.url, -1)
				.map(data => {
					for (let key in data) {
						if (!data.hasOwnProperty(key)) {
							continue;
						}
						// code, rsc and version are no common codes
						if (key !== 'code' && key !== 'rsc' && key !== 'version') {
							this.commonCodes[key.toLowerCase()] = data[key].values;
						}
					}
					this.isLoaded = true;
					console.log(this.commonCodes);
					return true;
				});
		}
  }

}
