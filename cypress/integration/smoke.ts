// <reference types="cypress" />

describe("smoke tests", () => {
  // afterEach(() => {})
  it("initial ", () => {
    cy.visit("/");
    // cy.findByRole("button", { name: "Login" }).click();
  });
});

export {};
