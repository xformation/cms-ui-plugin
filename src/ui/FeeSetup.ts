import init from '../domain/fee/FeeSetup/FeeSetupApp';

export class FeeSetup {
  static templateUrl = '/partials/feesetup.html';
  constructor() {
    init();
  }
}
