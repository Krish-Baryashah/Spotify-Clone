// const locoScroll = new LocomotiveScroll({
//     el: document.querySelector("#main"),
//     smooth: true,
// });

async function getSongs() {
  // Get the list of all the songs
  let a = await fetch("http://127.0.0.1:5500/songss/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  let songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songss/")[1].replaceAll("%20", " "));
    }
  }

  return songs;
}

// Play Music
const playMusic = (track)=>{
  let audio = new Audio("/songss/", + track)
  audio.play
}


// Show all the songs in the playlisy
async function main() {
  let currentSong;

  let songs = await getSongs();
  console.log(songs);

  let songUl = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUl.innerHTML =
      songUl.innerHTML +
      `<li> 
            <img src="./img/music.svg" class="invert" alt="">
                <div class="info">
                   <div class="">${song}</div>
                  <div class="">Keru</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img src="./img/play.svg" class="invert" alt="">
                </div>
              </li>
        `;
  }
  // Attach an ebent listner  to each spmg
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    console.log(e.querySelector('.info').firstElementChild.innerHTML);
    playMusic(e.querySelector('.info').firstElementChild.innerHTML)
    
  });
}

main();
