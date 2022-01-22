import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  logger: Logger;

  constructor() {
    this.logger = new Logger('customlog');
  }
  getHello(): string {
    this.logger.debug('Test Debug logger');
    return 'Hello World!';
  }
}
