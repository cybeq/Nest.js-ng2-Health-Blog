
import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';


@Controller('api/session')
export class SessionController {
@Get('log')
isLoggedIn(@Session() session){
    return {user: session.userId}
}


}