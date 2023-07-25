describe('burger constructor page', function () {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('http://localhost:3000');
    cy.contains('Соберите бургер');
  })

  it('the ingridients have been loaded', () => {
    cy.get('[data-cy="ingredients-container"]').as("all-ingredients")
    cy.get('@all-ingredients').get('[data-cy="ingredient-bun"]').as('buns')
    cy.get('@all-ingredients').get('[data-cy="ingredient-main"]').as('mains')
    cy.get('@all-ingredients').get('[data-cy="ingredient-sauce"]').as('sauses')
  })

  it('should show & hide ingredient popup', () => {
    cy.get('[data-cy="ingredients-container"]').as("all-ingredients")
    cy.get('@all-ingredients').get('[data-cy="ingredient-bun"]').as('buns')
    cy.get('@buns').each((bun) => {
      cy.log("open popup...")
      cy.get(bun).click()
      cy.get("[data-cy='ingredient-details-name']").should('be.visible')
      cy.log("close popup...")
      cy.get("[data-cy='modal-close-icon']").click()
    })
    cy.get('@all-ingredients').get('[data-cy="ingredient-main"]').as('mains')
    cy.get('@mains').each((main) => {
      cy.log("open popup...")
      cy.get(main).click()
      cy.get("[data-cy='ingredient-details-name']").should('be.visible')
      cy.log("close popup...")
      cy.get("[data-cy='modal-close-icon']").click()
    })
    cy.get('@all-ingredients').get('[data-cy="ingredient-sauce"]').as('sauses')
    cy.get('@sauses').each((saus) => {
      cy.log("open popup...")
      cy.get(saus).click()
      cy.get("[data-cy='ingredient-details-name']").should('be.visible')
      cy.log("close popup...")
      cy.get("[data-cy='modal-close-icon']").click()
    })
  })
  it('dnd', () => {
    const dataTransfer = new DataTransfer()
    cy.get('[data-cy="ingredients-container"]').as("all-ingredients")
    cy.get('[data-cy="ingredients-constructor"]').as("drop-container")
    cy.get('@all-ingredients').get('[data-cy="ingredient-bun"]').as('buns')
    cy.get('@all-ingredients').get('[data-cy="ingredient-main"]').as('mains')
    cy.get('@all-ingredients').get('[data-cy="ingredient-sauce"]').as('sauses')
    cy.get('@buns').each((bun) => {
      cy.get(bun).trigger('dragstart', { dataTransfer })
      cy.get('@drop-container').trigger('drop', { dataTransfer })
      cy.get(bun).get('[data-cy="ingredient-counter"]').contains('1')
    })
    cy.get('@mains').each((main) => {
      cy.get(main).trigger('dragstart', { dataTransfer })
      cy.get('@drop-container').trigger('drop', { dataTransfer })
      cy.get(main).get('[data-cy="ingredient-counter"]').contains('1')
    })
    cy.get('@sauses').each((saus) => {
      cy.get(saus).trigger('dragstart', { dataTransfer })
      cy.get('@drop-container').trigger('drop', { dataTransfer })
      cy.get(saus).get('[data-cy="ingredient-counter"]').contains('1')
    })
  })

  it('create order', () => {
    const dataTransfer = new DataTransfer()
    cy.get('[data-cy="ingredients-container"]').as("all-ingredients")
    cy.get('[data-cy="ingredients-constructor"]').as("drop-container")
    cy.get('@all-ingredients').get('[data-cy="ingredient-bun"]').first().as('bun')
    cy.get('@all-ingredients').get('[data-cy="ingredient-main"]').should('have.length.greaterThan', 3).invoke('slice', 0, 3).as('mains')
    cy.get('@all-ingredients').get('[data-cy="ingredient-sauce"]').should('have.length.greaterThan', 3).invoke('slice', 0, 3).as('sauses')

    cy.get('@bun').trigger('dragstart', { dataTransfer })
    cy.get('@drop-container').trigger('drop', { dataTransfer })

    cy.get('@mains').each((main) => {
      cy.get(main).trigger('dragstart', { dataTransfer })
      cy.get('@drop-container').trigger('drop', { dataTransfer })
      cy.get(main).get('[data-cy="ingredient-counter"]').contains('1')
    })
    cy.get('@sauses').each((saus) => {
      cy.get(saus).trigger('dragstart', { dataTransfer })
      cy.get('@drop-container').trigger('drop', { dataTransfer })
      cy.get(saus).get('[data-cy="ingredient-counter"]').contains('1')
    })

    cy.get('[data-cy="create-order-btn"]').click()
    cy.contains('Вход')
    cy.get('input[name=email]').type(`${"test@yandex.ru"}`)
    cy.get('input[name=password]').type(`${"12345678"}`)
    cy.get('Button').click()
    cy.intercept("POST", "api/auth/login", { fixture: "login.json" })
    cy.contains('Ваш заказ начали готовить')
    cy.get("[data-cy='modal-close-icon']").click()
  })
}); 