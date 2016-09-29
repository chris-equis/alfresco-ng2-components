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

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AlfrescoAuthenticationService} from 'ng2-alfresco-core';

@Injectable()
export class MetadataCommentService {

    constructor(private authService: AlfrescoAuthenticationService) {}

    private get commentsApi() {
        return this.authService.getAlfrescoApi().core.commentsApi;
    }

    public getNodeComments(nodeId: string): Observable<Object> {
        return Observable
            .fromPromise(this.commentsApi.getComments(nodeId))
            .catch((e: Error) => Observable.of(e));
    }

    public addComment(nodeId: string, content: string) {
        return Observable
            .fromPromise(this.commentsApi.addComment(nodeId, { content }))
            .catch((e: Error) => Observable.of(e));
    }

    public removeComment(nodeId: string, commentId: string) {
        return Observable
            .fromPromise(this.commentsApi.removeComment(nodeId, commentId))
            .catch((e: Error) => Observable.of(e));
    }

    public updateComment(nodeId: string, commentId: string, content: string) {
        return Observable
            .fromPromise(this.commentsApi.updateComment(nodeId, commentId, { content }))
            .catch((e: Error) => Observable.of(e));
    }
}
