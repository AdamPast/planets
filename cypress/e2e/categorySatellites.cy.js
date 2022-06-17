const { ChildProcess } = require("child_process")
let satellites = ['Księżyc', 'Europa', "Ganimedes", "Kallisto", "IO", "Tytan", "Miranda", "Tryton"]

describe('Category of satellites tests', () =>{
    beforeEach(() =>{
        cy.visit("/")
        cy.get("div>a").eq(1).click()

    })

    it('should display Title', () =>{
        cy.get('h1')
        .should(($h1) =>{
            expect($h1).to.have.text('satelity')
        })
    })

    it('should verify if all the satellites are displayed ', () =>{
        for(let i = 0; i < satellites.length; i++){
            cy.get('div > div')
            .find('a').eq(i)
            .should(() => {
                'be.visible'
            })
        }
    })

    it('should verify the correct name of all the satellites in the correct order', () =>{
        for(let i = 0; i < satellites.length; i++){
            cy.get('div > p')
            .eq(i)
            .should(($p) =>{
                expect($p).to.have.text(satellites[i])
            })
        } 
    })

    it('should go back to the dashboard', () =>{
        cy.get('header > a').click()
        cy.url().should('eq', 'http://localhost:3000/')
    })
})