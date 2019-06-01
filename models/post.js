
class Post{
    constructor(title,description,image,link){
      this.title=title!=null?title:'';
      this.description=description!=null?description:'';
      this.image=image!=null?image:'';
      this.link=link!=null?link:'';
    }
}

module.exports=Post;