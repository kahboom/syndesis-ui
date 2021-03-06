import {
  NotificationService as NS,
  NotificationType,
  Notification,
  Action
} from 'patternfly-ng';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

export class NotificationService extends NS {
  notificationsSubject = new BehaviorSubject<Notification[]>(
    this.getNotifications()
  );

  remove(notification: Notification): void {
    super.remove(notification);
    this.notificationsSubject.next(this.getNotifications());
  }

  message(
    type: string,
    header: string,
    message: string,
    isPersistent: boolean,
    primaryAction: Action,
    moreActions: Action[]
  ): void {
    super.message(
      type,
      header,
      message,
      isPersistent,
      primaryAction,
      moreActions
    );
    this.notificationsSubject.next(this.getNotifications());
  }

  getNotificationsObservable(): Observable<Notification[]> {
    return this.notificationsSubject.asObservable();
  }
}
