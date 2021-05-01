import { ControllerMetadataArgs } from './metadataArgs';

export class Controller {
  public constructor(private readonly metadataArgs: ControllerMetadataArgs) { }

  public getName(): string {
    return this.metadataArgs.target.name;
  }

  public getType(): string {
    return this.metadataArgs.type;
  }
}
