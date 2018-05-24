import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSeleccionado: any;

  constructor( public youtuveService: YoutubeService) { }

  ngOnInit() {
    this.youtuveService.getVideos().subscribe(videos => {
      this.videos = videos;
    });
  }

  verVideo(video: any) {
    this.videoSeleccionado = video;
    $('#exampleModal').modal();
  }

  cargarMas() {
    this.youtuveService.getVideos().subscribe(videos => {
      this.videos.push.apply(this.videos, videos);
    });
  }

  cerrarModal( ) {
    this.videoSeleccionado = null;
    $('#exampleModal').modal('hide');
  }

}
