import * as path from 'path';
import { ActionMetadata, getMetadataArgsStorage, MetadataArgsStorage } from 'routing-controllers';

import { Action } from './metadata/Action';
import { Controller } from './metadata/Controller';
import { ActionMetadataArgs, ControllerMetadataArgs, ParamMetadataArgs, ResponseHandleMetadataArgs } from './metadata/metadataArgs';
import { Route } from './metadata/Route';

export function $route(verb: string, route: string): Route {
  // The function signature as string is used as `actual` in the messages when the matchers fail
  const signature: string = `$route('${verb}', '${route}')`;

  // The HTTP verb is case insensitive and stored as lowercase in the metadata
  const lowercaseVerb: string = verb.toLowerCase();
  // Remove possible double slashes in the route
  const normalizedRoute: string = path.normalize(route);

  const storage: MetadataArgsStorage = getMetadataArgsStorage();

  // Find the actions that handle the (verb, route) pair
  const actions: Action[] = storage.actions.map((action: ActionMetadataArgs) => {
    // Check the HTTP verb
    if (action.type !== lowercaseVerb) {
      return null;
    }

    // Find the controller whose method is the action
    const controller: ControllerMetadataArgs = storage.controllers.find((ctrl: ControllerMetadataArgs) => ctrl.target === action.target);

    // Compute the route from controller path fragment and action path fragment...
    const fullRoute: string | RegExp = ActionMetadata.appendBaseRoute(controller.route, action.route);
    // ... and compare it against the route provided as argument
    let match: boolean;
    if (typeof fullRoute === 'string') {
      match = fullRoute === normalizedRoute;
    } else {
      match = fullRoute.test(normalizedRoute);
    }
    if (!match) {
      return null;
    }

    // Found an action that handles the input route
    // Get the metadata of its parameters
    const params: ParamMetadataArgs[] = storage.filterParamsWithTargetAndMethod(controller.target, action.method);

    // Get the metadata of its response handlers
    const responseHandlers: ResponseHandleMetadataArgs[] =
      storage.filterResponseHandlersWithTargetAndMethod(controller.target, action.method);

    return new Action(action, new Controller(controller), params, responseHandlers);
  });

  // Keep only the Action objects
  return new Route(verb, route, actions.filter(Boolean), signature);
}
