// const locoScroll = new LocomotiveScroll({
//     el: document.querySelector("#main"),
//     smooth: true,
// });

async function getSongs() {
    let a = await fetch ('http://127.0.0.1:5500/songss/')
    let response = await a.text()
    let div = document.createElement('div')
    div.innerHTML = response
    let as = div.getElementsByTagName('a')
 
    let songs = []
 
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith('.mp3')){
            songs.push(element.href.split("/songss/")[1].replaceAll("%20"," "))
        }
        
    }

    return songs
}

async function main() {

    let  songs = await getSongs()
    console.log(songs);

    let songUl = document.querySelector('.songList').getElementsByTagName('ul')[0]
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li>${song}</li>`   
    }
}


main()