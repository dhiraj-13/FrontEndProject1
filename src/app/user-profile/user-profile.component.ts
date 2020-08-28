import { Component, OnInit, Inject } from "@angular/core";
import { UserServiceService } from "../shared/user-service.service";
import { user } from "../model/use.model";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MAT_DIALOG_DATA, MatChipInputEvent } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from "@angular/forms";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

import { Observable, interval } from "rxjs";
import { mimeType } from "../home-page/mime-type.validator";
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  userData: any = [];

  mockUrl: string = "http://localhost:3000/user/";
  base64Image: any;
  constructor(
    private userService: UserServiceService,
    private http: HttpClient,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.getUser(id);
  }

  openDialog() {
    this.userService.setImageBase64(this.userData[0].image);
    const dialogRef = this.dialog.open(UserEditForm, {
      data: this.userData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getUser(id) {
    return this.http.get(this.mockUrl + id).subscribe((data: any) => {
      this.userData.push(data);
      this.base64Image = this.userData[0].image;
    });
  }

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
  }
}

@Component({
  selector: "user-edit-form",
  templateUrl: "./user-edit-form.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserEditForm {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  index: number = 0;
  numImages: number = 4;
  imagesLoaded: number = 0;
  loading: boolean = true;

  selectedFile = null;
  age: any = 25;
  base64Image2: string;
  constructor(
    private FormBuilder2: FormBuilder,
    private userService: UserServiceService,
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public dataModule: any,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.getCountryList();
    this.getStateList();
  }

  userForm: FormGroup;
  countryList: any;
  stateList: any;
  label: boolean = false;
  company: boolean = false;
  home: boolean = false;
  base64Image: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  imagePreview: string;

  displayedRows$: Observable<any>;

  ngOnInit() {
    this.base64Image2 = this.userService.getImageBase64();
    this.userForm = this.FormBuilder2.group({
      firstname: ["", [Validators.required]],
      lastname: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobile: ["", [Validators.required]],
      age: ["", [Validators.required]],
      country: ["", [Validators.required]],
      state: ["", [Validators.required]],
      companyAddress1: ["", [Validators.required]],
      companyAddress2: [""],
      homeAddress2: [""],
      homeAddress1: ["", [Validators.required]],
      hobbies: new FormControl(
        ["Football", "Hockey", "Tennis"],
        Validators.required
      ),
      box: ["false"],
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    this.userForm.controls["firstname"].setValue(this.dataModule[0].firstname);
    this.userForm.controls["lastname"].setValue(this.dataModule[0].lastname);
    this.userForm.controls["email"].setValue(this.dataModule[0].email);
    this.userForm.controls["mobile"].setValue(this.dataModule[0].mobile);
    this.userForm.controls["age"].setValue(this.dataModule[0].age);
    this.userForm.controls["country"].setValue(this.dataModule[0].country);
    this.userForm.controls["state"].setValue(this.dataModule[0].state);
    this.userForm.controls["homeAddress1"].setValue(
      this.dataModule[0].homeAddress1
    );
    this.userForm.controls["homeAddress2"].setValue(
      this.dataModule[0].homeAddress2
    );
    this.userForm.controls["companyAddress1"].setValue(
      this.dataModule[0].companyAddress1
    );
    this.userForm.controls["companyAddress2"].setValue(
      this.dataModule[0].companyAddress2
    );
    this.userForm.controls["image"].setValue(this.dataModule[0].image);
    this.userForm.controls["hobbies"].setValue(this.dataModule[0].hobbies);
  }
  userData: any = [];

  getUser(id) {
    return this.http.get(this.mockUrl + id).subscribe((data: any) => {
      this.userData.push(data);
      this.base64Image = this.userData[0].image;
    });
  }
  get hobbies() {
    return this.userForm.get("hobbies");
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || "").trim()) {
      this.hobbies.setValue([...this.hobbies.value, value.trim()]);
      this.hobbies.updateValueAndValidity();
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(fruit: string): void {
    const index = this.hobbies.value.indexOf(fruit);

    if (index >= 0) {
      this.hobbies.value.splice(index, 1);
      this.hobbies.updateValueAndValidity();
    }
  }
  getCountryList() {
    this.countryList = this.country;
  }

  getStateList() {
    this.stateList = this.states;
  }

  country: any[] = [
    { value: "", label: "Country" },
    { value: "India", label: "India" },
    { value: "Uganda", label: "Uganda" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
  ];

  states: any[] = [
    { value: "", label: "State" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
  ];

  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image2);
  }

  onImagePicked(event) {
    this.selectedFile = event.target.files[0];

    const file = (event.target as HTMLInputElement).files[0];
    this.userForm.patchValue({ image: file });
    this.userForm.get("image").updateValueAndValidity;
    // this.userForm.controls['image'].setValue(this.imagePreview);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.userForm.controls["image"].setValue(this.imagePreview);

      this.base64Image2 = this.imagePreview;
    };
    reader.readAsDataURL(file);
  }

  mockUrl: string = "http://localhost:3000/user/";
  onUpdateUser(userForm: user[], id) {
    this.http.put(this.mockUrl + id, userForm).subscribe(
      (result: any) => {
        this.router.navigateByUrl("/UserProfile/" + result.id);
      },
      (error) => {
        console.log("Error", error);
      }
    );
  }
}
