/// <reference types="Cypress" />

export class GiantBikesPage {

    navigate(){
        cy.visit("")
    }

    getProductList(){
        return cy.get('div[aria-label="product"]')
    }

    getReviewsList(){
        return cy.get('.pr-review');
    }

    addBikeToCart(){
        cy.get('button.name-and-stockinfo').eq(0).click();
        cy.get('.btn-addtocart').click();
    }

    getCartIcon(){
        return cy.get('.cart');
    }

    goToCheckout(){
        cy.get('.cart').click();
        cy.get('#proceedToCheckoutButton').click();
    }

    removeItem(){
        cy.get('td.remove .remove-cart-item').eq(2).click();
    }

    getCartEmptyMessage(){
        return cy.get('#cart-summary p').eq(0)
    }

    search(query){
        cy.get('.search button').click();
        cy.get('input#search').type(query + "{enter}");
    }

    goToNews(){
        cy.get('#tab-news-search-summary').click();
    }

    goToFisrtNewsItem(){
        return cy.get('div[aria-label="News Item"] .h3').eq(0).click();
    }

    getTitle(){
        return cy.get('h1')
    }

    getDate(){
        return cy.get('.publishdate');
    }

    goToSales(){
        cy.get('#sale').click();
    }

    filterSaleResultsBy(filters){
        filters.forEach(filter => {
            cy.applyFilter(filter);
        });
    }

    getSalesResults(){
        return cy.get('div[aria-label="product"]:not([style="display: none;"])');
    }

    addSalesBikeToCart(size){
        cy.get('button[data-id="sizes"]').click();
        cy.get('#bs-select-2').contains(size).click()
        cy.get('.btn-addtocart').click();
    }

    closeAddedToCartPopup(){
        cy.get('#cartModal button.close').click()
    }
}