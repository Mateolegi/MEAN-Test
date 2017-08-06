import { Component, OnInit } from '@angular/core';
import { Video } from "app/video";
import { VideoService } from "app/video.service";

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  videos: Array<Video>;
  selectedVideo: Video;
  private hideNewVideo: boolean = true;

  constructor(private _videoService: VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe(resVideoData => this.videos = resVideoData);
  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    this.hideNewVideo = true;
  }

  onSubmitAddVideo(video: Video) {
    this._videoService.addVideo(video)
    .subscribe(resNewVideo => {
      this.videos.push(resNewVideo);
      this.hideNewVideo = true;
      this.selectedVideo = resNewVideo;
    });
  }

  onUpdateVideoEvent(video: any) {
    this._videoService.updateVideo(video).subscribe(resUpdateVideo => video = resUpdateVideo);
    this.selectedVideo = null;
  }

  onDeleteVideoEvent(video: any) {
    let videoArray = this.videos;
    this._videoService.deleteVideo(video)
    .subscribe(resDeletedVideo => {
      for (let i = 0; i < videoArray.length; i++) {
        if (videoArray[i]._id === video._id) {
          videoArray.splice(i, 1);
        }
      }
    });
    this.selectedVideo = null;
  }

  newVideo() {
    this.hideNewVideo = false;
  }

}
