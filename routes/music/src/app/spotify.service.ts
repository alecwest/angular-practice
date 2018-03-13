import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map';

@Injectable()
export class SpotifyService {
    static BASE_URL = 'https://api.spotify.com/v1';

    constructor(private http: Http) {}

    searchTrack(query: string, type: string): Observable<any[]> {
        let params: string = [
            `q=${query}`,
            `type=track`
        ].join("&");
        let queryURL: string = `${SpotifyService.BASE_URL}/search?${params}`;
        return this.http.request(queryURL).map(res => res.json());
    }
}