const reponse = await fetch("../data-base.json")
const jeu = await reponse.json()



function genereItems (tableau, type) {

    let rpg = document.querySelector(".liste-rpg")
    let action = document.querySelector(".liste-action")
    let aventure = document.querySelector(".liste-aventure")
    let strategie = document.querySelector(".liste-strategie")

    const div = document.createElement("div")

    div.innerHTML = `
        <img src=${tableau.image} width="250px" height="350" alt=${tableau.description}/>
        <h2>${tableau.nom}</h2>
        <h4>${tableau.description  ?? "aucune description en ce moment"}</h4>
        <span>${tableau.popular === 4 ? "⭐⭐⭐⭐" : "⭐⭐⭐⭐⭐"}</span>
        <button>Voir plus <i class='bx bx-chevrons-right'></i></button>
    `

    switch (type) {
        case "rpg":
            rpg.appendChild(div)
            break;
        case "aventure":
                aventure.appendChild(div)
            break;
        case "action":
            action.appendChild(div)
            break;
        case "strategie":
            strategie.appendChild(div)
            break;
    }
    

    return rpg, action, aventure, strategie
}

function updateListe(item) {

    for (let i = 0; i < item.length; i++) {
        
        const itemList = document.createElement("article")
        const imageList = document.createElement("img")
        const itemNom = document.createElement("h2")
        const itemDescritpion = document.createElement("h4")
        const itemPopular = document.createElement("span")
        const bouton = document.createElement("button")
        const title = document.createElement("h2")

        
        title.innerText = 
        imageList.src =item[i].image
        imageList.style.width = "250px"
        imageList.style.height = "350px"
        itemNom.innerText= item[i].nom
        itemDescritpion.innerText = item[i].description ?? "aucune description en ce moment"
        itemPopular.innerText = item[i].popular === 4 ? "⭐⭐⭐⭐" : "⭐⭐⭐⭐⭐"
        bouton.innerText = "Voir Plus"


        itemList.appendChild(imageList)
        itemList.appendChild(itemNom)
        itemList.appendChild(itemDescritpion)
        itemList.appendChild(itemPopular)
        itemList.appendChild(bouton)

        let sortList = document.querySelector(".sortList")
        sortList.appendChild(itemList);
    }

   
}



for (let je of jeu) {
    genereItems(je, je.type)
}


const boutonSort = document.querySelector(".sort")
boutonSort.addEventListener("click", () => {
    const liste = Array.from(jeu)
    liste.sort((a, b) => {
        return b.popular - a.popular
    })
    document.querySelector(".Liste-jeux").innerHTML= ""
    document.querySelector(".sortList").innerHTML = ""
    document.querySelector(".tousJeux h2").innerHTML = "Les meilleurs jeux en ce moment"
    updateListe(liste)
    
})


const boutonFilter = document.querySelector(".filter")
boutonFilter.addEventListener("click", () => {
    const filterList = jeu.filter((je) => {
        return je.popular > 4
    })
    
    document.querySelector(".Liste-jeux").innerHTML = ""
    document.querySelector(".sortList").innerHTML = ""
    document.querySelector(".tousJeux h2").innerHTML = "Les TOP des jeux en ce moment"
    updateListe(filterList)
})

const option = document.getElementById("filter")
option.addEventListener("change", (e) => {
    console.log(e.currentTarget.value)
    const filter = jeu.filter((f) => {
        return f.type === e.currentTarget.value
    })
    console.log(filter)
    document.querySelector(".Liste-jeux").innerHTML = ""
    document.querySelector(".sortList").innerHTML = ""

    for (let fil of filter) {
        switch (fil.type) {
            case "aventure":
                document.querySelector(".tousJeux h2").innerHTML = `Les TOP des jeux AVENTURES en ce moment`
                break;
            case "action":
                document.querySelector(".tousJeux h2").innerHTML = `Les TOP des jeux ACTION en ce moment`
                break;
            case "rpg":
                document.querySelector(".tousJeux h2").innerHTML = `Les TOP des jeux RPG en ce moment`
                break;
            case "strategie":
                document.querySelector(".tousJeux h2").innerHTML = `Les TOP des jeux STRATEGIE en ce moment`
                break;
    }
        
    }
    
    updateListe(filter)
    
})


// const affichage = document.querySelector(".affichageRange") 
// const rangeElement = document.querySelector("#rangeElement")
// rangeElement.addEventListener("change", (event) => { 
//         affichage.innerHTML = event.currentTarget.value
//         if (event.currentTarget.value <= 40 ) {
//             affichage.style.backgroundColor = "red"
//         } else if (event.currentTarget.value > 40 ) {
//             affichage.style.backgroundColor = "green"

//         }
// })

const search = document.getElementById("search")
console.log(search)


search.addEventListener("keydown", (ev) => {
    
    let valeur = ev.currentTarget.value.toLowerCase()

    const filtres = jeu.filter((filtre => {
        return filtre.nom.toLowerCase().includes(valeur) 
    }))

    document.querySelector(".Liste-jeux").innerHTML = ""
    document.querySelector(".sortList").innerHTML = ""
    document.querySelector(".tousJeux h2").innerHTML = "Les résultats du recherche"
    updateListe(filtres)
})








