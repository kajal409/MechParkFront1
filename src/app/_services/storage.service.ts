/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

// Environment
import { environment } from 'src/environments/environment';

const SECRET_KEY = environment.secretKey;
// Fix : require error in TS
const SecureStorage = require('secure-web-storage');
@Injectable()
export class StorageService {
  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key: string | CryptoJS.lib.WordArray) {
      key = CryptoJS.SHA256(key, { SECRET_KEY });
      return key.toString();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    encrypt: function encrypt(data: any) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);
      data = data.toString();
      return data;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    decrypt: function decrypt(data: any) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    }
  });
}
