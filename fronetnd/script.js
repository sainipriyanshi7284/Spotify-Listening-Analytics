
const content = document.getElementById("content")
const alltime = document.getElementById("alltime")
const year = document.getElementById("year")
const generate = document.getElementById("generate")
const upload = document.getElementById("upload")
const fileLabel = document.getElementById("fileLabel")
const uploadedChips = document.getElementById("uploadedChips")

const API ="http://127.0.0.1:8000";

const MONTHS = ["January","February","March","April","May","June","July","August",
                "September","October","November","December"]
const MONTH_ABBR = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]


function showToast(message, type = "success") {
    const icons = {
        success: "✅",
        error: "❌",
        warning: "⚠️",
        info: "ℹ️"
    };

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `  <div class="toast-icon">${icons[type]}</div>
         <div class="toast-message">${message}</div> `;
    document.getElementById("toast-container").appendChild(toast);
    setTimeout(() => { toast.style.animation = "toastOut .3s ease forwards";
      setTimeout(() => { toast.remove(); },300);
    },3000);
}

let uploadedYears = []

// ============================================================
// Icons
// ============================================================
function icons(){ if (window.lucide) lucide.createIcons() }
icons()

// ============================================================
// Small render helpers
// ============================================================
function statCard(icon, label, value){
  const numeric = (typeof value === "number") || (!isNaN(parseFloat(value)) && isFinite(value))
  return `
    <div class="stat-card">
      <div class="stat-icon"><i data-lucide="${icon}"></i></div>
      <div class="stat-info">
        <span class="stat-value" ${numeric ? `data-count="${value}"` : ""}>${numeric ? 0 : value}</span>
        <span class="stat-label">${label}</span>
      </div>
    </div>`
}

function chartCard(title, subtitle, base64){
  return `
    <div class="chart-card">
      <div class="chart-head">
        <h3>${title}</h3>
        <p>${subtitle}</p>
      </div>
      <img src="data:image/png;base64,${base64}" alt="${title} chart">
    </div>`
}

function monthStripHTML(activeIndex){
  return `
    <div class="month-strip" id="monthStrip">
      ${MONTH_ABBR.map((m, i) => `<button class="month-pill ${i === activeIndex ? "active" : ""}" data-index="${i}">${m}</button>`).join("")}
    </div>`
}

function attachMonthStrip(stripEl, onSelect){
  stripEl.querySelectorAll(".month-pill").forEach(btn => {
    btn.onclick = () => onSelect(parseInt(btn.dataset.index))
  })
  // mouse wheel -> horizontal scroll
  stripEl.addEventListener("wheel", (e) => {
    if (e.deltaY === 0) return
    e.preventDefault()
    stripEl.scrollLeft += e.deltaY
  }, { passive: false })
}

function setActiveMonth(stripEl, index){
  stripEl.querySelectorAll(".month-pill").forEach(b => b.classList.remove("active"))
  const btn = stripEl.querySelector(`[data-index="${index}"]`)
  if (btn) {
    btn.classList.add("active")
    btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }
}

function renderCapsuleSlide(target, monthName, md){
  if (!md) {
    target.innerHTML = `
      <div class="capsule-slide empty">
        <h3>${monthName}</h3>
        <p>No listening data for this month 😔</p>
      </div>`
    return
  }
  target.innerHTML = `
    <div class="capsule-slide">
      <p class="capsule-eyebrow">Sound Capsule</p>
      <h2 class="capsule-month">${monthName}</h2>
      <div class="capsule-stats">
        <span class="capsule-num">${md.Minutes}</span>
        <span class="capsule-lbl">Minutes listened</span>
      </div>
      <div class="capsule-meta">
        <p><i data-lucide="mic-2"></i> ${md["Top-Artist"]}</p>
        <p><i data-lucide="music-2"></i> ${md["Top-Track"]}</p>
      </div>
    </div>`
  icons()
}

function enableSwipe(el, onLeft, onRight){
  let startX = null
  el.addEventListener("touchstart", e => { startX = e.touches[0].clientX })
  el.addEventListener("touchend", e => {
    if (startX === null) return
    const dx = e.changedTouches[0].clientX - startX
    if (Math.abs(dx) > 40) (dx < 0 ? onLeft : onRight)()
    startX = null
  })
}

