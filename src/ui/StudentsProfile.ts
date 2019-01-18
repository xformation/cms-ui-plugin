import init from '../domain/student/StudentProfile/StudentsApp';

export class StudentsProfilePage {
  static templateUrl = '/partials/studentprofile.html';
  constructor() {
    init();
  }
}
