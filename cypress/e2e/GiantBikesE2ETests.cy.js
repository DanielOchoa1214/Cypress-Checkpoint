/// <reference types="Cypress" />

import { GiantBikesPage } from "../page-objects/GiantBikesPage"

describe('End to End test suite', () => {

    const gbPage = new GiantBikesPage();

    const checkoutProcessAndCancelPurchase = (cartTotal) => {
        gbPage.getCartIcon().get('#summary-NumberOfItems').should('have.text', '1');
        gbPage.getCartIcon().get('#summary-total').should('have.text', cartTotal);
        
        gbPage.goToCheckout();

        gbPage.removeItem();

        gbPage.getCartEmptyMessage().should('have.text', 'Cart is empty')
    }

    beforeEach(() => {
        cy.visit('/us')
    })

    it('User browses bikes on main page, adds them to the cart, realizes the price and cancels purchase', () => {
        // Check prodicts list and go to the first one
        let productList = gbPage.getProductList();
        productList.get(".h3").eq(0).should('have.text', "Trance X 2");
        productList.eq(0).click();

        // Check the bike has valid reviews (User checks the reviews)
        gbPage.getReviewsList().each((el) => {
            cy.wrap(el).get('h3').should('not.be.empty')
        });

        gbPage.addBikeToCart();

        checkoutProcessAndCancelPurchase('$2,500.00');
    })

    it('User browses bikes on sale, adds them to the cart, realizes the price and cancels purchase', () => {
        // Go to sale section
        gbPage.goToSales();
        cy.url().should('contain', '/sale');
        // Apply some filters 
        cy.get('#countActiveRows').should('have.text', '98');
        gbPage.filterSaleResultsBy(["Road Bikes", "Kids Bikes"]);
        cy.get('#countActiveRows').should('have.text', '34');
        gbPage.getSalesResults().should('have.length', 34);
        // Select second bike
        gbPage.getSalesResults().eq(1).click();
        
        gbPage.addSalesBikeToCart('M');

        gbPage.closeAddedToCartPopup();

        // Checkout and the rest the same as above :)
        checkoutProcessAndCancelPurchase('$8,100.00');
    })

    it('User searches for bike news', () => {
        // Search for bikes in the search bar
        gbPage.search("bike");
        cy.url().should('contain', '/search?keyword=bike');

        // Go to news section and open the first one
        gbPage.goToNews();
        gbPage.goToFisrtNewsItem();

        cy.url().should('contain', '/news');

        gbPage.getTitle().should('have.text', 'Luke Meier-Smith Repeats Aussie DH National Title!');
        gbPage.getDate().should('have.text', 'Monday, March 18, 2024');

    })
})