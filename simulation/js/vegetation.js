var rv,notrv,notwd,wp,wh,m,len,col;
var freq=13.48;
var ecc=6.3;
var cnt=0;
 var video;
 var vid;
 var wd=0;
//Wave height for wave period 1.5s 		   
var options1=[[06,10,14], //0.5D spacing and water depth 0.4m
			  [8,10,12], //0.5D spacing and water depth 0.5m
              [06,10,12,14], //1D spacing and water depth 0.4m
			  [10]]; //1D spacing and water depth 0.5m
			  
//Wave height for wave period 2s 	
var options2=[[06,10,12,14],//0.5D spacing and water depth 0.4m
			  [06,8,12],//0.5D spacing and water depth 0.5m
			  [06,10],//1D spacing and water depth 0.4m
			  [12]];//1D spacing and water depth 0.5m
			   
// var p=Math.floor(Math.random()*(4));  
	var p;		   
function navNext()
{
	for(temp=0;temp<=7;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}

var ca;
var questions=["Wave length is the distance between two successive crest or trough.",
				"Total length of Wave flume is ",
				"Capacity of the invertor used is "];
				
var options5=[["True","False"],//True
			  ["41m","51m","65m","71m"],//51m
			  ["9kW","10kW","11kW","15kW"]];//11kW
			  
function validateAnswer(qn,ans,left,top)
{
	 $("#answer").empty();
	document.getElementById("a").innerHTML="";
	document.getElementById("questDiv").style="position:absolute; font-size:14px; background-color:grey; color:white; padding:7.5px; border-radius:5px; visibility:visible; left:"+left+";top:"+top+";";
	document.getElementById("q").innerHTML=questions[qn];
	el = document.createElement("option");
	el.textContent = " ";
	el.value = " ";
	answer.appendChild(el);
  
	for(j=0;j<options5[qn].length;j++)
	{
		opt = options5[qn][j];

		el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		answer.appendChild(el);
		$("#answer").change(function()
		{
			ca=$(this).children("option:selected").val();
			if(options5[qn][ans]==ca)
			{
				document.getElementById("a").innerHTML="Correct Answer!";
			}
			else
			{
				document.getElementById("a").innerHTML="Wrong! Answer is "+options5[qn][ans];
			}
			setTimeout(function()
			{
				document.getElementById("questDiv").style.visibility="hidden";
				document.getElementById("nextButton").style.visibility="visible";
			},1500);
		});
	}
}

//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
     if (document.getElementById('arrow1').style.visibility=="hidden")
         document.getElementById('arrow1').style.visibility="visible";
     else
         document.getElementById('arrow1').style.visibility="hidden";
}

//stop blinking arrow
function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

