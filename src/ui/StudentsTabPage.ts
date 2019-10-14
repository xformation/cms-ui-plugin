import init from '../domain/student/StudentsTab/StudentsTabApp';

export class StudentsTabPage {
    static templateUrl = '/partials/studentstab.html';
    constructor() {
        init();
    }
}