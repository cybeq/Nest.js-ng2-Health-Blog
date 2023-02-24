
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose';



export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
    @Prop({ type: 'ObjectId', ref: 'User' , required:true})
    author: string;
    @Prop({unique:true, required:true})
    title: string;
    @Prop({required:true})
    category: string;
    @Prop({required:true})
    theme: string;

    @Prop({required:true})
    content: string;
    @Prop()
    photos: []
    @Prop()
    keywords:string;



}

export const ArticleSchema = SchemaFactory.createForClass(Article);
