import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserInfo } from 'src/app/refactored-spoon/models/food.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  form: FormGroup;
  @Input() type: string;
  @Output() userInfo = new EventEmitter<UserInfo>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

   submit() {
     this.userInfo.emit({username: this.form.value.email, password: this.form.value.password});
   }
}