//to prevent from entering non-integer values and alphabets
$(function()
{
	$('input').on('input', function() {
		this.value = this.value.match(/\d*(\.\d*)?/)[0];
	});
});

	var looper;
    var degrees = 0;
	var trackf=0;
    function rotateAnimation(el,speed)
	{
        var elem = document.getElementById(el);
        if(navigator.userAgent.match("Chrome"))
		{
            elem.style.WebkitTransform = "rotate("+degrees+"deg)";
        } 
		else if(navigator.userAgent.match("Firefox"))
		{
            elem.style.MozTransform = "rotate("+degrees+"deg)";
        } 
		else if(navigator.userAgent.match("MSIE"))
		{
            elem.style.msTransform = "rotate("+degrees+"deg)";
        }
		else if(navigator.userAgent.match("Opera"))
		{
            elem.style.OTransform = "rotate("+degrees+"deg)";
        } 
		else 
		{
            elem.style.transform = "rotate("+degrees+"deg)";
        }
		looper = setTimeout('rotateAnimation(\''+el+'\','+speed+')',speed);
		trackf=(degrees/8.60).toFixed(1);
		if(trackf < +freq )
		{
			// cnt=0;
			degrees++;
			// console.log(degrees+" "+freq+" "+trackf);
		}
		else if(trackf >= +freq && cnt==0)
		{
			cnt=1;
			setTimeout(function()
			{
				$("#5-1").css({"visibility":"hidden"});
				$("#5-2").css({"visibility":"hidden"});
				$("#5-3").css({"visibility":"hidden"});
				$("#5-4a").css({"visibility":"hidden"});
				$("#5-4b").css({"visibility":"hidden"});
				$("#5-4c").css({"visibility":"hidden"});
				$("#5-4d").css({"visibility":"hidden"});
				$("#p5-1").css({"visibility":"hidden"});
				$("#p5-2").css({"visibility":"hidden"});
				
				$("#p5-4").css({"visibility":"hidden"});
				
				// $("#5-5c").css({"visibility":"visible"});
				// ecc=10;
				$("#p5-3").css({"visibility":"visible"});
				$("#t5-3").css({"visibility":"visible"});
				$("#b5-3").css({"visibility":"visible"});
				$("#b5-3").click(function()
				{
					if(!document.getElementById("t5-3").value || document.getElementById("t5-3").value==null)
					{
						alert("Enter the eccentricity value you have selected in the previous step");
					}
					else
					{
						if(document.getElementById("t5-3").value==ecc)
						{
							document.getElementById("t5-3").style.visibility="hidden";
							document.getElementById("b5-3").style.visibility="hidden";
							$("#p5-3").css({"visibility":"visible","color":"green"});
							$("#p5-3").text("Correct! Eccentricity you have chosen is "+ecc);
							$("#5-5a").css({"visibility":"visible"});
							$("#5-5b").css({"visibility":"visible"});
							setEcc();
						}
						else
						{
							document.getElementById("t5-3").style.visibility="hidden";
							document.getElementById("b5-3").style.visibility="hidden";
							$("#p5-3").css({"visibility":"visible","color":"red"});
							$("#p5-3").text("Wrong! Eccentricity you have chosen is "+ecc);	
							$("#5-5a").css({"visibility":"visible"});
							$("#5-5b").css({"visibility":"visible"});
							setEcc();
						}
					}
				});	
			},750);
		}
		document.getElementById("p5-2").innerHTML="Frequency to be set = "+trackf+ " Hz" ;
    }
	
