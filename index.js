const container = document.getElementById("carrousel-container")
let p = 0
const categoryImgs = document.querySelectorAll('.tarifs-section-div-img')
const titleAccueil = document.querySelector('.accueil-h1-js')
const carrousel = document.getElementById("carrousel")
const leftbutton = document.getElementById("carrousel-button-left")
const rightbutton = document.getElementById("carrousel-button-right")
const closebutton = document.getElementById("carrousel-button-close")
const nbr = 5
const imageMobileWidth = 400
const imageMobileHeight = 600
const imageDesktopWidth = 800
const imageDesktopHeight = 500

//fonction d'animation des titres (sauf accueil)
const animateTitle = (titleSelector) => {
    const title = document.querySelector(titleSelector)
    anime({
        targets: title,
        opacity: [0, 1],
        easing: 'easeInOutExpo',
        duration: 1500,
        delay: 500
    })
}

//fonction media querie js
const isWindowSmall = () => window.matchMedia("(max-width: 768px)").matches

//fonction transition
const updateTransform = () => {
    if(isWindowSmall()) {
        container.style.transform = `translate(${p*400}px)`
        container.style.transition = "all 0.5s ease"
    } else {
        container.style.transform = `translate(${p*800}px)`
        container.style.transition = "all 0.5s ease"  
    }
}

//fonction utilisation boutton carrousel
const showHide = () => {
    if (p === -nbr + 1) {
        leftbutton.style.visibility = "hidden"
        rightbutton.style.visibility = "visible"
        closebutton.style.visibility = "visible"
    } else if (p === 0) {
        leftbutton.style.visibility = "visible"
        rightbutton.style.visibility = "hidden"
        closebutton.style.visibility = "hidden"
    } else {
        leftbutton.style.visibility = "visible"
        rightbutton.style.visibility = "visible"
        closebutton.style.visibility = "hidden"
    }
}

// Configuration des boutons
if (leftbutton) {//suite error console lors du lancement js sur tarif
    leftbutton.addEventListener('click', () => {
        if (p > -nbr + 1) {
            p--
            updateTransform()
        }
            showHide()
    })
}

if (rightbutton) {//suite error console lors du lancement js sur tarif
    rightbutton.addEventListener('click', () => {
        if (p < 0) {
            p++
            updateTransform()
        }
        showHide()
    })
}

if (closebutton) { //suite error console lors du lancement js sur tarif
    closebutton.addEventListener('click', (event) => {
        event.preventDefault()
        hideCarrousel()
    })
}  

const hideCarrousel = () => {
    container.innerHTML = ''
    carrousel.style.visibility = "hidden"
    closebutton.style.visibility = "hidden"
    //reinitialise les carrousels à zero (=img1)
    p = 0;
    updateTransform();
    showHide();
}


