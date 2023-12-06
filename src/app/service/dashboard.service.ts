import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { endpoints } from './endpoints';

@Injectable({
    providedIn: 'root'
})

export class DashboardService {

    baseFactUrl: string = '';
    baseSunUrl: string = '';

    constructor(private http: HttpClient) {
        this.baseFactUrl = endpoints.Fact;
        this.baseSunUrl = endpoints.Sun;
    }

    public GetFact(): Observable<any> {
        return this.http.get<any>(this.baseFactUrl + "fact");
    }

    public GetSunInformation(param: string): Observable<any> {
        return this.http.get<any>(this.baseSunUrl + param);
    }
}