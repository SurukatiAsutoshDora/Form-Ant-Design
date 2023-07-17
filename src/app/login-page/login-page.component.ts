import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  validateForm!: UntypedFormGroup;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
   
  };
  radioValue:any = 'A';


  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      
    } else {
      console.log("something is not correct")
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls['checkPassword'].updateValueAndValidity());
  }

  confirmationValidator = (control: UntypedFormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.minLength(3),Validators.required]],
      datePicker:[null,[Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumberPrefix: ['+91'],
      phoneNumber: [null, [Validators.required]],
      radioGroup:[null,[Validators.required]],
      comment: ['', [Validators.minLength(4),Validators.required]],
      role:[null, [Validators.required]],
      agree: [false]
    });
  }

  // getMailErrorMsg(controlName: string): string | null {
  //   const control: AbstractControl | null = this.validateForm.get(controlName);
  //   if (control && control.hasError('required')) {
  //     return 'Email is required.';
  //   }
  //   if (control && control.hasError('minlength')) {
  //     return 'Email is not in proper format.';
  //   }
  //   return "";
  // }

  getUserErrorMsg(controlName: string): string | null {
    const control: AbstractControl | null = this.validateForm.get(controlName);
    if (control && control.hasError('required')) {
      return 'Username is required.';
    }
    if (control && control.hasError('minlength')) {
      return 'Username should be at least 5 characters long.';
    }
    return "";
  }
  
}
