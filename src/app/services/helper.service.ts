import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  getDateFormatYYYYMMddDash(date: Date) : string {
    let dateResult : string = "";   
    dateResult = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
    return dateResult;
  }

  dmyToDate = function(dmy) {
    var d = dmy.split(/[\/\-\.]/, 3);
  
    if (d.length != 3) return null;
  
    // Check if date is valid
    var day = parseInt(d[0]), 
        mon = parseInt(d[1]),
        year= parseInt(d[2]);
    if (d[2].length == 2) year += 2000;
    if (day <= 31 && mon <= 12 && year >= 2015)
      return new Date(year, mon - 1, day);
  
    return null; 
  }
}
