import { getDecoratorForVerb } from '../util/getDecoratorForVerb';
import { Action } from './Action';
import { Controller } from './Controller';

export class Route {
  public constructor(
    private readonly verb: string,
    private readonly route: string,
    private readonly actions: Action[],
    private readonly signature: string
  ) { }

  public isHandled(): boolean {
    return this.actions.length > 0;
  }

  public getSignature(): string {
    return this.signature;
  }

  public getRouteDecorator(): string {
    return getDecoratorForVerb(this.verb, this.route);
  }

  public hasParameter(type: string, name?: string): boolean {
    return this.actions.some((action: Action) => action.hasParameter(type, name));
  }

  public putsStringInResponseHeader(headerType: string, value?: string): boolean {
    return this.actions.some((action: Action) => action.putsStringInResponseHeader(headerType, value));
  }

  public putsHeaderInResponse(type: 'header', value1: string, value2?: string): boolean {
    return this.actions.some((action: Action) => action.putsHeaderInResponse(type, value1, value2));
  }

  public setsStatusCode(type: 'success-code', value?: number): boolean {
    return this.actions.some((action: Action) => action.setsStatusCode(type, value));
  }

  // tslint:disable-next-line: no-any
  public handlesAuthorized(type: 'authorized', value?: any | any[]): boolean {
    return this.actions.some((action: Action) => action.handlesAuthorized(type, value));
  }

  // Get information to be displayed in hints when the matchers fail
  public getFirstMethodName(): string {
    return this.actions[0].getMethodName();
  }

  public getFirstController(): Controller {
    return this.actions[0].getController();
  }
}
