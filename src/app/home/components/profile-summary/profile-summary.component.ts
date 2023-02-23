import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {Role} from "../../../auth/models/User";
import {take} from "rxjs";

type BannerColors = {
  colorOne: string;
  colorTwo: string;
  colorThree: string;
}
@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss'],
})
export class ProfileSummaryComponent implements OnInit {

  bannerColors: BannerColors = {
    colorOne: '#a0b4b7',
    colorTwo: '#dbe7e9',
    colorThree: '#bfd3d6'
  }
  constructor(private authService: AuthService,) { }

  ngOnInit() {
    this.authService.userRole.pipe(take(1)).subscribe((role: Role) => {

    })
  }

}
