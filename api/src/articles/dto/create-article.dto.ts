export class CreateArticleDto {
    public author : string ;
    public title  : string  ;
    public keywords: string;
    public theme  : string;
    public category : string;
    public content: string;
    public photos : Object;
}