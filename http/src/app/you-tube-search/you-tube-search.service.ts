import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { SearchResult } from './search-result.model';

import 'rxjs/add/operator/map';

export const YOUTUBE_API_KEY =
  'AIzaSyDa59EHGgi7NrFGB-p3DgHtkdeFo01zMtY';
export const YOUTUBE_API_URL =
  'https://www.googleapis.com/youtube/v3/search';

/**
 * YouTubeService connects to the YouTube API
 */
@Injectable()
export class YouTubeSearchService {
    constructor(
        private http: HttpClient,
        @Inject(YOUTUBE_API_KEY) private apiKey: string,
        @Inject(YOUTUBE_API_URL) private apiUrl: string
    ) {}

    search(query: string): Observable<SearchResult[]> {
        const params: string = [
            `q=${query}`,
            `key=${this.apiKey}`,
            `part=snippet`,
            `type=video`,
            `maxResults=10`
        ].join('&');
        const queryUrl = `${this.apiUrl}?${params}`;
        return this.http.get(queryUrl).map(response => {
            return <any>response['items'].map(item => {
                console.log("raw item", item);
                return new SearchResult({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    description: item.snippet.description,
                    thumbnailUrl: item.snippet.thumbnails.high.url
                });
            });
        });
    }
}