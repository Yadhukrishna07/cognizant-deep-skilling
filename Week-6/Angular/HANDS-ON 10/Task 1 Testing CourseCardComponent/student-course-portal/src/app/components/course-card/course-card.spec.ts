import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CourseCard } from './course-card';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;
  let store: MockStore;

  const mockCourse = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        provideRouter([]),
        provideMockStore({
          selectors: [
            { selector: selectEnrolledIds, value: [] }
          ]
        })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
  });

  // Test 1 - should create
  it('should create', () => {
    component.course = mockCourse;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // Test 2 - @Input rendering
  it('should render the course name from the @Input', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    const nameEl = fixture.debugElement.query(By.css('h3'));
    expect(nameEl.nativeElement.textContent).toContain('Data Structures');
  });

  // Test 3 - @Output emission
  it('should emit enrollRequested with the course id when Enroll is clicked', () => {
    component.course = mockCourse;
    fixture.detectChanges();

    spyOn(component.enrollRequested, 'emit');

    const enrollBtn = fixture.debugElement.query(By.css('.enroll-btn'));
    enrollBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  // Test 4 - ngOnChanges logs previous/current values
  it('should log previous and current course values on ngOnChanges', () => {
    spyOn(console, 'log');

    component.course = mockCourse;

    const changes = {
      course: {
        previousValue: undefined,
        currentValue: mockCourse,
        firstChange: true,
        isFirstChange: () => true
      }
    };

    component.ngOnChanges(changes as any);

    expect(console.log).toHaveBeenCalledWith('Previous course:', undefined);
    expect(console.log).toHaveBeenCalledWith('Current course:', mockCourse);
  });
});