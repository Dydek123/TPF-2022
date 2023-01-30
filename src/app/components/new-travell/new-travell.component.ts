import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TravellService} from "../../services/travell.service";

@Component({
  selector: 'app-new-travell',
  templateUrl: './new-travell.component.html',
  styleUrls: ['./new-travell.component.scss']
})
export class NewTravellComponent implements OnInit {

  form: FormGroup;
  successSubmit: boolean;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private travellService: TravellService) {
  }

  ngOnInit(): void {
    this.travellService.getAll().subscribe(travel => console.log(travel))
    this.form = this.formBuilder.group({
      destination: [Validators.required],
      startPoint: [Validators.required],
      date: [Validators.required],
      freeSpace: [Validators.required],
      car: [],
      duration: []
    })
  }

  onSubmit() {
    this.travellService.add(this.form.value)
      .subscribe(() => {
        this.successSubmit = true;
        this.restoreTravelForm();
      }, error => {
        this.errorMessage = error;
      });
  }

  private restoreTravelForm() {
    setTimeout(() => {
      this.successSubmit = false;
      this.form.reset();
    }, 5000);
  }
}
