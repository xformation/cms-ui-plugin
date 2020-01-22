import init from '../domain/student/TabApp';

export class StudentsTabPage {
  static templateUrl = '/partials/studentstab.html';
  constructor() {
    init();
  }
}
