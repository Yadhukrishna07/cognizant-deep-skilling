import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { CommonModule } from '@angular/common';

// Custom synchronous validator
export function noCourseCode(
  control: AbstractControl
): ValidationErrors | null {

  const value = control.value;

  if (
    value &&
    typeof value === 'string' &&
    value.startsWith('XX')
  ) {
    return { noCourseCode: true };
  }

  return null;
}

// Custom async validator
export function simulateEmailCheck(
  control: AbstractControl
): Promise<ValidationErrors | null> {

  return new Promise((resolve) => {

    setTimeout(() => {

      if (
        control.value &&
        control.value.includes('test@')
      ) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }

    }, 800);

  });
}

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit {

  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.enrollForm = this.fb.group({

      studentName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      studentEmail: this.fb.control(
        '',
        [
          Validators.required,
          Validators.email
        ],
        [
          simulateEmailCheck
        ]
      ),

      courseId: [
        '',
        [
          Validators.required,
          noCourseCode
        ]
      ],

      preferredSemester: [
        'Odd',
        Validators.required
      ],

      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],

      additionalCourses: this.fb.array([])

    });

  }

  get additionalCourses() {
    return this.enrollForm.get(
      'additionalCourses'
    ) as FormArray;
  }

  addCourse() {
    this.additionalCourses.push(
      new FormControl('', Validators.required)
    );
  }

  removeCourse(index: number) {
    this.additionalCourses.removeAt(index);
  }

  onSubmit() {

    console.log(
      'Form value:',
      this.enrollForm.value
    );

    console.log(
      'Raw value:',
      this.enrollForm.getRawValue()
    );

    // Form has been successfully handled
    this.enrollForm.markAsPristine();
  }

  canDeactivate(): boolean {

    if (this.enrollForm && this.enrollForm.dirty) {

      return confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );

    }

    return true;
  }
}