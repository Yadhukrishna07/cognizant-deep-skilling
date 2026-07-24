import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

import {
  enrollInCourse,
  unenrollFromCourse
} from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  imports: [
    CommonModule,
    RouterLink,
    Highlight,
    CreditLabelPipe
  ],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges, OnInit, OnDestroy {

  @Input() course!: {
    id: number;
    name: string;
    code: string;
    credits: number;
    gradeStatus?: string;
    enrolled?: boolean;
  };

  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  private enrolledIds: (number | string)[] = [];
  private subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.subscription.add(
      this.store.select(selectEnrolledIds).subscribe(ids => {
        this.enrolledIds = ids;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course']) {
      console.log(
        'Previous course:',
        changes['course'].previousValue
      );

      console.log(
        'Current course:',
        changes['course'].currentValue
      );
    }
  }

  onEnrollClick() {
    if (this.isEnrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
    }

    this.enrollRequested.emit(this.course.id);
  }

  get isEnrolled(): boolean {
    return this.enrolledIds.includes(this.course.id);
  }

  get enrollButtonLabel(): string {
    return this.isEnrolled ? 'Unenroll' : 'Enroll';
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  get statusBorderStyle() {
    const colorMap: any = {
      passed: 'green',
      failed: 'red',
      pending: 'grey'
    };

    return {
      'border-left':
        `5px solid ${colorMap[this.course.gradeStatus || 'pending']}`
    };
  }

  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }
}