//Pre Loader Script for disabling pre loader & it's CSS 
//after body is Loaded + 2sec

var preLoader = document.getElementById('pre-Loader')
var stylesheets = document.getElementsByTagName("link")

//function 

function preLoad(){ 
    setTimeout(()=>{
        preLoader.style.display = 'none';      
    } ,2000)    // 2 second wait time for preLoader to run

}

