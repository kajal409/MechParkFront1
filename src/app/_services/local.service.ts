/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  constructor(private storageService: StorageService) {}
  setJsonValue(key: string, value: any): void {
    this.storageService.secureStorage.setItem(key, value);
  }
  getJsonValue(key: string): string {
    return this.storageService.secureStorage.getItem(key);
  }
  clear(): string {
    return this.storageService.secureStorage.clear();
  }
}
