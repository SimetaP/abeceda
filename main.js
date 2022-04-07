let textarea = document.getElementById("game-form-input")
let sljedeceSlovo = document.getElementById("sljedece-slovo")
const rezultat = document.getElementById('rezultat')
const konacniRezultat = document.getElementById('konacni-rezultat')
const rezultati = document.getElementById('rezultati')
const abeceda = ["a", "b", "c", "č", "ć", "d", "d", "ž", "đ", "e", "f", "g", "h", "i", "j", "k", "l", "l", "j", "m", "n", "n", "j", "o", "p", "r", "s", "š", "t", "u", "v", "z", "ž"];
let a = 0;

function sljedeceSlovoPoruka(poruka) {
    sljedeceSlovo.innerHTML = poruka;
}

// Šta se dešava dok se piše abeceda
textarea.addEventListener("keydown", (e) => {
    // slovo A
    if (e.key == "a" && a < 1) {
        startStopwatch();
        a = 1;
        sljedeceSlovoPoruka(`${abeceda[a]}`)
        rezultati.innerHTML = ''
        currentRender(abeceda[a-1])
    // zadnje slovo
    } else if (e.key == abeceda[abeceda.length - 1] && a == abeceda.length - 1) {
        stopStopwatch();
        currentRender(abeceda[a])
        finalRender()
        sljedeceSlovoPoruka(`gotovo`);
        rezultat.showModal()
    // ENTER
    } else if (e.key == 'Enter') {
        e.preventDefault();
        resetPisanjeAbecede()
        a = 0
        sljedeceSlovoPoruka(`${abeceda[a]}`)
    } else if (e.key == abeceda[a]) {
        switch (true) {
            // DŽ
            case (a == 5):
                a = a + 1
                sljedeceSlovoPoruka(`dž`)
                currentRender('d')
                break
            case (a == 6):
                a = a + 1
                sljedeceSlovoPoruka(`dž`)
                break
            case (a == 7):
                a = a + 1
                sljedeceSlovoPoruka(`${abeceda[a]}`)
                currentRender('dž')
                break
            // LJ
            case (a == 16):
                a = a + 1
                sljedeceSlovoPoruka(`lj`)
                currentRender('l')
                break
            case (a == 17):
                a = a + 1
                sljedeceSlovoPoruka(`lj`)
                break
            case (a == 18):
                a = a + 1
                sljedeceSlovoPoruka(`${abeceda[a]}`)
                currentRender('lj')
                break
            // LJ
            case (a == 20):
                a = a + 1
                sljedeceSlovoPoruka(`nj`)
                currentRender('n')
                break
            case (a == 21):
                a = a + 1
                sljedeceSlovoPoruka(`nj`)
                break
            case (a == 22):
                a = a + 1
                sljedeceSlovoPoruka(`${abeceda[a]}`)
                currentRender('nj')
                break
            // ostala slova
            default:
                a = a + 1;
                sljedeceSlovoPoruka(`${abeceda[a]}`)
                currentRender(abeceda[a-1])
                break
        }


        /* // DŽ
        if (a == 5) {
            a = a + 1
            sljedeceSlovoPoruka(`dž`)
            currentRender('d')
        } else if (a == 6) {
            a = a + 1
            sljedeceSlovoPoruka(`dž`)
        } else if (a == 7) {
            a = a + 1
            sljedeceSlovoPoruka(`${abeceda[a]}`)
            currentRender('dž')
        // sva ostala slova
        } else {
            a = a + 1;
            sljedeceSlovoPoruka(`${abeceda[a]}`)
            currentRender(abeceda[a-1])
        } */
    } else if (e.key == 'A') {
        alert("Isključi CAPS LOCK !!");
    } else {
        e.preventDefault();
    }
  });

// Funkcije kad je gotovo (trenutno nema ničeg)
const gotovoZnak = document.getElementById('gotovo')

function gotovaAbeceda() {
  gotovoZnak.classList.remove('hide')
}
function gotovoSakrij() {
  gotovoZnak.classList.add('hide')
}

function resetPisanjeAbecede() {
    textarea.value = ""
    stopStopwatch()
    resetStopwatch()
}

// Modal

function closeModal() {
    rezultat.close()
}

// Timer
let offset = 0
let paused = true

render()

function startStopwatch(evt) {
  if (paused) {
    paused = false
    offset -= Date.now()
    render()
  }
}

function stopStopwatch(evt) {
  if (!paused) {
    paused = true
    offset += Date.now()
  }
}

function resetStopwatch(evt) {
  if (paused) {
    offset = 0
    render()
  } else {
    offset = -Date.now()
  }
}

function format(value, scale, modulo, padding) {
  value = Math.floor(value / scale) % modulo
  return value.toString().padStart(padding, 0)
}

function render() {
  var value = paused ? offset : Date.now() + offset

  document.querySelector("#s_ms").textContent = format(value, 1, 1000, 3)
  document.querySelector("#s_seconds").textContent = format(value, 1000, 60, 2)

  if (!paused) {
    requestAnimationFrame(render)
  }
}

function currentRender(trenutnoSlovo) {
  var value = paused ? offset : Date.now() + offset
  rezultati.innerHTML += `<p>${trenutnoSlovo} : ${format(value, 1000, 60, 2)}.${format(value, 1, 1000, 3)}s</p>`
}
function finalRender() {
    var value = paused ? offset : Date.now() + offset
    konacniRezultat.innerHTML = `<p>${format(value, 1000, 60, 2)}.${format(value, 1, 1000, 3)}s</p>`
  }