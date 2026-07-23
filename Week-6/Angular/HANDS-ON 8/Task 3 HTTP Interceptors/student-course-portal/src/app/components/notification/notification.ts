import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification';

// This component provides NotificationService at the component level using
// the `providers` array below, instead of relying on the root-level singleton
// (providedIn: 'root'). This creates a NEW, separate instance of NotificationService
// scoped only to this component (and any of its children) — it is NOT shared with
// other components in the app, unlike CourseService or EnrollmentService.
// This is useful when you want isolated state per component instance, e.g. if
// multiple NotificationComponents were used in different parts of the app, each
// would have its own independent list of messages rather than sharing one global list.
@Component({
  selector: 'app-notification',
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
  providers: [NotificationService]
})
export class Notification {
  newMessage = '';

  constructor(private notificationService: NotificationService) {}

  addMessage() {
    if (this.newMessage.trim()) {
      this.notificationService.addMessage(this.newMessage);
      this.newMessage = '';
    }
  }

  get messages(): string[] {
    return this.notificationService.getMessages();
  }
}