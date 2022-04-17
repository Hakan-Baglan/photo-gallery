/* eslint-disable @typescript-eslint/no-shadow */
import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ActionSheetController } from '@ionic/angular';
import { PhotoService, UserPhoto } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PHOTO_STORAGE: any;
  photos: any;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  constructor(public photoService: PhotoService,
    public actionSheetController: ActionSheetController) {}
  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  addPhotoGallery(){
    this.photoService.addNewPhotoGallery();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }

}
