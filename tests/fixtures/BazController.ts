import { Controller, Get } from 'routing-controllers';

@Controller()
export class BazController {
  @Get('/baz')
  public baz(): number {
    return 0;
  }
}
