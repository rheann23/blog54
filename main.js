perdiction_1=""



Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
})

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){

        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>'
    })
}
console.log("ml5 version",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tvVUZKPbL/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded');
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1 = "first predicition is"+predicition_1;
    
    var utterthis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterthis);
}
function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);

}
function gotResult(error,results){
    if(error){
        console.error(error);

    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        
        predicition_1 = results[0].label;
        

        speak();
        if(results[0].label=="looking up"){
            document.getElementById("update_emoji").innerHTML = "&#128070;";

        }
        if(results[0].label=="high five"){
            document.getElementById("update_emoji").innerHTML = "&#9995;";

            
        }
        if(results[0].label=="punch"){
            document.getElementById("update_emoji").innerHTML = "&#9994;";

        }
        if(results[0].label=="good"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";

        }
        if(results[0].label=="rock"){
            document.getElementById("update_emoji").innerHTML = "&#129304;";

        }
        if(results[0].label=="thumbs up"){
            document.getElementById("update_emoji").innerHTML = "&#128077;";

        }

        

    }

}