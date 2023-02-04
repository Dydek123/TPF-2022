import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  form: FormGroup

  constructor(private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit() {
    this.router.navigate(['/szukaj'], {queryParams: this.form.value});
  }

  private createForm() {
    this.form = this.formBuilder.group({
      startPoint: [],
      destination: [],
      date: []
    })
  }
}
