export class Joke {
    id: number;
    text: string;
    type: string;
    created_at: Date;
    updated_at: Date;

    constructor(id: number, text: string, type: string, created_at: Date, updated_at: Date) {
        this.id = id;
        this.text = text;
        this.type = type;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