function magic()
{
	if(simsubscreennum==1)
	{
		$("#1").mouseover(function(){
		  $("#11").show();
		});
		$("#1").mouseout(function(){
		  $("#11").hide();
		});
		$("#12").mouseover(function(){
		  $("#112").show();
		});
		$("#12").mouseout(function(){
		  $("#112").hide();
		});
		$("#13").mouseover(function(){
		  $("#113").show();
		});
		$("#13").mouseout(function(){
		  $("#113").hide();
		});
		$("#14").mouseover(function(){
		  $("#114").show();
		});
		$("#14").mouseout(function(){
		  $("#114").hide();
		});
		$("#15").mouseover(function(){
		  $("#115").show();
		});
		$("#15").mouseout(function(){
		  $("#115").hide();
		});
		setTimeout(function()
		{
			document.getElementById("nextButton").style.visibility="visible";
		},2000);
	}
	if(simsubscreennum==2)
	{
		$("input[type='radio'][name='space']").click(function()
		{
			rv=$("input[name='space']:checked").val(); //spacing
			notrv=$("input[name='space']:not(:checked)").val();
			$("input[type=radio][value="+ notrv +"]").prop("disabled",true);
			if(rv==1)
			{
				$("#L2-2").css({"color":"grey"});
				document.getElementById("2-2").style.visibility="visible";
			}
			if(rv==2)
			{
				$("#L2-1").css({"color":"grey"});
				document.getElementById("2-1").style.visibility="visible";
			}
			validateAnswer(1,1,"150px","200px");
			// document.getElementById("nextButton").style.visibility="visible";
		});
	}
	if(simsubscreennum==3)
	{
		document.getElementById("2-1").style.visibility="hidden";
		document.getElementById("2-2").style.visibility="hidden";
		if(rv==1)
		{
			document.getElementById("type").style.visibility="visible";
			$("input[type='radio'][name='depth']").click(function()
			{
				wd=$("input[name='depth']:checked").val();
				notwd=$("input[name='depth']:not(:checked)").val();
				$("input[type=radio][value="+ notwd +"]").prop("disabled",true);
				if(wd==3)
				{
					$("#L3-2").css({"color":"grey"});
				}
				if(wd==4)
				{
					$("#L3-1").css({"color":"grey"});
				}
				document.getElementById("table1").style.visibility="visible";
				document.getElementById("table1").style.visibility="visible";
				document.getElementById("p3-1").style.visibility="visible";
				document.getElementById("p3-2").style.visibility="visible";
				document.getElementById("note3-1").style.visibility="visible";
			});
		}
		if(rv==2)
		{
			document.getElementById("table1").style.visibility="visible";
			document.getElementById("p3-1").style.visibility="visible";
			document.getElementById("p3-2").style.visibility="visible";
			document.getElementById("note3-1").style.visibility="visible";
		}
		document.getElementById("b3-1").onclick=function()
		{
			document.getElementById("note3-1").style.visibility="hidden";
			// document.getElementById("nextButton").style.visibility="visible";
			validateAnswer(2,2,"450px","400px");
		}
		
	}

	if(simsubscreennum==4)
	{
		document.getElementById("type").style.visibility="hidden";
		document.getElementById("table1").style.visibility="hidden";
		document.getElementById("p3-1").style.visibility="hidden";
		document.getElementById("p3-2").style.visibility="hidden";
		if(rv==2)
		{
			document.getElementById("5-5pile").style.visibility="hidden";
		}
		$("#b5-1").click(function()
		{
			if(!document.getElementById("t5-1").value || document.getElementById("t5-1").value==null)
			{
				alert("Enter the frequency value you have selected in the previous step");
			}
			else
			{
				if(document.getElementById("t5-1").value==freq)
				{
					document.getElementById("t5-1").style.visibility="hidden";
					document.getElementById("b5-1").style.visibility="hidden";
					$("#p5-1").css({"visibility":"visible","color":"green"});
					$("#p5-1").text("Correct! Frequency you have chosen is "+freq+" Hz");
					setFreq();
				}
				else
				{
					document.getElementById("t5-1").style.visibility="hidden";
					document.getElementById("b5-1").style.visibility="hidden";
					$("#p5-1").css({"visibility":"visible","color":"red"});
					$("#p5-1").text("Wrong! Frequency you have chosen is "+freq+" Hz");	
					setFreq();
				}
			}
		});	
	}
	
	if(simsubscreennum==5)
	{
		$("#p5-4").css({"visibility":"hidden"});
		$("#p5-3").css({"visibility":"hidden"});
		$("#5-5a").css({"visibility":"hidden"});
		$("#5-5b").css({"visibility":"hidden"});
		$("#5-5c").css({"visibility":"hidden"});
		$("#canvas5-1").css({"visibility":"hidden"});
		$("#ecc1").css({"visibility":"hidden"});
		$("#l5-1").css({"visibility":"hidden"});
		$("#ecc2").css({"visibility":"hidden"});
		$("#5-5pile").css({"visibility":"hidden"});
		
		if(rv==1 && wd==3)
		{
			document.getElementById("6-7").style="position:absolute; left:402.5px; top:330px; height:60px; visibility:visible;";
			document.getElementById("6-2").style="position:absolute; left:-40px; top:372.5px; width:790px; height:50px; background:#7ecef4; opacity:0.9;";
		}
		if(rv==1 && wd==4)
		{
			document.getElementById("6-7").style="position:absolute; left:385px; top:368px; height:40px; visibility:visible;";
			document.getElementById("6-2").style="position:absolute; left:-40px; top:369.5px; width:790px; height:50px; background:#7ecef4; opacity:0.9;";
		}
		if(rv==2)
		{
			document.getElementById("6-7").style.visibility="hidden";
		}
		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('arrow1').style="visibility:visible ;position:absolute;  left:320px; top:240px; height:30px; z-index: 10;";
		document.getElementById("arrow1").style.WebkitTransform = "rotate(240deg)"; 
		// Code for IE9
		document.getElementById("arrow1").style.msTransform = "rotate(230deg)"; 
		// Standard syntax
		document.getElementById("arrow1").style.transform = "rotate(230deg)";
		$("#6-5c").on('click',function()
		{
			$("#6-5c").off("click");             
			myStopFunction();
			// $("#6-2").animate({"position":"absolute","top":"379px"},1000);
			document.getElementById("6-5a").style.backgroundColor="#00CC00";
			document.getElementById("6-31").style.transformOrigin="90% 100%";
			document.getElementById("6-31").style.animation="rotateflap 2.75s infinite linear";
			document.getElementById("6-4").style.transformOrigin="90% 0%";
			document.getElementById("6-4").style.animation="rotateflap3 2.75s infinite linear";
			document.getElementById("6-3").style.animation="moveflap 2.75s infinite linear";	
			document.getElementById("6-1c").style.animation="movewhite 2.75s infinite linear";
			document.getElementById("6-6a").style.animation="rotatewheel 2.75s infinite linear";
			
			//flap movement
			window.requestAnimFrame = (function(){
				return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function( callback ) {
					window.setTimeout(callback, 2.75);
				};
			})();

			function distance(p1X, p1Y, p2X, p2Y) {
				return Math.sqrt(Math.pow(p1X - p2X, 2) + Math.pow(p1Y - p2Y, 2));
			}

			// dom
			var canvas = document.getElementById('mainCanvas');
			var ctx = canvas.getContext('2d');
				
			var engineSpeed = 0.1,
				engineAngle = 0,
				engineX = Math.floor(canvas.width * 0.15);//change x axis by decreasing 0.6 value
				engineR = 10,
				engineY = Math.floor(canvas.height - 2.10 * engineR),//change y axis by decreasing 2 value and canvas.height
				leftWiperX = Math.floor(engineX - canvas.height / 3),//change the width of the line by increasing 2 value
				leftWiperLowerHandle = 11,
				leftWiperY = engineY - leftWiperLowerHandle,
				leftShaftLength = leftWiperX - engineX - leftWiperLowerHandle + engineR,
				jointR = 2,
				lineWidth = 3;

			(function animloop(){
				requestAnimFrame(animloop);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.lineWidth = lineWidth;

				// motor circle
				engineAngle = (engineAngle + engineSpeed) % (2 * Math.PI);

				var crankX = engineX + Math.cos(engineAngle) * engineR,
					crankY = engineY + Math.sin(engineAngle) * engineR;
					//circle right hand side
					
					// ctx.globalAlpha="0.35";//set opacity
					ctx.lineTo(crankX, crankY);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(crankX, crankY, jointR, 0, 2 * Math.PI);
					ctx.closePath();
					ctx.stroke();

				var dx = crankX - leftWiperX;
				var dy = crankY - leftWiperY;
				var d = distance(crankX, crankY, leftWiperX, leftWiperY);
				var a = ((leftWiperLowerHandle * leftWiperLowerHandle) - (leftShaftLength * leftShaftLength) + (d * d)) / (2.0 * d) ;
				var x2 = leftWiperX + (dx * a / d);
				var y2 = leftWiperY + (dy * a / d);
				var h = Math.sqrt((leftWiperLowerHandle * leftWiperLowerHandle) - (a * a));
				var rx = -dy * (h / d);
				var ry = dx * (h / d);
				var joinLeftX = x2 + rx;
				var jointLeftY = y2 + ry;

				// left shaft
				ctx.beginPath();
				ctx.moveTo(crankX, crankY);
				ctx.lineTo(joinLeftX, jointLeftY);
				ctx.closePath();
				ctx.stroke();
				// <!-- circle on left side -->
				ctx.beginPath();
				ctx.arc(joinLeftX, jointLeftY, jointR, 0, 2 * Math.PI);
				ctx.closePath();
				ctx.stroke();

			})();

			console.log(rv+"=rv,wd="+wd);

			//wave generation
			if(rv==1 && wd==3)
			{
				emerged();
			}
			if(rv==1 && wd==4)
			{
				submerged();
			}
			if(rv==2)
			{
				withoutVegetation();
			}				
		});	
	}
	
	if(simsubscreennum==6)
	{
		console.log("rv="+rv+",wd="+wd);
		document.getElementById("5-5pile").style.visibility="hidden";
		document.getElementById("6-7").style.visibility="hidden";
		video=document.getElementById("rv="+rv+",wd="+wd);
		document.getElementById("rv="+rv+",wd="+wd).style.width="750px";
		document.getElementById("rv="+rv+",wd="+wd).style.height="450px";
		document.getElementById("rv="+rv+",wd="+wd).style.visibility="visible";
		document.getElementById("rv="+rv+",wd="+wd).addEventListener('ended',myHandler,false);
		function myHandler(e) {
			if(!e) { e = window.event; }
			// document.getElementById("nextButton").style.visibility="visible";
		}
	}
	if(simsubscreennum==7)
	{
		document.getElementById("5-5pile").style.visibility="hidden";
		document.getElementById("waves2").style.visibility="hidden";
		document.getElementById("6-7").style.visibility="hidden";
		document.getElementById("nextButton").style.visibility="hidden";
		// document.getElementById("rv="+rv+",wd="+wd).style.visibility="visible";
		// document.getElementById("Spacing="+rv+"D,water depth="+wd).style.visibility="visible";
	}
}

