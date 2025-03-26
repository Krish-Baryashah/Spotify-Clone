// const locoScroll = new LocomotiveScroll({
//     el: document.querySelector("#main"),
//     smooth: true,
// });
let currentSong = new Audio();
let songs;
let currFolder
function formatTime(seconds) {
  seconds = Math.round(seconds); // Round to nearest whole number
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

// Example usage:
// console.log(formatTime(12));  // Output: "00:12"
// console.log(formatTime(75));  // Output: "01:15"
// console.log(formatTime(360)); // Output: "06:00"

async function getSongs(folder) {
  // Get the list of all the songs
  currFolder = folder
  let a = await fetch(`http://127.0.0.1:5500/${currFolder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");

  songs = [];

  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${currFolder}/`)[1].replaceAll("%20", " "));
    }
    // if (element.href.endsWith(".mp3")) {
    //   let fileName = decodeURIComponent(element.href.split("/songss/").pop());
    //   console.log("Extracted File:", fileName); // Debugging line
    //   songs.push(fileName);
    // }
  }
  
// Show all the songs in the playlist

let songUl = document.querySelector('.songList').getElementsByTagName('ul')[0]
songUl.innerHTML = ''
for (const song of songs) {
  songUl.innerHTML = songUl.innerHTML = songUl.innerHTML+ `<li><img class="invert" width="34" src="img/music.svg" alt="">
                          <div class="info">
                              <div> ${song.replaceAll("%20", " ")}</div>
                              <div>Harry</div>
                          </div>
                          <div class="playnow">
                              <span>Play Now</span>
                              <img class="invert" src="img/play.svg" alt="">
                          </div> </li>`;
}

    // Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e => {
      e.addEventListener("click", element => {
          playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

      })
  })
}

// Play Music
const playMusic = (track, pause = false) => {
  // let audio = new Audio("/songss/" + track)
  currentSong.src = `/${currFolder}/` + track;
  if (!pause) {
    currentSong.play();
    play.src = "/img/pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

  
  };



  // Display all the albums on the page
  async function displayAlbums() {
    let a = await fetch(`http://127.0.0.1:5500/songss`); /* yahan mene songs fetch kr liy phr await kia songs ke any ka
    or phr isy string me convert kia phr ek div create kia and then us div me response dal dia chunkey response ke andar tha wo text jo hum ne fetch kia tha 
    
    */
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchor = div.getElementsByTagName('a')
  Array.from(anchor).forEach(e=>{
    if(e.href.includes('/songss/')){
      console.log(e.href);
      
    } 
  })    
  }



async function main() {
  // Get the list of all the songs
   await getSongs('songss/jhol');
  // console.log(songs);

  playMusic(songs[0], true);

  // Display all the albums on the page
displayAlbums()
  

 
  // Attach an event listener to play next and previous

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "/img/pause.svg";
    } else {
      currentSong.pause();
      play.src = "/img/play.svg";
    }
  });

  // Time Update

  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${formatTime(
      isNaN(currentSong.currentTime) ? 0 : currentSong.currentTime
    )}:${formatTime(isNaN(currentSong.duration) ? 0 : currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  // Add an event listener for hamburger
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  // Add an event listner for close button
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });

  // Add an event listner to previous

  previous.addEventListener("click", () => {
    // console.log("previous clicked");
    // console.log(currentSong);

    let currentFile = decodeURIComponent(currentSong.src.split("/").pop());
    // console.log("Extracted filename:", currentFile);
    let index = songs.indexOf(currentFile);
    // console.log("Current index:", index);
    if (index > 0) {
      // console.log("Playing previous song:", songs[index - 1]);
      playMusic(songs[index - 1]);
    } else {
      console.log("No previous song available!");
    }
  });

  // Add an event listner to next

  next.addEventListener("click", () => {
    // console.log("Next clicked");
    // console.log(currentSong);

    let currentFile = decodeURIComponent(currentSong.src.split("/").pop());
    // console.log("Extracted filename:", currentFile);
    let index = songs.indexOf(currentFile);
    // console.log("Current index:", index);
    if (index + 1 < songs.length) {
      // console.log("Playing next song:", songs[index + 1]);
      playMusic(songs[index + 1]);
    } else {
      console.log("No next song available!");
    }
  });

  // ----------------ChatGpt--------------------------
  // Previous Button Fix
  // previous.addEventListener("click", () => {
  //   console.log("Previous clicked");
  //   console.log("Current song:", currentSong.src);

  //   let currentFile = decodeURIComponent(currentSong.src.split("/").pop());
  //   console.log("Extracted filename:", currentFile);

  //   let index = songs.indexOf(currentFile);
  //   console.log("Current index:", index);

  //   if (index > 0) {
  //     console.log("Playing previous song:", songs[index - 1]);
  //     playMusic(songs[index - 1]);
  //   } else {
  //     console.log("No previous song available!");
  //   }
  // });

  // Next Button Fix
  // next.addEventListener("click", () => {
  //   console.log("Next clicked");
  //   console.log("Current song:", currentSong.src);

  //   let currentFile = decodeURIComponent(currentSong.src.split("/").pop());
  //   console.log("Extracted filename:", currentFile);

  //   let index = songs.indexOf(currentFile);
  //   console.log("Current index:", index, "Total Songs:", songs.length);

  //   if (index !== -1 && index + 1 < songs.length) {
  //     console.log("Playing next song:", songs[index + 1]);
  //     playMusic(songs[index + 1]);
  //   } else {
  //     console.log("No next song available!");
  //   }
  // });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault(); // Space scrolling rokne ke liye
      if (currentSong.paused) {
        currentSong.play();
        play.src = "/img/pause.svg";
      } else {
        currentSong.pause();
        play.src = "/img/play.svg";
      }
    }

    if (event.key.toLowerCase() === "n") {
      // Next song
      let currentFile = decodeURIComponent(currentSong.src.split("/").pop()); // Fix file name issue
      let index = songs.indexOf(currentFile);

      if (index !== -1 && index + 1 < songs.length) {
        playMusic(songs[index + 1]);
      } else {
        console.log("No next song available");
      }
    }

    if (event.key.toLowerCase() === "p") {
      // Previous song
      let currentFile = decodeURIComponent(currentSong.src.split("/").pop()); // Fix file name issue
      let index = songs.indexOf(currentFile);

      if (index > 0) {
        playMusic(songs[index - 1]);
      } else {
        console.log("No previous song available");
      }
    }
  });

  // ----------------ChatGpt--------------------------

  // Add an event to volume range
  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      // console.log(e,e.target,e.target.value);
      currentSong.volume = parseInt(e.target.value) / 100;
    });
}

// Load the playlist whenever card is clicked

Array.from(document.getElementsByClassName('card')).forEach((e)=>{
  // console.log(e);
  
  e.addEventListener('click',async (item)=>{
    // console.log(item.target,item.currentTarget.dataset);
    songs = await getSongs(`songss/${item.currentTarget.dataset.folder}`)
    

  })
})


main();
