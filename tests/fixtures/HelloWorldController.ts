import {
  Body, BodyParam, CookieParam, CookieParams, Get, HeaderParam, HttpCode,
  JsonController, Method, Param, Params, Post, Put, QueryParam, UploadedFile
} from 'routing-controllers';

@JsonController('/hello-world')
export class HelloWorldController {
  public constructor(
    @Param('one') _: string
  ) {
    //
  }

  @Get('/:name')
  @Method('options', '/:name')
  public hello(
    @Param('name') name: string,
    @QueryParam('title') title: string,
    @CookieParam('session-token') _: string
  ): string {
    return `Hello ${title || 'Mr.'} ${name}.`;
  }

  @Post('/:name')
  @HttpCode(204)
  public async world(
    @Param('name') _1: string,
    @HeaderParam('accept') _2: string,
    @Body() body: Object
  ): Promise<object> {
    return body;
  }

  @Put('/:lastname/:firstname')
  public async person(
    @Params() person: object,
    @BodyParam('title') _1: string,
    @CookieParams() _2: object,
    @UploadedFile('file1') _3: Express.Multer.File
  ): Promise<object> {
    return person;
  }
}
