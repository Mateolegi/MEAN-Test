import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';
import { Video } from "app/video";

@Injectable()
export class VideoService {

  private _getURL     = "/api/videos";
  private _postURL    = "/api/video";
  private _putURL     = "/api/video/";
  private _deleteURL  = "/api/video/"; 

  constructor(private _http: Http) { }

  getVideos() {
    return this._http.get(this._getURL)
    .map((response: Response) => response.json());
  }

  addVideo(video: Video) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.post(this._postURL, JSON.stringify(video), options)
    .map((response: Response) => response.json());
  }

  updateVideo(video: Video) {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this._http.put(this._putURL + video._id, JSON.stringify(video), options)
    .map((response: Response) => response.json());
  }

  deleteVideo(video: Video) {
    return this._http.delete(this._deleteURL + video._id)
    .map((response: Response) => response.json());
  }
}
