import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CourseList } from './course-list';
import { Course } from '../../models/course.model';
import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS102', credits: 3, gradeStatus: 'failed' }
  ];

  const initialState = {
    course: { courses: mockCourses, loading: false, error: null },
    enrollment: { enrolledCourseIds: [] }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParamMap: { get: (key: string) => null } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course cards matching the initial state', () => {
    const items = fixture.debugElement.queryAll(By.css('.course-item'));
    expect(items.length).toBe(2);

    const firstTitle = items[0].query(By.css('h3')).nativeElement.textContent;
    expect(firstTitle).toContain('Data Structures');
  });

  it('should show the loading indicator when loading state is true', () => {
    store.overrideSelector(selectCoursesLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const loadingEl = fixture.debugElement.query(By.css('p'));
    expect(loadingEl.nativeElement.textContent).toContain('Loading courses');
  });
}); 