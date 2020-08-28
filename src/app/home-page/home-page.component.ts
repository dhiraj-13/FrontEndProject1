import { Component, OnInit, Inject } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { user } from "../model/use.model";
import {
  MAT_DIALOG_DATA,
  MatChipInputEvent,
  MatDialog,
} from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Router, ActivatedRoute } from "@angular/router";
import { interval } from "rxjs";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { mimeType } from "./mime-type.validator";
@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"],
  animations: [
    trigger("flyInOut", [
      state("in", style({ transform: "translateX(0)" })),
      transition("void => *", [
        style({ transform: "translateX(-100%)" }),
        animate(200),
      ]),
      transition("* => void", [
        animate(200, style({ transform: "translateX(100%)" })),
      ]),
    ]),
  ],
})
export class HomePageComponent implements OnInit {
  constructor(
    public dialog: MatDialog
  ) {}


  index: number = 0;
  numImages: number = 4;
  imagesLoaded: number = 0;
  loading: boolean = true;
  imagesUrl = [
    "https://www.gstatic.com/webp/gallery/1.jpg",
    "https://www.gstatic.com/webp/gallery/4.jpg",
    "https://homepages.cae.wisc.edu/~ece533/images/goldhill.png",
    "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png",
  ];

  ngOnInit() {
    this.imagesUrl.forEach((x, index) => {
      const image = new Image();
      image.onload = () => {
        this.imagesLoaded++;
        this.loading = this.imagesLoaded != this.numImages;
      };
      image.src = x;
    });
    interval(5000).subscribe(() => {
      if (!this.loading) this.index = (this.index + 1) % this.numImages;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserDataSave, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}





@Component({
  selector: "user-data-save",
  templateUrl: "./user-data-save.html",
  styleUrls: ["./home-page.component.css"],
})
export class UserDataSave {
  constructor(
    private FormBuilder2: FormBuilder,
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public dataModule: any,
    private route: ActivatedRoute
  ) {
    this.getCountryList();
    this.getStateList();
  }

  userForm: FormGroup;
  label: boolean = false;
  company: boolean = false;
  home: boolean = false;
  countryList: any;
  stateList: any;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  index: number = 0;
  numImages: number = 4;
  imagesLoaded: number = 0;
  loading: boolean = true;

  selectedFile = null;
  age: any = 25;
  data1: 96;
  imagePreview: string;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  namePattern = "^[a-zA-z]{2,20}$";
  ngOnInit() {
    this.userForm = this.FormBuilder2.group({
      firstname: [
        "",
        [Validators.required, Validators.pattern(this.namePattern)],
      ],
      lastname: [
        "",
        Validators.required,
        ,
        Validators.pattern(this.namePattern),
      ],
      email: ["", [Validators.required, Validators.email]],
      mobile: [
        "",
        [Validators.required, Validators.pattern(this.mobnumPattern)],
      ],
      age: ["25", [Validators.required]],
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
  }
  userData: any = [];

  getUser(id) {
    return this.http.get(this.mockUrl + id).subscribe((data: any) => {
      this.userData.push(data);
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



  country: any[] = [
    { value: "", label: "Country" },
    { value: "India", label: "India" },
    { value: "Iceland", label: "Iceland" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "	Australia", label: "	Australia" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "Antarctica", label: "Antarctica" },
  ];

  getCountryList() {
    this.countryList = this.country;
  }


  states: any[] = [
    { value: "", label: "State" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Goa", label: "Goa" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Kerala", label: "Kerala" },
    { value: "Kashmir", label: "Kashmir" },
    { value: "Punjab", label: "Punjab" },
  ];

  getStateList() {
    this.stateList = this.states;
  }

  mockUrl: string = "http://localhost:3000/user";
  onAddUser(userForm: user[]) {
    this.http.post(this.mockUrl, userForm).subscribe(
      (result: any) => {
        this.router.navigateByUrl("/UserProfile/" + result.id);
      },
      (error) => {
        console.log("Error", error);
      }
    );
  }
  onImagePicked(event) {
    this.selectedFile = event.target.files[0];

    const file = (event.target as HTMLInputElement).files[0];
    this.userForm.patchValue({ image: file });
    this.userForm.get("image").updateValueAndValidity;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.userForm.controls["image"].setValue(this.imagePreview);
    };
    reader.readAsDataURL(file);
  }
}
