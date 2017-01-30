export class NewIdea {
  constructor (title, body){
    this.title = title;
    this.body = body;
    this.id = Date.now();
    this.quality = 'Normal';
    this.complete = 'idea-card';
    this.class = 'complete-btn';
  }
}
