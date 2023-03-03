import {Component, Input} from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {

  constructor(private apiService: ApiService) {
  }

  @Input() link: any;
  faviconUrl = '';

  ngOnInit(){
    let manipulate = this.link.url;
    let index = manipulate.slice(8).indexOf('/')+9;
    this.faviconUrl = manipulate.slice(0,index)+'favicon.ico';
  }

  delete(){
    this.apiService.deleteLink(this.link.linkId);
  }
}
