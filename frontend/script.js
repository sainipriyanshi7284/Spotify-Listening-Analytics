
const content =
document.getElementById("content")

const alltime =
document.getElementById("alltime")

const year =
document.getElementById("year")

const capsule =
document.getElementById("capsule")

function showYear(year){
content.innerHTML=
`
<h2>🎵 ${year} Wrapped </h2>
<p><br>

<b>Minutes:</b>
24910 <br> <br>

<b>Top Artist: </b>
Pritam <br> <br>

<b>Peak Hour:</b>
2 AM <br> <br>
</p>

`
}



alltime.onclick=function(){

content.innerHTML=
`
<h2>🎵 All Time Wrapped</h2>

<p>
Your complete listening history
</p>

`

}


year.onclick=function(){

content.innerHTML=
`
<h2>📅 Year Wrapped</h2>

<p>
Choose a year...
</p>

<button id="yearchoice1">
2026
</button>

<button id="yearchoice2">
2025
</button>

<button id="yearchoice3">
2024
</button>

<button id="yearchoice4">
2023
</button>


`
const y2026=
document.getElementById("yearchoice1")

const y2025=
document.getElementById("yearchoice2")

const y2024=
document.getElementById("yearchoice3")

const y2023=
document.getElementById("yearchoice4")



y2026.onclick=function(){
showYear(2026)
}

y2025.onclick=function(){
showYear(2025)
}

y2024.onclick=function(){
showYear(2024)
}

y2023.onclick=function(){
showYear(2023)
}
}


capsule.onclick=function(){

content.innerHTML=
`
<h2>📦 Sound Capsule</h2>

<p>
Monthly listening capsule
</p>

<div id="month">

<button id="month1">
JANUARY
</button>

<button id="month2">
FEBRUARY
</button>

<button id="month3">
MARCH
</button>

<button id="month4">
APRIL
</button>

<button id="month5">
MAY
</button>

<button id="month6">
JUNE
</button>

<button id="month7">
JULY
</button>

<button id="month8">
AUGUST
</button>

<button id="month9">
SEPTEMBER
</button>

<button id="month10">
OCTOBER
</button>

<button id="month11">
NOVEMEBER
</button>

<button id="month12">
DECEMBER
</button>

</div>




`
const m1=
document.getElementById("month1")

const m2=
document.getElementById("month2")

const m3=
document.getElementById("month3")

const m4=
document.getElementById("month4")

const m5=
document.getElementById("month5")

const m6=
document.getElementById("month6")

const m7=
document.getElementById("month7")

const m8=
document.getElementById("month8")

const m9=
document.getElementById("month9")

const m10=
document.getElementById("month10")

const m11=
document.getElementById("month11")

const m12=
document.getElementById("month12")



m1.onclick=function(){
showYear("January")
}

m2.onclick=function(){
showYear("February")
}

m3.onclick=function(){
showYear("March")
}

m4.onclick=function(){
showYear("April")
}
m5.onclick=function(){
showYear("May")
}

m6.onclick=function(){
showYear("June")
}
m7.onclick=function(){
showYear("July")
}

m8.onclick=function(){
showYear("August")
}
m9.onclick=function(){
showYear("September")
}

m10.onclick=function(){
showYear("October")
}
m11.onclick=function(){
showYear("November")
}

m12.onclick=function(){
showYear("December")
}

}





