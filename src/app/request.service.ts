import { Injectable } from '@angular/core';
import { iUser } from './interfaces/users';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class RequestService {

  private response : Response;
  private headers : Headers = new Headers({ 'Content-Type': 'application/json' });
  private firebaseUrl : string = 'https://application-172603.firebaseio.com/.json';
  private firebaseUrlGet : string = 'https://application-172603.firebaseio.com/';
  private firebaseUrlDelete : string = 'https://application-172603.firebaseio.com/';
  private firebasePostUrl : string = 'https://application-172603.firebaseio.com/';


  constructor(private http: Http) { 
  	console.log('request service invoked');
  }

  getAllUsers():Observable<any>{
       return this.http.get(this.firebaseUrl); 
  } 

  addUser(user) {
    return this.http
    .post(this.firebasePostUrl + 'user' + user.id + '.json', JSON.stringify(user), { headers: this.headers })
    .toPromise()
    .catch(this.handleError);
  }

  deleteUser(userKey) {
    return this.http
    .delete(this.firebaseUrlDelete + userKey + '.json', { headers: this.headers })
    .toPromise()
    .catch(this.handleError);
  }

  // getUser(url):Observable<any>{
  //      return this.http.get(url).map((response:Response) => {
  //        console.log(response.json());
  //   });
  // } 

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }  
}
