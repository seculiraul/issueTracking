import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from '../../models/Issue';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private issueUrl = 'http://localhost:3000/issues';
  constructor(private http: HttpClient) {}

  getIssues(): Observable<Issue[]> {
    return this.http
      .get<Issue[]>(this.issueUrl)
      .pipe(catchError(this.handleError<Issue[]>('Failed to get issues')));
  }

  getIssueById(id: string): Observable<Issue> {
    return this.http
      .get<Issue>(`${this.issueUrl}/${id}`)
      .pipe(
        catchError(
          this.handleError<Issue>(`Failed to get issue with id: ${id}`)
        )
      );
  }

  createIssue(data: Issue): Observable<Issue> {
    return this.http
      .post<Issue>(this.issueUrl, data)
      .pipe(catchError(this.handleError<Issue>('Failed to create new Issue')));
  }

  editIssue(data: Issue): Observable<Issue> {
    const url = `${this.issueUrl}/${data?.id}`;
    return this.http
      .put<Issue>(url, data)
      .pipe(
        catchError(
          this.handleError<Issue>(`Failed to edit issue with id: ${data?.id}`)
        )
      );
  }
  removeIssue(id: string): Observable<void> {
    const url = `${this.issueUrl}/${id}`;
    return this.http
      .delete<void>(url)
      .pipe(
        catchError(
          this.handleError<void>(`Failed to remove issue with id: ${id}`)
        )
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.log(error);
      console.log(operation);
      return of(result as T);
    };
  }
}
