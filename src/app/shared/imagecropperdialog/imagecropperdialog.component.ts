import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
export type CropperDialogData = {
  image: File;
  width: number;
  height: number;
};

export type CropperDialogResult = {
  blob: Blob;
  imageUrl: string;
};

@Component({
  selector: 'app-imagecropperdialog',
  templateUrl: './imagecropperdialog.component.html',
  styleUrls: ['./imagecropperdialog.component.scss']
})
export class ImagecropperdialogComponent {
  
  data: CropperDialogData = inject(MAT_DIALOG_DATA);

  result = signal<CropperDialogResult | undefined>(undefined);

  imageCropped(event: ImageCroppedEvent) {
    const { blob, base64 } = event;
    if (blob && base64) {
      const image = new Image();
      image.src = URL.createObjectURL(blob);
      this.result.set({ blob, imageUrl: base64 });
    }
  }
}
