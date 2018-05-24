import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators/map';

@Injectable()
export class YoutubeService {

  youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  apiKey = 'AIzaSyAuEbd603cxeOUjYr9WQ_By_fnvM4b-LdU';

  nextPageToken: string;

  constructor(public http: HttpClient) { }

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;
    let params = new HttpParams();

    params  = params.append('part', 'snippet');
    params  = params.append('maxResults', '10');
    params  = params.append('playlistId', 'PLDXjIyFRkL3JPm-vm3vcS-E_7zs-K50SD');
    params = params.append('key', this.apiKey);

    if (this.nextPageToken) {
      params = params.append('pageToken', this.nextPageToken);
    }

    return this.http.get( url, {params: params}).pipe(
      map( (res: any) => {
        this.nextPageToken = res.nextPageToken;
        const videos: any[] = [];
        for ( const video of res.items) {
          const snippet = video.snippet;
          videos.push (snippet);
        }
        return videos;
      })
    );
  }

  }

