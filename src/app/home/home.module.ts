import { TabsComponent } from './components/tabs/tabs.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';
import { AdvertisingComponent } from './components/advertising/advertising.component';
import { ModalComponent } from './components/start-post/modal/modal.component';
import { StartPostComponent } from './components/start-post/start-post.component';
import { ProfileSummaryComponent } from './components/profile-summary/profile-summary.component';
import { PopoverComponent } from './components/header/popover/popover.component';
import { HeaderComponent } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,
    HeaderComponent,
    PopoverComponent,
    ProfileSummaryComponent,
    StartPostComponent,
    ModalComponent,
    AdvertisingComponent,
    AllPostsComponent,
    TabsComponent
  ]
})
export class HomePageModule {}
