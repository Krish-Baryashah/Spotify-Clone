// const locoScroll = new LocomotiveScroll({
//     el: document.querySelector("#main"),
//     smooth: true,
// });
let currentSong = new Audio();

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
  // let audio = new Audio("/songss/" + track)
  currentSong.src = "/songss/" + track;
  currentSong.play()
  document.querySelector('.songinfo').innerHTML = track
  document.querySelector('.songtime').innerHTML = '00:00 / 00:00'
}


// Show all the songs in the playlisy
async function main() {

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
  // Attach an event listner  to each song
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click",element=>{
      console.log(e.querySelector('.info').firstElementChild.innerHTML.trim());
      if(currentSong.paused){
        currentSong.play()
        play.src = '/img/pause.svg'
        playMusic(e.querySelector('.info').firstElementChild.innerHTML.trim())
      }else{
        currentSong.pause()
        play.src = '/img/play.svg'
      }
      
    })
    
  });
}

// Attach an event listener to play next and previous

play.addEventListener("click",()=>{
  if(currentSong.paused){
    currentSong.play()
    play.src = '/img/pause.svg'
  }else{
    currentSong.pause()
    play.src = '/img/play.svg'
  }

})

currentSong.addEventListener("timeupdate",
  ()=>{
    
  }
)





main();
