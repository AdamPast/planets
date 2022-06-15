describe('dashboard test', () =>{
    beforeEach(() =>{
        cy.visit("http://localhost:3000/")
    })

    it('should display Title', () =>{
        cy.get('.pages__StyledH1-sc-bdbc25da-1')
        .contains('Kosmiczna encyklopedia układu słonecznego 🚀')
    })

    it('Should display three main categories', () =>{
        cy.get('.pages__StyledRow-sc-bdbc25da-2')
        .find('a')
        .should('be.visible')
    })

    it('should have expected text', () =>{
        cy.get('.pages__StyledRow-sc-bdbc25da-2')
        .find('a')
        .should(($a) => {
            const text = $a.map((i, el) => Cypress.$(el).text())
            const a = text.get()
            expect(a, 'has 3 a links').to.have.length(3)
            expect(a, 'has expected text in each a link').to.deep.eq([
              'Planety',
              'Gwiazdy',
              'Satelity',
            ])
          })
    })
})