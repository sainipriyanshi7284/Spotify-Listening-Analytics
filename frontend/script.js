
const content =
document.getElementById("content")

const alltime =
document.getElementById("alltime")

const year =
document.getElementById("year")

const capsule =
document.getElementById("capsule")

const generate = document.getElementById("generate")
const upload = document.getElementById("upload")

let uploadedYears = []

generate.onclick = async function() {
    const file = upload.files[0]
    
    if (!file) {
        alert("Please choose a file first!")
        return
    }

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData
    })

    const data = await res.json()
    uploadedYears.push(data.year)
    alert(`✅ ${data.year} data loaded! Uploaded years: ${uploadedYears}`)
    
    // show menu after upload
    document.getElementById("menu").style.display = "flex"
}

async function showYear(y){
    const res = await fetch(`http://localhost:8000/insights/${y}`)
    const data = await res.json()

    const artistRes = await fetch(`http://localhost:8000/charts/artists/${y}`)
    const artistData = await artistRes.json()

    const hourRes = await fetch(`http://localhost:8000/charts/hour/${y}`)
    const hourData = await hourRes.json()

    content.innerHTML = `
        <h2>🎵 ${y} Wrapped</h2>
        <div class="stat-card">⏱️ Minutes: ${data.total_minutes}</div>
        <div class="stat-card">🎵 Tracks: ${data.total_tracks}</div>
        <div class="stat-card">🎤 Artists: ${data.total_artists}</div>
        <div class="stat-card">⭐ Top Artist: ${data.top_artist}</div>
        <div class="stat-card">⏰ Peak Hour: ${data.peak_hour}</div>

        <br>
        <img src="data:image/png;base64,${artistData.chart}" style="width:100%;border-radius:15px;margin-top:20px">
        <img src="data:image/png;base64,${hourData.chart}" style="width:100%;border-radius:15px;margin-top:20px">
    `
}


alltime.onclick = async function() {
    const res = await fetch(`http://localhost:8000/insights/${uploadedYears[uploadedYears.length-1]}`)
    const data = await res.json()

    content.innerHTML = `
        <h2>🎵 All Time Wrapped </h2>
        <div class="stat-card">⏱️ Minutes: ${data.total_minutes}</div>
        <div class="stat-card">🎵 Tracks: ${data.total_tracks}</div>
        <div class="stat-card">🎤 Artists: ${data.total_artists}</div>
        <div class="stat-card">⭐ Top Artist: ${data.top_artist}</div>
        <div class="stat-card">⏰ Peak Hour: ${data.peak_hour}</div>
    `
}


year.onclick = function() {
    content.innerHTML = `<h2>📅 Year Wrapped</h2><p>Choose a year...</p>`
    
    uploadedYears.forEach(y => {
        content.innerHTML += `<button onclick="showYear(${y})">${y}</button>`
    })
}




capsule.onclick=function(){

content.innerHTML=
`
<h2>📦 Sound Capsule</h2>

<p>
Monthly listening capsule
</p>

<div id="month">

<button id="January">
JANUARY
</button>

<button id="February">
FEBRUARY
</button>

<button id="March">
MARCH
</button>

<button id="April">
APRIL
</button>

<button id="May">
MAY
</button>

<button id="June">
JUNE
</button>

<button id="July">
JULY
</button>

<button id="August">
AUGUST
</button>

<button id="September">
SEPTEMBER
</button>

<button id="October">
OCTOBER
</button>

<button id="November">
NOVEMBER
</button>

<button id="December">
DECEMBER
</button>

</div>


`

let months=["January","February","March","April","May","June","July","August","September","October","November","December"]

for(let i=0; i<months.length;i++ ){
    const btn = document.getElementById(months[i])
    const monthname = months[i]

    console.log(btn)

    if(btn){

    btn.onclick = async function() {
    const res = await fetch(`http://localhost:8000/capsule/${uploadedYears[uploadedYears.length-1]}`)
    const data = await res.json()
    
    const monthData = data[monthname]
    
    if (!monthData) {
        content.innerHTML = `<h2>No data for ${monthname} 😔</h2>`
        return
    }

    content.innerHTML = `
        <h2>📦 ${monthname} Capsule</h2>
        <div class="stat-card">⏱️ Minutes: ${monthData.Minutes}</div>
        <div class="stat-card">🎵 Top Track: ${monthData["Top-Track"]}</div>
        <div class="stat-card">🎤 Top Artist: ${monthData["Top-Artist"]}</div>
    `
}
    }
}
}