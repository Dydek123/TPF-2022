import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TravellService} from "../../services/travell.service";
import {AuthService} from "../../services/auth.service";
import {FormUtils} from "../../shared/utils/form.utils";

@Component({
  selector: 'app-new-travell',
  templateUrl: './new-travell.component.html',
  styleUrls: ['./new-travell.component.scss']
})
export class NewTravellComponent implements OnInit {

  form: FormGroup;
  successSubmit: boolean;
  errorMessage: string;

  @ViewChild('firstInput') input: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private travellService: TravellService,
              private authService: AuthService) {
  }

  get timer(): number {
    return FormUtils.TIMER_SECONDS;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      destination: ['', Validators.required],
      startPoint: ['', Validators.required],
      date: ['', Validators.required],
      freeSpace: ['', Validators.required],
      car: [],
      duration: [],
      userId: [],
      cost: ['', Validators.required]
    })
    this.setUserId();
  }

  onSubmit() {
    this.travellService.add(this.form.value)
      .subscribe(() => {
        this.successSubmit = true;
        FormUtils.startTimer();
        this.restoreTravelForm();
      }, error => {
        this.errorMessage = error;
      });
  }

  private restoreTravelForm() {
    setTimeout(() => {
      this.successSubmit = false;
      this.form.reset();
      FormUtils.pauseTimer();
    }, FormUtils.RESET_TIMEOUT_MILISECONDS);
  }

  private setUserId() {
    this.authService.getUser().subscribe(user => {
      this.form.patchValue({userId: user?.uid});
    });
  }
}
