import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ApiService} from "../api.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'modal-content',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <input [(ngModel)]="this.profile.biography" type="text">
      <br>
      <input [(ngModel)]="this.profile.profilePictureLink" type="text">
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
      <button type="button" class="btn btn-outline-dark" (click)="saveChanges()">Save</button>
    </div>
  `
})
export class ModalContent{
  @Input() profile: any;
  @Output() passProfile: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {
  }

  saveChanges(){
    this.passProfile.emit(this.profile);
    this.activeModal.close('Click save');
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileUsername: string = '';
  editable: boolean = false;

  public profile = {
    biography: '',
    profilePictureLink: ''
  }

  constructor(private route: ActivatedRoute,
              private apiService: ApiService,
              private router: Router,
              private modalService: NgbModal) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.profileUsername = params['id'];
      this.apiService.getProfileByName(this.profileUsername).subscribe(res => {
        if (!res)
          this.router.navigateByUrl('');
        //@ts-ignore
        this.profile.biography = res.biography;
        //@ts-ignore
        this.profile.profilePictureLink = res.profilePictureLink;
      });
    })
    this.apiService.username.subscribe(val=>{
      this.editable = this.profileUsername.toLowerCase() === val.toLowerCase();
    })
  }

  openEditModal(){
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.profile = Object.assign({}, this.profile);
    modalRef.componentInstance.passProfile.subscribe((value: any)=>{
      this.profile = value;
      this.apiService.updateProfile(this.profile).subscribe(value1 => {
        console.log(value1);
      });
    })
  }
}
