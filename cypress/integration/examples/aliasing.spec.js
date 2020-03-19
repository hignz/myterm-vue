/* eslint-disable no-undef */
/// <reference types="cypress" />

it('select a college, a course then navigate to it', () => {
  cy.visit('https://myterm.me/');
  cy.get('.v-select__selections').click();

  cy.contains('IT Sligo').click();

  cy.get('.v-input__append-inner')
    .eq(1)
    .click();
  cy.get('.v-list-item__title')
    .eq(4)
    .click();
  cy.get('.v-btn--block > .v-btn__content').click();
});

// it('save a course to favourites', () => {
//   // cy.visit('http://localhost:8080/');
//   // cy.get('.v-btn--flat:nth-child(3) > .v-btn__content > span').click();
//   // cy.get('.primary--text > .v-btn__content').click();

//   cy.visit(
//     'http://localhost:8080/timetable?code=SG_KSDEV_07%2FF%2FY3%2F1%2F%28A%29&college=0'
//   );
//   cy.get('.d-none .v-icon').click();
//   cy.get('.v-btn--flat:nth-child(3) > .v-btn__content > span').click();
// });

// it('remove a course from favourites', () => {
//   cy.visit(
//     'http://localhost:8080/timetable?code=SG_KSDEV_07%2FF%2FY3%2F1%2F%28A%29&college=0'
//   );
//   cy.get('.d-none .v-icon').click();
//   cy.get('.v-btn--flat:nth-child(3) > .v-btn__content > span').click();
//   cy.get('.v-list-item:nth-child(1) .v-icon').click();
//   cy.get('.error > .v-btn__content').click();
// });

it('save a course to favourites', () => {
  cy.visit(
    'https://myterm.me/timetable?code=SG_KSDEV_07%2FF%2FY3%2F1%2F%28A%29&college=0&sem=1'
  );

  cy.get('.v-card__title').then($title => {
    const txt = $title.text();
    cy.get('.d-none .v-icon').click();
    cy.get('.v-btn--flat:nth-child(3) > .v-btn__content > span').click();

    cy.get('.v-list-item__title').should($title2 => {
      expect($title2.text()).to.eq(txt);
    });
  });
});

it('save and then remove a course from favourites', () => {
  cy.visit(
    'https://myterm.me/timetable?code=SG_KSDEV_07%2FF%2FY3%2F1%2F%28A%29&college=0&sem=1'
  );

  cy.get('.v-card__title').then($title => {
    const txt = $title.text();
    cy.get('.d-none .v-icon').click();
    cy.get('.v-btn--flat:nth-child(3) > .v-btn__content > span').click();

    cy.get('.v-list-item__title').should($title2 => {
      expect($title2.text()).to.eq(txt);
    });
    cy.visit(
      'https://myterm.me/timetable?code=SG_KSDEV_07%2FF%2FY3%2F1%2F%28A%29&college=0&sem=1'
    );

    cy.get('.d-none .v-icon').click();
    cy.visit('https://myterm.me/saved');

    cy.get('.v-list-item__subtitle:nth-child(2)').should('not.exist');
  });
});
