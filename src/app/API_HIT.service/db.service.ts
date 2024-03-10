import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { updateModel } from "../components/login-signup/json.model";


@Injectable({
    providedIn: 'root'
})
export class DBservice {
    constructor(private http: HttpClient) { }
    headers = new HttpHeaders().set('content-Type', 'application/json').set('Accept','application/json')
    httpOptions = {headers : this.headers}

    // POST api hitting
    postSignup(data: any) {
        return this.http.post<any>("http://localhost:3000/posts", data)
            .pipe(map((res: any) => {
                return res;
            }))
    }
    //GET api hitting
    getSignup(gdata: any) {
        return this.http.get<any>("http://localhost:3000/posts", gdata)
            .pipe(map((res: any) => {
                return res;
            }))
    }
    //DELETE api hitting
    deleteSignup(id: number) {
        return this.http.delete<any>("http://localhost:3000/posts/" + id)
            .pipe(map((res: any) => {
                return res;
            }))  
    }
    //UPDATE api hitting function for get raw of data by url params id
    getSignupById(id:number):Observable<updateModel>{
        return this.http.get<updateModel>("http://localhost:3000/posts/"+ id,this.httpOptions)
        .pipe(map((res: any) => {
            return res;
        }))

    }
    updateSignupData(updateModelObject : any): Observable<updateModel>{
        return this.http.put<updateModel>("http://localhost:3000/posts/"+ updateModelObject.id, updateModelObject, this.httpOptions)
        .pipe(map(() => updateModelObject))
    }
}