function animateCounts(scope){
  scope.querySelectorAll("[data-count]").forEach(el => {
    const target = parseFloat(el.getAttribute("data-count"))
    if (isNaN(target)) return
    const isInt = Number.isInteger(target)
    const duration = 800
    const t0 = performance.now()
    function tick(now){
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const val = target * eased
      el.textContent = isInt ? Math.round(val).toLocaleString() : val.toFixed(1)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

function renderChips(){
  uploadedChips.innerHTML = uploadedYears.length
    ? uploadedYears.map(y => `<span class="chip">${y}</span>`).join("")
    : `<span class="chip chip-empty">None yet</span>`
}

// ============================================================
// Upload
// ============================================================
upload.addEventListener("change", () => {
  fileLabel.textContent = upload.files[0] ? upload.files[0].name : "Choose your Spotify JSON export"
})

generate.onclick = async function() {
  const file = upload.files[0]

  if (!file) {
     showToast(`${data.year} data loaded!`)
    return
  }

  generate.disabled = true
  generate.textContent = "Uploading..."

  try {
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch(`${API}/upload`, {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    if (!uploadedYears.includes(data.year)) {
      uploadedYears.push(data.year)
      uploadedYears.sort()
      showToast(`${data.year} data loaded! Uploaded years: ${uploadedYears.join(", ")}`)
    } else {
      showToast(`${data.year} already uploaded!`)
    }

    renderChips()
    document.getElementById("menu").style.display = "flex"
  } catch (err) {
    showToast("Upload failed — is the backend running on localhost:8000?")
  } finally {
    generate.disabled = false
    generate.textContent = "Generate Wrapped"
  }
}

// ============================================================
// All Time Wrapped
// ============================================================
async function aggregateAllTimeCapsule(){
  const perYear = await Promise.all(
    uploadedYears.map(y => fetch(`${API}/capsule/${y}`).then(r => r.json()).then(d => ({ y, d })))
  )

  const agg = {}
  MONTHS.forEach(m => {
    let best = null
    let totalMinutes = 0
    let found = false

    perYear.forEach(({ d }) => {
      const md = d[m]
      if (md) {
        found = true
        totalMinutes += Number(md.Minutes) || 0
        if (!best || (Number(md.Minutes) || 0) > (Number(best.Minutes) || 0)) best = md
      }
    })

    agg[m] = found ? { Minutes: totalMinutes, "Top-Artist": best["Top-Artist"], "Top-Track": best["Top-Track"] } : null
  })

  return agg
}

alltime.onclick = async function() {
  content.innerHTML = `<div class="loading">Loading all-time wrapped…</div>`

  const [data, artistData, hourData] = await Promise.all([
    fetch(`${API}/insights/alltime`).then(r => r.json()),
    fetch(`${API}/charts/artists/alltime`).then(r => r.json()),
    fetch(`${API}/charts/hour/alltime`).then(r => r.json())
  ])

  content.innerHTML = `
    <div class="view-head">
      <p class="eyebrow">Every stream, every year</p>
      <h2>All Time Wrapped</h2>
    </div>
    <div class="stat-grid">
      ${statCard("clock", "Minutes", data.total_minutes)}
      ${statCard("music", "Tracks", data.total_tracks)}
      ${statCard("mic-2", "Artists", data.total_artists)}
      ${statCard("star", "Top Artist", data.top_artist)}
      ${statCard("alarm-clock", "Peak Hour", data.peak_hour)}
    </div>
    <div class="chart-grid">
      ${chartCard("Top Artists", "Your most-played artists across all time", artistData.chart)}
      ${chartCard("Listening by Hour", "When you tune in the most", hourData.chart)}
    </div>
    <div class="view-head" style="margin-top:40px">
      <h3>Sound Capsule</h3>
      <p class="sub">Your all-time monthly capsule</p>
    </div>
    ${monthStripHTML(0)}
    <div id="capsuleTarget"></div>
  `
  icons()
  animateCounts(content)

  const stripEl = document.getElementById("monthStrip")
  const capsuleTarget = document.getElementById("capsuleTarget")
  const agg = await aggregateAllTimeCapsule()
  let currentIndex = 0

  function select(i){
    currentIndex = i
    setActiveMonth(stripEl, i)
    renderCapsuleSlide(capsuleTarget, MONTHS[i], agg[MONTHS[i]])
  }

  attachMonthStrip(stripEl, select)
  enableSwipe(capsuleTarget, () => select((currentIndex + 1) % 12), () => select((currentIndex - 1 + 12) % 12))
  select(0)
}

// ============================================================
// Year Wrapped
// ============================================================
year.onclick = function() {
  if (uploadedYears.length === 0) {
    content.innerHTML = `
      <div class="empty-state">
        <i data-lucide="calendar-x"></i>
        <p>Upload a Spotify export first.</p>
      </div>`
    icons()
    return
  }

  content.innerHTML = `
    <div class="view-head">
      <p class="eyebrow">Pick a year</p>
      <h2>Year Wrapped</h2>
    </div>
    <div class="year-pills" id="yearPills">
      ${uploadedYears.map(y => `<button class="year-pill" data-year="${y}">${y}</button>`).join("")}
    </div>
    <div id="yearContent"></div>
  `

  document.querySelectorAll(".year-pill").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".year-pill").forEach(b => b.classList.remove("active"))
      btn.classList.add("active")
      showYear(parseInt(btn.dataset.year))
    }
  })
}

async function showYear(y){
  const yearContent = document.getElementById("yearContent")
  yearContent.innerHTML = `<div class="loading">Loading ${y} wrapped…</div>`

  const [data, artistData, hourData, monthData, capsuleData] = await Promise.all([
    fetch(`${API}/insights/${y}`).then(r => r.json()),
    fetch(`${API}/charts/artists/${y}`).then(r => r.json()),
    fetch(`${API}/charts/hour/${y}`).then(r => r.json()),
    fetch(`${API}/charts/monthly/${y}`).then(r => r.json()),
    fetch(`${API}/capsule/${y}`).then(r => r.json())
  ])

  yearContent.innerHTML = `
    <div class="stat-grid">
      ${statCard("clock", "Minutes", data.total_minutes)}
      ${statCard("music", "Tracks", data.total_tracks)}
      ${statCard("mic-2", "Artists", data.total_artists)}
      ${statCard("star", "Top Artist", data.top_artist)}
      ${statCard("alarm-clock", "Peak Hour", data.peak_hour)}
    </div>
    <div class="chart-grid">
      ${chartCard("Top Artists", `Most played artists in ${y}`, artistData.chart)}
      ${chartCard("Listening by Hour", "When you tune in the most", hourData.chart)}
      ${chartCard("Monthly Trend", "Minutes listened across the year", monthData.chart)}
    </div>
    <div class="view-head" style="margin-top:40px">
      <h3>Sound Capsule</h3>
      <p class="sub">${y}, month by month</p>
    </div>
    ${monthStripHTML(0)}
    <div class="capsule-nav">
      <button id="prevMonth" class="ghost-btn"><i data-lucide="chevron-left"></i></button>
      <div id="capsuleTarget"></div>
      <button id="nextMonth" class="ghost-btn"><i data-lucide="chevron-right"></i></button>
    </div>
  `
  icons()
  animateCounts(yearContent)

  const stripEl = document.getElementById("monthStrip")
  const capsuleTarget = document.getElementById("capsuleTarget")
  let currentIndex = 0

  function select(i){
    currentIndex = i
    setActiveMonth(stripEl, i)
    renderCapsuleSlide(capsuleTarget, MONTHS[i], capsuleData[MONTHS[i]])
  }

  attachMonthStrip(stripEl, select)
  enableSwipe(capsuleTarget, () => select((currentIndex + 1) % 12), () => select((currentIndex - 1 + 12) % 12))
  document.getElementById("prevMonth").onclick = () => select((currentIndex - 1 + 12) % 12)
  document.getElementById("nextMonth").onclick = () => select((currentIndex + 1) % 12)

  select(0)
}