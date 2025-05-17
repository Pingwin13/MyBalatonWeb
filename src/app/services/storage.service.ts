import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {}

  async uploadFile(file: File, path: string): Promise<string> {
    const fileRef = ref(this.storage, path);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  }
} 