function dispVideo(v)
{
	
	document.getElementById("nextButton").style.visibility="hidden";
	vid=v;
	document.getElementById(v).style.visibility="visible";
	document.getElementById(v).addEventListener('ended',myHandler2,false);
	function myHandler2(e2) 
	{
		if(!e2) { e2 = window.event; }
		document.getElementById("prevButton").style.visibility="visible";
		document.getElementById("nextButton").style.visibility="hidden";
	}
}

function prevTab()
{
	document.getElementById(vid).style.visibility="hidden";
	document.getElementById("nextButton").style.visibility="hidden";
	document.getElementById("prevButton").style.visibility="hidden";
}

function setFreq()
{
	myInt = setInterval(function(){ animatearrow(); }, 500);
	document.getElementById('arrow1').style="visibility:visible ;position:absolute;  left:245px; top:190px; height:30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate(0deg)"; 
	// Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate(0deg)"; 
	// Standard syntax
	document.getElementById("arrow1").style.transform = "rotate(0deg)";
	$("#5-3").on('click',function()
	{
		$("#5-3").off("click");             
		myStopFunction();
		$("#5-4a").css({"visibility":"visible"});
		$("#5-4b").css({"visibility":"visible"});
		$("#5-4c").css({"visibility":"visible"});
		$("#p5-1").css({"visibility":"visible"});
			
		// $("#p5-1").text("Set the frequency value to "+freq+" Hz");
					
		myInt = setInterval(function(){ animatearrow(); }, 500);
		document.getElementById('arrow1').style="visibility:visible; position:absolute; left:530px; top:300px; height:30px; z-index: 10;";
		document.getElementById("arrow1").style.WebkitTransform = "rotate(0deg)"; 
		// Code for IE9
		document.getElementById("arrow1").style.msTransform = "rotate(0deg)"; 
		// Standard syntax
		document.getElementById("arrow1").style.transform = "rotate(0deg)";
		$("#5-4b").on('click',function()
		{
			$("#5-4b").off("click");             
			myStopFunction();
			document.getElementById('5-4c').style.transformOrigin="100% 10%";
			rotateAnimation("5-4c",60);
			$("#p5-2").css({"visibility":"visible"});
			// $("#p5-3").css({"visibility":"visible","color":"red","font-size":"14px"});
			// $("#p5-3").text("Click again to set the frequency once the pointer reaches desired value");
				
		});
	});
}

