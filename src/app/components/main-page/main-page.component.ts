import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TravellService} from "../../services/travell.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  form: FormGroup

  constructor(private formBuilder: FormBuilder,
              private travelService: TravellService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      startPoint: [],
      destination: [],
      date: []
    })
  }

  onSubmit() {
    this.router.navigate(['/szukaj'], {queryParams: this.form.value});
  }
}
