export function avisUtilisateur () {
    const boutonAvis = document.querySelectorAll(".liste-jeux .rpg .liste-rpg div button")

    for (let i = 0; i < boutonAvis.length; i++) {
        boutonAvis[i].addEventListener("click", (event) => {
            const id = event.target.dataset.id
            fetch(``)
        })
    }
}