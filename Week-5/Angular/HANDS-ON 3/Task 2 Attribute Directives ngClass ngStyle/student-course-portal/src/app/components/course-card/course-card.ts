import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-card',
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input() course!: { id: number, name: string, code: string, credits: number, gradeStatus?: string, enrolled?: boolean };
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['course']) {
      console.log('Previous course:', changes['course'].previousValue);
      console.log('Current course:', changes['course'].currentValue);
    }
  }

  onEnrollClick() {
    this.enrollRequested.emit(this.course.id);
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  // Step 30: border colour based on gradeStatus
  get statusBorderStyle() {
    const colorMap: any = { passed: 'green', failed: 'red', pending: 'grey' };
    return { 'border-left': `5px solid ${colorMap[this.course.gradeStatus || 'pending']}` };
  }

  // Step 32: getter keeps the template clean — avoids inline object
  // literals scattered in HTML and centralises the class logic in one place
  get cardClasses() {
    return {
      'card--enrolled': !!this.course.enrolled,
      'card--full': this.course.credits >= 4,
      'expanded': this.isExpanded
    };
  }
}