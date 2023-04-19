import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient, private constants: ConstantsService) { }


  getData(body: any) {

    body = new URLSearchParams(Object.entries(body)).toString();
    return this.http.request("POST", this.constants.url,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: body,
        responseType: 'text',
      }
    );

  }
}
