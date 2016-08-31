import { Component } from '@angular/core';

import { CommonCodesService } from '../../services/common-codes.service';
import { SchedulesService } from '../../services/schedules.service';
import { DataService } from '../../services/data.service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [ SchedulesService, CommonCodesService, DataService ]
})
export class HomePage {
  
  private schedules: any[];

  constructor(
    private schedulesService: SchedulesService,
    private commonCodesService: CommonCodesService,
    private dataService: DataService) {
  }

  getSchedules() {
    // get common codes first    
    this.commonCodesService.loadCommonCodes()
        .map(loaded => {
          if (loaded) {
            console.log('common codes loaded');
          } else {
            console.log('common codes already loaded');
          }
          // get schedules
          this.schedulesService
              .loadSchedules()
              .subscribe(() => this.updateSchedules());
          return true;
       });
  }

  private updateSchedules() {
    this.schedules = this.schedulesService.getSchedules();
  }

}
