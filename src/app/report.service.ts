import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { get } from 'lodash-es';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getHeaders = (req, tokens) => {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    if (req.hasOwnProperty('authToken')) {
      headers = headers.set(
        'Authorization',
        req.authToken.replace(/\${{([A-Za-z0-9_\-\.\[\]]*)}}/g, (_, p) => {
          console.log(p, tokens);

          return get(tokens, p, p);
        })
      );
    }
    return headers;
  };

  makePOSTreq(req, baseURL = '', tokens = {}) {
    return this.http.post(baseURL + req.url, req.body, {
      headers: this.getHeaders(req, tokens),
    });
  }

  makeGETreq(req, baseURL = '', tokens = {}) {
    return this.http.get(baseURL + req.url, {
      headers: this.getHeaders(req, tokens),
    });
  }
}
