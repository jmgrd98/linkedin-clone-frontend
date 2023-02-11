import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(public modalController:ModalController) { }

  ngOnInit() {}

  onPost(){

  }

  onDismiss(){
    this.modalController.dismiss();
    
  }

}
