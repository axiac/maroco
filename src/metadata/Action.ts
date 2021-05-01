import { Controller } from './Controller';
import { ActionMetadataArgs, ParamMetadataArgs, ResponseHandleMetadataArgs } from './metadataArgs';

export class Action {
  public constructor(
    private readonly action: ActionMetadataArgs,
    private readonly controller: Controller,
    private readonly params: ParamMetadataArgs[],
    private readonly responseHandlers: ResponseHandleMetadataArgs[]
  ) { }

  public hasParameter(type: string, name?: string): boolean {
    return this.params.some(
      (parameter: ParamMetadataArgs) => type === parameter.type && (name === undefined || name === parameter.name)
    );
  }

  public putsStringInResponseHeader(headerType: string, value?: string): boolean {
    return this.responseHandlers.some(
      (handler: ResponseHandleMetadataArgs) =>
        headerType === handler.type &&
        (value === undefined || value === handler.value)
    );
  }

  public putsHeaderInResponse(type: 'header', header: string, value?: string): boolean {
    return this.responseHandlers.some(
      (handler: ResponseHandleMetadataArgs) =>
        type === handler.type &&
        header === handler.value &&
        (value === undefined || value === handler.secondaryValue)
    );
  }

  public setsStatusCode(type: 'success-code', value?: number): boolean {
    return this.responseHandlers.some(
      (handler: ResponseHandleMetadataArgs) =>
        type === handler.type &&
        (value === undefined || value === handler.value)
    );
  }

  // tslint:disable-next-line: no-any
  public handlesAuthorized(type: 'authorized', value?: any | any[]): boolean {
    return this.responseHandlers.some(
      (handler: ResponseHandleMetadataArgs) => {
        if (type !== handler.type) {
          return false;
        }
        if (value === undefined) {
          return true;
        }

        // If `handler.value` is an array then `value` or all its items (if it is an array) must be included
        if (typeof handler.value === 'object' && typeof handler.value.includes === 'function') {
          // Is `value` an array?
          if (typeof value === 'object' && typeof value.every === 'function') {
            // It is an array, all its items must be included in `hander.value`
            // tslint:disable-next-line: no-any
            return value.every((v: any) => handler.value.includes(v));
          } else {
            // Not an array, search for it in `handler.value`
            return handler.value.includes(value);
          }
        } else {
          // `hander.value` is not an array; `value` must match exactly
          return value === handler.value;
        }
      }
    );
  }

  public getMethodName(): string {
    return `${this.controller.getName()}.${this.action.method}()`;
  }

  public getController(): Controller {
    return this.controller;
  }
}
