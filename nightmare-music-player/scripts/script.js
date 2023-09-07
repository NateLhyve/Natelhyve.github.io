new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Melancholy",
          artist: "xXtha",
          cover: "https://github.com/NateLhyve/Natelhyve.github.io/blob/de0d6d403cf1ef7f364364bd76a86ca0c37c5ce4/nightmare-music-player/img/1.jpg",
          source: "Natelhyve.github.io/nightmare-music-player/mp3/1.mp4",
          url: "https://open.spotify.com/intl-pt/track/5lekOdK7bWl5AirX4dvF24?si=63a9371b60174139",
          favorited: false
        },
        {
          name: "Hidden In The Sand",
          artist: "Tally Hall",
          cover: "Natelhyve.github.io/nightmare-music-player/img/2.jpg",
          source: "Natelhyve.github.io/nightmare-music-player/mp3/2.mp4",
          url: "https://open.spotify.com/intl-pt/track/0RjG5JmdOWXAR68dGlKBA5?si=9ef5b4450cbb415d",
          favorited: false
        },
        {
          name: "Look Who's Inside Again",
          artist: "Bo Burnham",
          cover: "Natelhyve.github.io/nightmare-music-player/img/3.jpg",
          source: "Natelhyve.github.io/nightmare-music-player/mp3/3.mp4",
          url: "https://open.spotify.com/intl-pt/track/0lZZ8pibk6Zu3M9hTthk1a?si=670a53bcb697436f",
          favorited: false
        },
        {
          name: "Devil Town",
          artist: "Cavetown",
          cover: "Natelhyve.github.io/nightmare-music-player/img/4.jpg",
          source: "Natelhyve.github.io/nightmare-music-player/mp3/4.mp4",
          url: "https://open.spotify.com/intl-pt/track/58Bb5UzlthEqCwsbo8Jgi1?si=5b76432dce3e4641",
          favorited: false
        },
        {
          name: "I'd Rather Sleep",
          artist: "Kero Kero Bonito",
          cover: "Natelhyve.github.io/nightmare-music-player/img/5.jpg",
          source: "Natelhyve.github.io/nightmare-music-player/mp3/5.mp4",
          url: "https://open.spotify.com/intl-pt/track/614cx8ZtQJX7jRIBnUhPA7?si=76f8649bebfc4967",
          favorited: false
        },
        {
          name: "Ralsei's Lullaby",
          artist: "Toby Fox & maybemochas",
          cover: "Natelhyve.github.io/nightmare-music-player/img/6.jpg",
          source: "Natelhyve.github.io/nightmare-music-player/mp3/6.mp4",
          url: "https://youtu.be/77Qrdyw48xw?si=tctwhEY8ey-dSOo-",
          favorited: false
        },
        {
          name: "Everything Stays [Music Box Cover]",
          artist: "Rebecca Sugar & erinmusicbox",
          cover: "Natelhyve.github.io/nightmare-music-player/img/7.jpg",
          source: "Natelhyve.github.io/nightmare-music-player/mp3/7.mp4",
          url: "https://open.spotify.com/intl-pt/track/614cx8ZtQJX7jRIBnUhPA7?si=76f8649bebfc4967",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