function setEcc()
{
	if(rv==1 && wd==3)
	{
		document.getElementById("5-5pile").style="position:absolute; left:402.5px; top:380px; height:60px; visibility:visible;";
	}
	if(rv==1 && wd==4)
	{
		document.getElementById("5-5pile").style="position:absolute; left:385px; top:400px; height:40px; visibility:visible;";
	}
	if(rv==2)
	{
		$("#5-5pile").css({"visibility":"hidden"});
	}
	// document.getElementById("5-5pile").style.visibility="visible";
	myInt = setInterval(function(){ animatearrow(); }, 500);
	document.getElementById('arrow1').style="visibility:visible ;position:absolute;  left:150px; top:345px; height:30px; z-index: 10;";
	document.getElementById("arrow1").style.WebkitTransform = "rotate(270deg)"; 
	// Code for IE9
	document.getElementById("arrow1").style.msTransform = "rotate(270deg)"; 
	// Standard syntax
	document.getElementById("arrow1").style.transform = "rotate(270deg)";
	$("#5-5b").on('click',function()
	{
		$("#5-5b").off("click");             
		myStopFunction();
		$("#5-5c").css({"visibility":"visible"});
		$("#canvas5-1").css({"visibility":"visible"});
		$("#ecc1").css({"visibility":"visible"});
		$("#l5-1").css({"visibility":"visible"});
		$("#ecc2").css({"visibility":"visible"});
		$("#p5-4").css({"visibility":"visible"});
		draw();
	});
}