document.addEventListener("DOMContentLoaded", () => { //DOMContentLoaded : apres le chargement complet de la page
    //animation des titres 
    // Utilisez anime.js pour ajouter une animation de fondu
    anime({
        targets: titleAccueil, //cible
        opacity: [0, 1], // Transition d'opacité de 0 à 1
        easing: 'easeInOutExpo', // Courbe d'accélération (ici, expo pour un effet plus prononcé)
        duration: 1500, // Durée de l'animation en millisecondes (ici, plus long)
        delay: 500 // Délai avant le démarrage de l'animation en millisecondes
    })
    animateTitle('.galerie-h1, .tarif-h1, .contact-h1')
    //animation galerie
    //pour chaque img
    const wrapperContainerBoxs = document.querySelectorAll('.container-wrapper-box-js')
    wrapperContainerBoxs.forEach((wrapperContainerBox) => {
        // au survol de la souris, le nom de la categorie s'affiche
        wrapperContainerBox.addEventListener("mouseover", () => {
            const wrapperP = wrapperContainerBox.querySelector('.wrapper-p-js')
            wrapperP.style.visibility = 'visible'
        })
        wrapperContainerBox.addEventListener("mouseout", () => {
            const wrapperP = wrapperContainerBox.querySelector('.wrapper-p-js')
            wrapperP.style.visibility = 'hidden'
        })
        //affichage du carrousel
        wrapperContainerBox.addEventListener("click", () => {
            // Supprime le contenu précédent: 
            for (let i = 1; i <= nbr; i++) {
                const div = document.createElement("div")
                div.className="photo"
                if (isWindowSmall()) { //mediaquery js pour affichage carrousel differents mobile et desktop
                    //on applique la width par defaut du container et on X par le nbr d'img :
                    container.style.width = (400 * nbr) + "px"
                    carrousel.style.width = `${imageMobileWidth}px`
                    carrousel.style.height = `${imageMobileHeight}px`
                    container.style.width = `${imageMobileWidth * nbr}px`
                    container.style.height = `${imageMobileHeight}px`
                    switch (wrapperContainerBox.id) {//mobile
                        case "box1":
                            div.style.backgroundImage ="url('img/bebe/mobile/img"+i+".jpg')"
                        break
                        case "box2":
                            div.style.backgroundImage ="url('img/famille/mobile/img"+i+".jpg')"
                        break
                        case "box3":
                            div.style.backgroundImage ="url('img/couple/mobile/img"+i+".jpg')"
                        break
                        case "box4":
                            div.style.backgroundImage ="url('img/grossesse/mobile/img"+i+".jpg')"
                        break
                        case "box5":
                            div.style.backgroundImage ="url('img/mariage/mobile/img"+i+".jpg')"
                        break
                        case "box6":
                            div.style.backgroundImage ="url('img/portrait/mobile/img"+i+".jpg')"
                        break
                        case "box7":
                            div.style.backgroundImage ="url('img/bapteme/mobile/img"+i+".jpg')"
                        break
                        default:
                            alert("Problème d'affichage du carrousel")
                        break
                    }
                } else {
                    container.style.width = (800 * nbr) + "px"
                    carrousel.style.width = `${imageDesktopWidth}px`
                    carrousel.style.height = `${imageDesktopHeight}px`
                    container.style.width = `${imageDesktopWidth * nbr}px`
                    container.style.height = `${imageDesktopHeight}px`
                    switch (wrapperContainerBox.id) {//desktop
                        case "box1":
                            div.style.backgroundImage ="url('img/bebe/desktop/img"+i+".jpg')"
                        break
                        case "box2":
                            div.style.backgroundImage ="url('img/famille/desktop/img"+i+".jpg')"
                        break
                        case "box3":
                            div.style.backgroundImage ="url('img/couple/desktop/img"+i+".jpg')"
                        break
                        case "box4":
                            div.style.backgroundImage ="url('img/grossesse/desktop/img"+i+".jpg')"
                        break
                        case "box5":
                            div.style.backgroundImage ="url('img/mariage/desktop/img"+i+".jpg')"
                        break
                        case "box6":
                            div.style.backgroundImage ="url('img/portrait/desktop/img"+i+".jpg')"
                        break
                        case "box7":
                            div.style.backgroundImage ="url('img/bapteme/desktop/img"+i+".jpg')"
                        break
                        default:
                            alert("Problème d'affichage du carrousel")
                        break
                    }
                }
                container.appendChild(div)
                hideCarrousel 
                carrousel.style.visibility = "visible"
            }
        })
    })
    categoryImgs.forEach((categoryImg) => {
    //au clique sur l'img
        categoryImg.addEventListener('click', () => {
            const correspondingTitle = categoryImg.nextElementSibling
            //cible l'element du DOM qui vient juste après
            correspondingTitle.style.visibility = "visible" //le titre s'affiche
            //pour que seul le h2 de l'img s'affiche. par defaut tous les h2 hidden via css 
            if (isWindowSmall()) {   
                //le titre s'anime :    
                anime({
                    targets: correspondingTitle, 
                    translateX:120, // déplace le h2 vers la droite de 150 px
                    translateY: -50, // déplace le h2 vers le haut de 50px
                    duration: 1500,
                    easing: 'easeOutExpo',// courbe d'animation
                    //une fois l'animation finie: 
                    complete: () => {
                        // Affiche le paragraphe correspondant à l'image cliquée à la fin de l'animation
                        const correspondingParagraph = correspondingTitle.nextElementSibling
                        correspondingParagraph.style.visibility = "visible"
                    }
                })
            } else {
                anime({
                    targets: correspondingTitle,
                    scale: [0.5, 1],
                    rotate: '1turn',
                    opacity: [0, 1],
                    duration: 1500,
                    easing: 'easeInOutExpo',
                    complete: () => {
                        const correspondingParagraph = correspondingTitle.nextElementSibling;
                        correspondingParagraph.style.visibility = "visible";
                    }
                })
            }
        })
    })
})

