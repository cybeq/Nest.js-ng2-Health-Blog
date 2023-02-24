import {Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors} from "@nestjs/common";
import * as fs from 'fs';
import * as path from 'path';
import {FilesInterceptor} from "@nestjs/platform-express";
import * as express from 'express';
const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads');

@Controller('api/files')
export class FilesController {


    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body) {
        console.log(files);
        console.log('body',body);

        // Create a directory to store the files

        if (!fs.existsSync(UPLOADS_DIR)) {
            fs.mkdirSync(UPLOADS_DIR);
        }

        // Save each file to the directory
        let i = 0;
        for (const file of files) {
            const filePath = path.join(UPLOADS_DIR, Array.isArray(body.names)? body.names[i] : body.names);
            fs.writeFileSync(filePath, file.buffer);
            i++;
        }

    }


    @Get('storage')
    getStorage() {
        return express.static(UPLOADS_DIR);
    }

}