function withoutVegetation()
{
	setTimeout(function()
	{
		document.getElementById("rv="+rv+",wd="+wd).style.visibility="visible";
		var ocean1 = document.getElementById("waves1"),
		waveWidth = 1,
		waveCount = Math.floor(770/waveWidth),
		docFrag = document.createDocumentFragment();

		// <!-- alert(waveCount); -->
		for(var i = 0; i < waveCount; i++)
		{
			if( i >= 732.5 && i <= 770 )
			{
				var wave = document.createElement("div");
				wave.className += " wave"; //assigning class name to the waves
				docFrag.appendChild(wave);
				wave.style.left = -29 + i * waveWidth + "px"; //initial position left:78px+
				// wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
				wave.style.animationName= "dostuff4";
				wave.style.animationDuration= "7.5s";
				wave.style.animationIterationCount="infinite";
				wave.style.transitionTimingFunction="ease-in-out";
				wave.style.webkitAnimationDelay = (i/100) + "s";
			}
			else
			{
				var wave = document.createElement("div");
				wave.className += " wave"; //assigning class name to the waves
				docFrag.appendChild(wave);
				wave.style.left = -29 + i * waveWidth + "px"; //initial position left:78px+
				wave.style.animationName= "dostuff3";
				wave.style.animationDuration= "7.5s";
				wave.style.animationIterationCount="infinite";
				wave.style.transitionTimingFunction="ease-in-out";
				wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
			}
		}
		ocean1.appendChild(docFrag);
		setTimeout(function()
		{
			document.getElementById("6-2").style.visibility="hidden";
			validateAnswer(0,0,"400px","100px");
			// document.getElementById("nextButton").style.visibility="visible";
		},12500);
	},1000);
}	

