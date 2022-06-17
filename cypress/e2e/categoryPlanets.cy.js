const { ChildProcess } = require("child_process")
let planets = ['Ziemia', 'Mars', "Wenus", "Merkury", "Jowisz", "Saturn", "Uran", "Neptun"]

describe('Category of planets tests', () =>{
    beforeEach(() =>{
        cy.visit("/")
        cy.get("div>a").eq(0).click()

    })

    it('should display Title', () =>{
        cy.get('h1')
        .should(($h1) =>{
            expect($h1).to.have.text('planety')
        })
    })

    it('should verify if all the planets are displayed ', () =>{
        for(let i = 0; i < planets.length; i++){
            cy.get('div > div')
            .find('a').eq(i)
            .should(() => {
                'be.visible'
            })
        }
    })

    it('should verify the correct name of all the planets in the correct order', () =>{
        for(let i = 0; i < planets.length; i++){
            cy.get('div > div')
            .find('p').eq(i)
            .should(($p) =>{
                expect($p).to.have.text(planets[i])
            })
        } 
    })

    it('should go back to the dashboard', () =>{
        cy.get('header > a').click()
        cy.url().should('eq', 'http://localhost:3000/')
    })
})