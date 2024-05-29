import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gif.interface';

@Injectable({ providedIn: 'root' })
export class GifsService {

    public gifList: Gif[] = [];
    private _tagHistory: string[] = [];
    private giphyApiKey: string = "nPw5XLE4d9wK1xaqwmjO28W2a4EReogr";
    private serviceUrl: string = "https://api.giphy.com/v1/gifs"

    constructor(private http: HttpClient) {
        this.loadLocalStorage();
    }

    get tagHistory() {
        return [...this._tagHistory];
    }

    private saveLocalStorage(): void {
        localStorage.setItem("history", JSON.stringify(this._tagHistory));
    }

    private loadLocalStorage(): void {
        if (localStorage.getItem("history")) {
            this._tagHistory = JSON.parse(localStorage.getItem("history")!);
            this.searchTag(this._tagHistory[0]);
        }

    }

    private organizeHistory(tag: string): void {
        tag = tag.toLowerCase();
        if (this._tagHistory.includes(tag)) {
            this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
        }
        this._tagHistory.unshift(tag);
        this._tagHistory = this._tagHistory.splice(0, 10);
        this.saveLocalStorage();
    }



    searchTag(tag: string): void {
        if (tag.length > 0) {
            this.organizeHistory(tag);
            const params = new HttpParams()
                .set("api_key", this.giphyApiKey)
                .set("limit", 10)
                .set("q", tag)

            this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
                .subscribe((resp) => {
                    this.gifList = resp.data;

                })
        }

    }



}