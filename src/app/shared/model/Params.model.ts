export class Params {
  lesson_id: number;
  end_date: string;
  text: string;


  constructor(lesson_id: number, end_date: string, text: string) {
    this.lesson_id = lesson_id;
    this.end_date = end_date;
    this.text = text;
  }
}
