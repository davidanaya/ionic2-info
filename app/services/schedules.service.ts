import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Rx";

import { DataService } from './data.service';
import { CommonCodesService } from './common-codes.service';

@Injectable()
export class SchedulesService {

  // this will be changed with Constants.ts  
  private CONTEXT_PATH = '/OIS';
  private DATA_PATH = '/generated/data';
  private UPDATE_INTERVAL_DATA = 120000;
  
  //private schedules: Schedule[];
  private schedules: any[];
  private url = `//localhost${ this.CONTEXT_PATH }${ this.DATA_PATH }/CAT/CAT-------------------------------/SCHEDULES.json`;
  private schedulesObservable : Observable<boolean>;

  constructor(
    private dataService: DataService,
    private commonCodesService: CommonCodesService) {
  }

  loadSchedules() {
    if (this.schedulesObservable) {
      return this.schedulesObservable;
    }
    this.schedulesObservable = this.dataService
      .getJson(this.url, this.UPDATE_INTERVAL_DATA)
      .map(data => {
        this.schedules = data.schedules.list.map(item => {
          item.dStartDate = this.parseDate(item.startDate, item.startTime);
          item.dEndDate = this.parseDate(item.endDate, item.endTime);
          item.statusName = this.commonCodesService.getValue('schedulestatus', item.status);
          item.locName = this.commonCodesService.getValue('location', item.location);
          item.eventName = this.commonCodesService.getValue('eventunit', item.rsc);	
          return item;
        });
        return true;
      });
    return this.schedulesObservable;
  }

  getSchedules(): any[] {
    return this.schedules;
  }

  private parseDate(date: string, time?: string) : Date {
    let dSplit = date.split('-');
    if (time) {
      let tSplit = time.split(':');
      return new Date(Number(dSplit[0]), Number(dSplit[1]), Number(dSplit[2]), Number(tSplit[0]), Number(tSplit[1]));
    } else {
      return new Date(Number(dSplit[0]), Number(dSplit[1]), Number(dSplit[2]));
    }
  }

}
