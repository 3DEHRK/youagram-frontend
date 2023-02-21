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
          <div class="modal-header border-bottom-0">
            <h1 class="modal-title fs-5">Edit Profile</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
          </div>

          <div class="modal-body py-0">

            <div class="input-group mb-3 mt-3">
              <span class="input-group-text">Biography</span>
              <textarea class="form-control" aria-label="With textarea" placeholder="Traveller ✈️ Book Lover 📖 Obsessed with tacos 🌮" [(ngModel)]="this.profile.biography"></textarea>
            </div>

            <div class="input-group mb-3 mt-3">
              <span class="input-group-text" id="basic-addon1">Profile picture link</span>
              <input type="text" class="form-control" placeholder="https://" aria-label="Username" aria-describedby="basic-addon1" [(ngModel)]="this.profile.profilePictureLink">
            </div>

            <div class="input-group mb-3 mt-3">
              <span class="input-group-text" id="basic-addon1">Page Color</span>
              <input type="color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color">
            </div>

          </div>
          <div class="modal-footer flex-column border-top-0">
            <button type="button" class="btn btn-lg btn-primary w-100 mx-0 mb-2" (click)="saveChanges()">Save changes</button>
            <button type="button" class="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal" (click)="activeModal.close('Close click')">Close</button>
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
  testIcon: string = '';

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
        this.profile = res;

        //TODO: TEST
        let manipulate = this.profile.profilePictureLink;
        let index = manipulate.slice(8).indexOf('/')+9;
        this.testIcon = manipulate.slice(0,index)+'favicon.ico';
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
      this.apiService.updateProfile(this.profile).subscribe();
    })
  }
}
