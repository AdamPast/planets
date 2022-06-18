const { ChildProcess } = require("child_process")

describe('Category of satellites tests', () =>{
    beforeEach(() =>{
        cy.visit("/")
        cy.get("div>a").eq(2).click()

    })

    it('should display Title', () =>{
        cy.get('h1')
        .should(($h1) =>{
            expect($h1).to.have.text('gwiazdy')
        })
    })

    it('should verify if star is displayed ', () =>{
            cy.get('div')
            .find('a')
            .should(() => {
                'be.visible'
            })
    })

    it('should verify the correct name of the star', () =>{
            cy.get('div > p')
            .should(($p) =>{
                expect($p).to.have.text('Słońce')
            })
    })

    it('should go back to the dashboard', () =>{
        cy.get('header > a').click()
        cy.url().should('eq', 'http://localhost:3000/')
    })
})