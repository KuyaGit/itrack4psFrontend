import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-childbeneficiary',
  templateUrl: './childbeneficiary.component.html',
  styleUrls: ['./childbeneficiary.component.scss']
})
export class ChildbeneficiaryComponent {

  childbeneficiary : FormGroup;
  constructor(
    private fb = FormBuilder
  ) {
    this.childbeneficiary =
  }
}