function submerged()
{
	setTimeout(function()
	{
		document.getElementById("rv="+rv+",wd="+wd).style.visibility="visible";
		var ocean1 = document.getElementById("waves1"),
		waveWidth = 1,
		waveCount = Math.floor(422.5/waveWidth),
		
		docFrag = document.createDocumentFragment();
	 
		// <!-- alert(waveCount); -->
	 
		for(var i = 0; i < waveCount; i++)
		{
			var wave = document.createElement("div");
			wave.className += "wave"; //assigning class name to the waves
			docFrag.appendChild(wave);
			wave.style.left = -29 + i * waveWidth + "px"; //initial position left:78px+
			wave.style.animationName= "dostuff2";
			wave.style.animationDuration= "7.5s";
			wave.style.animationIterationCount="infinite";
			wave.style.transitionTimingFunction="ease-in-out";
			wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
		}
		for(var i = 420; i < 760; i++)
		{
			if( i >= 420 && i <= 428 )
			{
				var wave = document.createElement("div");
				wave.className += " wave"; //assigning class name to the waves
				docFrag.appendChild(wave);
				wave.style.left = -29 + i * waveWidth + "px"; //initial position left:78px+
				// wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
				wave.style.animationName= "dostuff4";
				wave.style.animationDuration= "7.5s";   
				wave.style.animationIterationCount="infinite";
				wave.style.transitionTimingFunction="ease-in-out";
				wave.style.webkitAnimationDelay = (i/100) + "s";
			}
			else if( i >= 732.5 && i <= 770 )
			{
				var wave = document.createElement("div");
				wave.className += " wave"; //assigning class name to the waves
				docFrag.appendChild(wave);
				wave.style.left = -29 + i * waveWidth + "px"; //initial position left:78px+
				// wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
				wave.style.animationName= "dostuff4";
				wave.style.animationDuration= "7.5s";
				wave.style.animationIterationCount="infinite";
				wave.style.transitionTimingFunction="ease-in-out";
				wave.style.webkitAnimationDelay = (i/100) + "s";
			}
			//wave after reaching obstacles
			else
			{
				var wave = document.createElement("div");
				wave.className += " wave"; //assigning class name to the waves
				docFrag.appendChild(wave);
				wave.style.left = -29 + i * waveWidth + "px"; //initial position left:78px+
				// wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
				wave.style.animationName= "dostuff3";
				wave.style.animationDuration= "7.5s";
				wave.style.animationIterationCount="infinite";
				wave.style.transitionTimingFunction="ease-in-out";
				wave.style.webkitAnimationDelay = (i/100) + "s";
			}
		}
		ocean1.appendChild(docFrag);
		setTimeout(function()
		{
			document.getElementById("6-2").style.visibility="hidden";
			validateAnswer(0,0,"400px","100px");
		},11000);
	},1000);
}

function emerged()
{
	document.getElementById("rv="+rv+",wd="+wd).style.visibility="visible";

	setTimeout(function()
	{
		var ocean1 = document.getElementById("waves1"),
		waveWidth = 1,
		waveCount = Math.floor(430/waveWidth),
		
		docFrag = document.createDocumentFragment();
	 
		// <!-- alert(waveCount); -->
	 
		for(var i = 0; i < waveCount; i++)
		{
			var wave = document.createElement("div");
			wave.className += "wave"; //assigning class name to the waves
			docFrag.appendChild(wave);
			wave.style.left = -29 + i * waveWidth + "px"; //initial position left:78px+
			wave.style.animationName= "dostuff5";
			wave.style.animationDuration= "7.5s";
			wave.style.animationIterationCount="infinite";
			wave.style.transitionTimingFunction="ease-in-out";
			wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
		}
		for(var i = 435; i < 760; i++)
		{
			if( i >= 732.5 && i <= 770 )
			{
				var wave = document.createElement("div");
				wave.className += " wave"; //assigning class name to the waves
				docFrag.appendChild(wave);
				wave.style.left = -29 + i * waveWidth + "px"; //initial position left:78px+
				// wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
				wave.style.animationName= "dostuff4";
				wave.style.animationDuration= "7.5s";
				wave.style.animationIterationCount="infinite";
				wave.style.transitionTimingFunction="ease-in-out";
				wave.style.webkitAnimationDelay = (i/100) + "s";
			}
			//wave after reaching piles/vegetation
			else
			{
				var wave = document.createElement("div");
				wave.className += " wave"; //assigning class name to the waves
				docFrag.appendChild(wave);
				wave.style.left = -29 + i * waveWidth + "px"; //initial position left:78px+
				// wave.style.webkitAnimationDelay = (i/100) + "s";//The animation-delay property specifies a delay for the start of an animation.
				wave.style.animationName= "dostuff3";
				wave.style.animationDuration= "7.5s";
				wave.style.animationIterationCount="infinite";
				wave.style.transitionTimingFunction="ease-in-out";
				wave.style.webkitAnimationDelay = (i/100) + "s";
			}
		}
		ocean1.appendChild(docFrag);
		setTimeout(function()
		{
			document.getElementById("6-2").style.visibility="hidden";
			validateAnswer(0,0,"400px","100px");
		},11100);
	},1000);
}