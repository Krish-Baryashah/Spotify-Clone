// const locoScroll = new LocomotiveScroll({
//     el: document.querySelector("#main"),
//     smooth: true,
// });
let currentSong = new Audio();

function formatTime(seconds) {
  seconds = Math.round(seconds); // Round to nearest whole number
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Example usage:
// console.log(formatTime(12));  // Output: "00:12"
// console.log(formatTime(75));  // Output: "01:15"
// console.log(formatTime(360)); // Output: "06:00"


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
    // if (element.href.endsWith(".mp3")) {
    //   let fileName = decodeURIComponent(element.href.split("/songss/").pop()); 
    //   console.log("Extracted File:", fileName); // Debugging line
    //   songs.push(fileName);
    // }
  }

  return songs;
}

// Play Music
const playMusic = (track,pause=false)=>{
  // let audio = new Audio("/songss/" + track)
  currentSong.src = "/songss/" + track;
  if(!pause){
    
    currentSong.play()
    play.src = '/img/play.svg'
  }
  document.querySelector('.songinfo').innerHTML = track
  document.querySelector('.songtime').innerHTML = '00:00 / 00:00'
}


// Show all the songs in the playlisy
async function main() {

  let songs = await getSongs();
  console.log(songs);

  playMusic(songs[0])

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
      // if(currentSong.paused){
      //   currentSong.play()
      //   play.src = '/img/pause.svg'
      // }else{
      //   currentSong.pause()
      //   play.src = '/img/play.svg'
      // }
      playMusic(e.querySelector('.info').firstElementChild.innerHTML.trim())
      
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
    console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${formatTime(currentSong.currentTime)}:${formatTime(currentSong.duration)}`
    document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%"

  }
)


// Add an event listener to seekbar
document.querySelector('.seekbar').addEventListener('click',(e)=>{
  let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100 
  document.querySelector(".circle").style.left = percent + "%"
  currentSong.currentTime = ((currentSong.duration)*percent) / 100
})


main();
