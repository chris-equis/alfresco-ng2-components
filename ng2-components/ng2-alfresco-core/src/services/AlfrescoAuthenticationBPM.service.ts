/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AbstractAuthentication } from '../interface/authentication.interface';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AlfrescoAuthenticationBase } from './AlfrescoAuthenticationBase.service';
import { AlfrescoSettingsService } from './AlfrescoSettingsService.service';

export class AlfrescoAuthenticationBPM extends AlfrescoAuthenticationBase implements AbstractAuthentication {

    TYPE: string = 'BPM';
    private token: string;

    constructor(private alfrescoSettingsService: AlfrescoSettingsService,
                private http: Http) {
        super(alfrescoSettingsService, http);
    }

    /**
     * Perform a login on behalf of the user and store the ticket returned
     *
     * @param username
     * @param password
     * @returns {Observable<R>|Observable<T>}
     */
    login(username: string, password: string): Observable<any> {
        return Observable.fromPromise(this.apiActivitiLogin(username, password))
            .map((response: any) => {
                this.token = response.status;
                return this.token;
                // return {name: this.TYPE, token: response.status};
            })
            .catch(this.handleError);
    }

    /**
     * Delete the current login ticket from the server
     *
     * @returns {Observable<R>|Observable<T>}
     */
    logout() {
        return Observable.fromPromise(this.apiActivitiLogout())
            .map(res => <any> res)
            .do(response => {
                this.removeToken(this.TYPE);
            })
            .catch(this.handleError);
    }

    /**
     * The method return true if the user is logged in
     * @returns {boolean}
     */
    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    private apiActivitiLogin(username: string, password: string) {
        let url = 'http://localhost:9999/activiti-app/app/authentication';
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({headers: headers});
        let data = 'j_username='
            + encodeURIComponent(username)
            + '&j_password='
            + encodeURIComponent(password)
            + '&_spring_security_remember_me=true&submit=Login';

        return this.http
            .post(url, data, options).toPromise();
    }

    private apiActivitiLogout() {
        let url = 'http://localhost:9999/activiti-app/app/logout';
        return this.http.get(url).toPromise();
    }

    public getToken (): string {
        return localStorage.getItem(`token-${this.TYPE}`);
    }

    /**
     * The method save the toke in the localStorage
     * @param token
     */
    public saveToken(): void {
        if (this.token) {
            super.saveToken(this.TYPE, this.token);
        }
    }

}