import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Params} from '../model/Params.model';


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  private readonly host: string;

  constructor(private http: HttpClient) {
    this.host = environment.host;
  }


  /**
   * Returns an array of available lessons.
   * **/
  getLessons() {
    return this.http.get(this.host + environment.urlLessons, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
  }

  /**
   * Create homework
   * **/
  createHomework(params: Params) {
    return this.http.post(`${this.host + environment.urlCreateHomeWorks}`, params, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
