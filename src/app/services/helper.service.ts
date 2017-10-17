import { Injectable } from '@angular/core';

@Injectable()
export class HelperService {

  constructor() { }

  getDateFormatYYYYMMddHHmmssDash(date: Date) : string {
    let dateResult : string = "";
    let partHour : string = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    dateResult = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " "+partHour;
    return dateResult;
  }

}
