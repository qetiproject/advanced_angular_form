import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EmailValidatorService {
    // constructor(private http: HttpClient) {}

    // checkEmailExists(email: string): Observable<boolean> {
    //    return this.http.get<unknown>(`https://api.example.com/check-email?email=${email}`).pipe(
    //         map((response) => response?.exists),
    //         catchError(() => [false])
    //     )
    // }
}