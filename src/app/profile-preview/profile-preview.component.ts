import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.css']
})
export class ProfilePreviewComponent {

  @Input() profile: any;
  username: string = '';

  ngOnInit(){
    this.username = this.profile.username;
  }
}
