function getContinents() {
      let coun=document.getElementById("continents");
      coun.length=0;

      let opt=document.createElement("option");
      opt.text="Continents";

      coun.add(opt);
      coun.selectedIndex=0;

      const url="http://itsovy.sk:1200/continents";
      const req=new XMLHttpRequest();
      req.open('GET', url, true);

      req.onload= function(){
            if (this.readyState==4 && this.status==200) {
                  let obj=JSON.parse(this.responseText);
                  console.log(obj);
                  let option;
                  for (let i = 0; i < obj.length; i++) {
                        option=document.createElement("option");
                        option.text=obj[i].continent;
                        coun.add(option);
                  }

                  console.log(option);

            }
      }
      req.send();
}

function getStates(){
   //   console.log("jama2");
      let coun=document.getElementById("states");
      coun.length=0;

      let opt=document.createElement("option");
      opt.text="States";

      coun.add(opt);
      coun.selectedIndex=0;

      kontinent=document.getElementById("continents").value;
      console.log(kontinent);
      kontinent=replaceSpaces(kontinent);
      if (kontinent == "Antarctica") {
            document.getElementById("wrong").style.visibility="visible";
      }
      else{
      document.getElementById("wrong").style.visibility="hidden";
      let url="http://itsovy.sk:1200/countries?continent=";
      url+=kontinent;
      console.log(url);

      const req=new XMLHttpRequest();
      req.open('GET', url, true);

      req.onload= function(){
            if (this.readyState==4 && this.status==200) {
                  let obj=JSON.parse(this.responseText);
                  console.log(obj);
                  let option;
                  for (let i = 0; i < obj.length; i++) {
                        option=document.createElement("option");
                        option.setAttribute("value",obj[i].name);
                        option.setAttribute("id", obj[i].code);
                        let optionN=document.createTextNode(obj[i].name);
                        option.appendChild(optionN);
                        //option2.text=obj[i].code;
                        coun.add(option);
                        console.log(option);
                        //console.log(option2);
                  }
            }
      }
      req.send();
      }
}

function getTowns(){
      console.log("jama3");
      let coun=document.getElementById("towns");
      coun.length=0;

      let opt=document.createElement("option");
      opt.text="Towns";

      coun.add(opt);
      coun.selectedIndex=0;

      stat=document.getElementById("states").value;
      console.log(stat);
      stat=replaceSpaces(stat);

      kod=states.options[states.selectedIndex].id;
      document.getElementById("code").innerHTML=kod;
      console.log(kod);

      let url="http://itsovy.sk:1200/cities?country=";
      url+=stat;
      console.log(url); 

      const req=new XMLHttpRequest();
      req.open('GET', url, true);

      req.onload= function(){
            if (this.readyState==4 && this.status==200) {
                  let obj=JSON.parse(this.responseText);
                  console.log(obj);
                  let option;
                  for (let i = 0; i < obj.length; i++) {
                        option=document.createElement("option");
                        option.text=obj[i].name;
                        coun.add(option);
                  }

            }
      }
      req.send();
}

function replaceSpaces(input){
  return input.replace(/ /g, '%20');
}

 function getWeather(){
      document.getElementById("mainAnim").style.visibility="hidden";
	document.getElementById("resultTable").style.visibility="visible";
      let city = document.getElementById('towns').value;
      let state=states.options[states.selectedIndex].id;
     // document.getElementById("stat").innerHTML=state;
      let reg = RegExp("^([a-zA-Z(š|č|ť|ž|ý|á|í|é|Š|Č|Ť|Ž|Ý|Á|É|Í|ú|Ú)])+$");
      console.log("city: "+city+" country: "+state);
  	  if (city.length>1 && ( reg.test(city)|| (/\s/).test(city) ) ) {
  	  	let req="http://api.openweathermap.org/data/2.5/forecast?q=";
      	req=req+city;
      	if (state.length==2 && reg.test(state)) {
      	req=req+","+state;
      	}
      	req=req+"&mode=HTML";
      	req=req+"&appid=57bf6232faa9519a9104b00b35753580";
      	console.log(req);

      	let xhttp= new XMLHttpRequest();
      	xhttp.onreadystatechange = function(){
      		if(this.readyState == 4 && this.status == 200){
      			let obj=JSON.parse(this.responseText);
      			document.getElementById("teplota").innerHTML=
      			Math.round((obj.list[0].main.temp-273.15)*100)/100+" °C"; 
      			document.getElementById("vlhkost").innerHTML=obj.list[0].main.humidity+" %";
      			document.getElementById("tlak").innerHTML=obj.list[0].main.pressure+" hPa";
      			document.getElementById("vietor").innerHTML=obj.list[0].wind.speed+" m/s";
      			document.getElementById("pocasie").innerHTML=obj.list[0].weather[0].main;

      		//pozadie
      		if(obj.list[0].weather[0].main=="Snow"){
      			document.body.style.backgroundImage = "url('img/snow.jpg')";
                        document.getElementById("mainDiv").style.color="black";
                        document.getElementById("resultTable").style.color="black";
                        document.getElementById("SnowFlake").style.visibility= "visible";
      		}
      		else if(obj.list[0].weather[0].main=="Rain"){
      			document.body.style.backgroundImage = "url('img/rain.jpg')";
                        document.getElementById("mainDiv").style.color="black";
                        document.getElementById("resultTable").style.color="black";
                        document.getElementById("SnowFlake").style.visibility= "hidden";

      		}
      		else if(obj.list[0].weather[0].main=="Clouds"){
      			document.body.style.backgroundImage = "url('img/clouds.jpg')";
                        document.getElementById("mainDiv").style.color="black";
                        document.getElementById("resultTable").style.color="black";
                        document.getElementById("SnowFlake").style.visibility= "hidden";
      		}
      		else if(obj.list[0].weather[0].main=="Drizzle"){
      			document.body.style.backgroundImage = "url('img/drizzle.jpg')";
                        document.getElementById("mainDiv").style.color="black";
                        document.getElementById("resultTable").style.color="black";
                        document.getElementById("SnowFlake").style.visibility= "hidden";
      		}
      		else if(obj.list[0].weather[0].main=="Thunderstorm"){
      			document.body.style.backgroundImage = "url('img/storm.jpg')";
                        document.getElementById("mainDiv").style.color="white";
                        document.getElementById("resultTable").style.color="white";
                        document.getElementById("SnowFlake").style.visibility= "hidden";
      		}
                  else if(obj.list[0].weather[0].main=="Clear"){
                        document.body.style.backgroundImage = "url('img/clear.jpg')";
                        document.getElementById("mainDiv").style.color="black";
                        document.getElementById("resultTable").style.color="black";
                        document.getElementById("SnowFlake").style.visibility= "hidden";
                  }
                  else if(obj.list[0].weather[0].main=="Atmosphere"){
                        document.body.style.backgroundImage = "url('img/atmosphere.jpg')";
                        document.getElementById("mainDiv").style.color="black";
                        document.getElementById("resultTable").style.color="black";
                        document.getElementById("SnowFlake").style.visibility= "hidden";
                  }

      		}

      	};
      	xhttp.open("GET",req, true);
      	xhttp.send();
  	  }

   	 }