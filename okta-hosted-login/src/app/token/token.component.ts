/*!
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {Component, OnInit} from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';

import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {
  idToken;
  accessToken;
  decodeIdToken;
  decodeAccessToken;
  jwtHelperService = new JwtHelperService();

  constructor(public oktaAuth: OktaAuthService) {

  }

  async ngOnInit() {
    this.idToken = await this.oktaAuth.getIdToken();
    this.accessToken = await this.oktaAuth.getAccessToken();
    this.decodeIdToken = this.jwtHelperService.decodeToken(this.idToken);
    console.log(this.decodeIdToken);
    this.decodeAccessToken = this.jwtHelperService.decodeToken(this.accessToken);
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  copyAccessToken() {
    this.copyText(this.accessToken);
  }

  copyIdToken() {
    this.copyText(this.idToken);
  }

  /* To copy any Text */
  copyText(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
