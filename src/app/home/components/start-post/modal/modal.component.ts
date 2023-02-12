import { ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @ViewChild('form') form: FormGroup;

  constructor(
    public modalController:ModalController,
    public fb: FormBuilder,
    ) { 

      this.form = fb.group({
        title: fb.control('', Validators.required)
      })
    }

  ngOnInit() {}

  onPost(){
    if(!this.form.valid) return;

    const body = this.form.value['body'];
    this.modalController.dismiss({
      post: {
        body,
        createdAt: new Date(),
      },
     },
     'post'
     );
  }

  onDismiss(){
    this.modalController.dismiss();
  }

}
