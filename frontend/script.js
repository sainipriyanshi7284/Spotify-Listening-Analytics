
const content =
document.getElementById("content")

const alltime =
document.getElementById("alltime")

const year =
document.getElementById("year")

const capsule =
document.getElementById("capsule")



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

content.innerHTML=
`
<h3>🎵 Year 2026 Wrapped </h3>

<p>
Your complete listening history
</p>

`

}

y2025.onclick=function(){

content.innerHTML=
`
<h3> <i>🎵 <u>Year 2025 Wrapped</u> </i>  </h3>

<p>
<br>

<b>Minutes:</b>
24910 <br> <br>

<b>Top Artist: </b>
Pritam <br> <br>

<b>Peak Hour:</b>
2 AM <br> <br>
</p>

`

}

y2024.onclick=function(){

content.innerHTML=
`
<h3>🎵 Year 2024 Wrapped </h3>

<p>
Your complete listening history
</p>

`

}

y2023.onclick=function(){

content.innerHTML=
`
<h3>🎵 Year 2023 Wrapped </h3>

<p>
Your complete listening history
</p>

`

}
}


capsule.onclick=function(){

content.innerHTML=
`
<h2>📦 Sound Capsule</h2>

<p>
Monthly listening capsule
</p>

`

}



