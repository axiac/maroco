import {
  Authorized, ContentType, Controller, Ctx, CurrentUser, Delete, Get, Header, HeaderParams,
  HttpCode, Location, Post, Put, QueryParams, Redirect, Session, SessionParam, UploadedFiles
} from 'routing-controllers';

@Controller('/foo')
export class FooBarController {
  @Get(new RegExp('/bar/.*'))
  @HttpCode(204)
  public foo(
    @QueryParams() _1: object,
    @Ctx() _2: object
  ): void {
    //
  }

  @Post('/bar')
  @HttpCode(201)
  @Location('http://local-host')
  public bar(
    @HeaderParams() _1: object,
    @Session() _2: object
  ): void {
    //
  }

  @Put('/bar')
  @ContentType('text/html')
  @Redirect('http://example.org')
  @Header('x-b3-traceid', 'abcd1234')
  @Authorized('admin')
  public baz(
    @UploadedFiles('file2') _1: Express.Multer.File[]
  ): void {
    //
  }

  @Delete('/bar')
  @HttpCode(200)
  @Authorized(['admin', 'guest'])
  public foo_bar(
    @SessionParam('username') _1: string,
    @CurrentUser() _2: string
  ): void {
    //
  }
}
