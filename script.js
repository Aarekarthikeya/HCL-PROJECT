const languagesSelect=document.querySelector("#language");
const recordbtn=document.querySelector(".startButton");
const result=document.querySelector(".result");
const downloadbtn=document.querySelector(".download");

function poplanguages()
{
    languages.forEach((lang)=>
    {
        const option=document.createElement("option");
        option.value=lang.code;
        option.innerHTML=lang.name;
        languagesSelect.appendChild(option);
    });
}
poplanguages();

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition,
recognition,
recording=false;

function voicetotext()
{
    try{
        recognition = new SpeechRecognition();
        recognition.lang=languagesSelect.value;
        recognition.interimResults=true;
        recordbtn.classList.add("recording");
        recordbtn.querySelector("p").innerHTML="Stop Listening...";
        recognition.start();
        recognition.onresult=(event)=>{
            const speechResult=event.results[0][0].transcript;
            if(event.results[0].isFinal){
               result.innerHTML += " "+speechResult;
              const query = speechResult.toLowerCase();
               if (query.startsWith("open youtube")) {
            const searchQuery = query.replace("open youtube", "").trim();
            if (searchQuery.length > 0) {
                const youtubeURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;
                window.open(youtubeURL, "_blank");
            } else {
            
                window.open("https://www.youtube.com", "_blank");
            }
        } else if (query.startsWith("open google")) {
            const searchQuery = query.replace("open google", "").trim();
            if (searchQuery.length > 0) {
                const googleURL = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
                window.open(googleURL, "_blank");
            } else {
                
                window.open("https://www.google.com", "_blank");
            }
        } 
                 else if (query.startsWith("open amazon and search for")) {
            const productQuery = query.replace("open amazon and search for", "").trim();
            if (productQuery.length > 0) {
                const amazonURL = `https://www.amazon.com/s?k=${encodeURIComponent(productQuery)}`;
                window.open(amazonURL, "_blank");
            } else {
                
                window.open("https://www.amazon.com", "_blank");
            }
        }
        else if (query.startsWith("open hotstar and search for")) {
            const contentName = query.replace("open hotstar and search for", "").trim();
            if (contentName.length > 0) {
                const hotstarURL = `https://www.hotstar.com/in/search?q=${encodeURIComponent(contentName)}`;
                window.open(hotstarURL, "_blank");
            } else {
                window.open("https://www.hotstar.com", "_blank");
            }
        } 
        
        else if (query.startsWith("open flipkart and search for")) {
            const productQuery = query.replace("open flipkart and search for", "").trim();
            if (productQuery.length > 0) {
                const flipkartURL = `https://www.flipkart.com/search?q=${encodeURIComponent(productQuery)}`;
                window.open(flipkartURL, "_blank");
            } else {
                
                window.open("https://www.flipkart.com", "_blank");
            }
        }
        else if (query.startsWith("open spotify and search for")) {
            const searchTerm = query.replace("open spotify and search for", "").trim();
            if (searchTerm.length > 0) {
                const spotifyURL = `https://open.spotify.com/search/${encodeURIComponent(searchTerm)}`;
                window.open(spotifyURL, "_blank");
            } else {
                window.open("https://open.spotify.com", "_blank");
            }
        }
        
        
         else if (query.startsWith("open netflix and search for")) {
            const movieName = query.replace("open netflix and search for", "").trim();
            if (movieName.length > 0) {
                const netflixURL = `https://www.netflix.com/search?q=${encodeURIComponent(movieName)}`;
                window.open(netflixURL, "_blank");
            } else {
                
                window.open("https://www.netflix.com", "_blank");
            }
        }
            else{  
              switch (query) {
                  
                case "open facebook":
                    window.open("https://www.facebook.com", "_blank");
                    break;
                case "open instagram":
                    window.open("https://www.instagram.com", "_blank");
                    break;
                case "open amazon":
                    window.open("https://www.amazon.com", "_blank");
                  break;
                  case "open youtube":
                window.open("https://www.youtube.com", "_blank"); 
                break;
                  case "open disney plus hotstar":
                window.open("https://www.hotstar.com", "_blank");
                break;
                  case "open netflix":
                    window.open("https://www.netflix.com", "_blank");
                    break;
                  case "open google":
                window.open("https://www.google.com", "_blank"); 
                break;
                case "open spotify":
              window.open("https://open.spotify.com", "_blank");
                  break;

                   case "open whatsapp":
                    window.open("https://web.whatsapp.com", "_blank");
                    break;
                    case  "clear all":
                        result.innerHTML="";
                        downloadbtn.disabled=true;
                         break;

                     default:  
                    result.querySelector("p").remove();
                    break;
                    
              }
            }
              
          
                result.querySelector("p").remove();
            }else{
               
                if(!document.querySelector(".interim")){
                    const interim=document.createElement("p");
                    interim.classList.add("interim");
                    result.appendChild(interim);
                }

                document.querySelector(".interim").innerHTML=" "+speechResult;
            }

            downloadbtn.disabled = false;
        };

        recognition.onspeechend=()=>{

            voicetotext();
        };
        recognition.onerror=(event)=>{
            stopRecording();
           if (event.error === "no-speech") {
        alert("No speech was detected. Stopping...");
      } else if (event.error === "audio-capture") {
        alert(
          "No microphone was found. Ensure that a microphone is installed."
        );
      } else if (event.error === "not-allowed") {
        alert("Permission to use microphone is blocked.");
      } else if (event.error === "aborted") {
        alert("Listening Stopped.");
      } else {
        alert("Error occurred in recognition: " + event.error);
      }
        };


    }catch (error){
        recording=false;
        console.log(error);
    }
}
recordbtn.addEventListener("click",()=>{

    if(!recording){
        voicetotext();
        recording=true;
    }else{
        stopRecording();
    }
})
function stopRecording(){
    recognition.stop();
    recordbtn.querySelector("p").innerHTML="start";
    recordbtn.classList.remove("recording");
    recording=false;
}

function download(){
    const text=result.innerHTML;
    const filename="voicetotext.txt";
    const element=document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8,"+encodeURIComponent(text)
    );
    element.setAttribute("download",filename);
    element.style.display="none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
downloadbtn.addEventListener("click",download);

const clearbtn=document.querySelector("#clear");
clearbtn.addEventListener("click",()=>{
    result.innerHTML="";
    downloadbtn.disabled=true;
})