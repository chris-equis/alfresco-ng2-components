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
export class MetadataTagService {

    constructor(private authService: AlfrescoAuthenticationService) {}

    public addTag(nodeId: string, tagBody: string): Observable<Object> {
        return Observable
            .fromPromise(this.authService.getAlfrescoApi().core.tagsApi.addTag(nodeId, tagBody))
            .catch((e: Error) => Observable.of(e));
    }

    public getNodeTags(nodeId: string): Observable<Object> {
        return Observable
            .fromPromise(this.authService.getAlfrescoApi().core.tagsApi.getNodeTags(nodeId))
            .catch((e: Error) => Observable.of(e));
    }

    public removeTag(nodeId: string, tagId: string): Observable<Object> {
        return Observable
            .fromPromise(this.authService.getAlfrescoApi().core.tagsApi.removeTag(nodeId, tagId))
            .catch((e: Error) => Observable.of(e));
    }

    public updateTag(tagId: string, tagBody: string): Observable<Object> {
        return Observable
            .fromPromise(this.authService.getAlfrescoApi().core.tagsApi.updateTag(tagId, tagBody))
            .catch((e: Error) => Observable.of(e));
    }
}
