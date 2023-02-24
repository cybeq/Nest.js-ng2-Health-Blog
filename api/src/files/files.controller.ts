import {Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors} from "@nestjs/common";

import {FilesInterceptor} from "@nestjs/platform-express";


@Controller('api/files')
export class FilesController {


    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
        console.log(files);
    }

}