import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent {

  @Input() link: any;
  faviconUrl = '';

  ngOnInit(){
    let manipulate = this.link.url;
    let index = manipulate.slice(8).indexOf('/')+9;
    this.faviconUrl = manipulate.slice(0,index)+'favicon.ico';
  }
}
