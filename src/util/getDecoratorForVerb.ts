import { Delete, Get, Head, Method, Patch, Post, Put } from 'routing-controllers';

type HttpVerb = 'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put';
type Decorators = { [K in HttpVerb]: Function; };

const decorators: Decorators = {
  delete: Delete,
  get: Get,
  head: Head,
  options: Method,
  patch: Patch,
  post: Post,
  put: Put,
};

export function getDecoratorForVerb(verb: string, route: string): string {
  // The case of the HTTP verb does not matter
  const lowercaseVerb: string = verb.toLowerCase();
  if (!decorators[lowercaseVerb]) {
    throw new Error(`Unknown HTTP verb '${verb}'`);
  }

  // Special case: OPTIONS does not have its own decorator but uses `@Method('options', ...)`
  if (lowercaseVerb === 'options') {
    return `@Method('options', '${route}')`;
  }

  return `@${decorators[lowercaseVerb].name}('${route}')`;
}
