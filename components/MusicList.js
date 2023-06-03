const MusicList = (props) => {
  /* const musicarr = ["1", "223","425","638", "889", "1027","1214","1424","1656","1853"]
  const [music,setMusic] = useState(musicarr[Math.floor(Math.random() * musicarr.length)])
  let source = `https://www.youtube.com/embed/1gERUWaafTo?start=${music}&autoplay=1&mute=1` */
  if (props.idx == 0){
    return(
      <iframe 
          width="350" 
          height="350" 
          src="https://www.youtube.com/embed/-ZvsGmYKhcU?start=10&autoplay=1&mute=1" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
      </iframe>
    )
  }
  else if (props.idx == 1){
    return(
      <iframe 
          width="500" 
          height="500" 
          src="https://www.youtube.com/embed/EkHTsc9PU2A?start=19&autoplay=1&mute=1" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
      </iframe>
    )
  }
  else if (props.idx == 2){
    return(
      <iframe 
          width="500" 
          height="500" 
          src="https://www.youtube.com/embed/TopdlAgjdA4?start=30&autoplay=1&mute=1" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
      </iframe>
    )
  }
  else if (props.idx == 3){
    return (
      <iframe 
        width="500" 
        height="500" 
        src="https://www.youtube.com/embed/ekzHIouo8Q4?start=22&autoplay=1&mute=1" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    )
  }
  else{
    return (
      <iframe 
        width="500" 
        height="500" 
        src="https://www.youtube.com/embed/7YAAyUFL1GQ?start=16&autoplay=1&mute=1" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    );
  }
  
}

export default MusicList