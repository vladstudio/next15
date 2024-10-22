describe("Navigation", () => {
  it("should navigate to the about page", () => {
    cy.visit("http://localhost:3000/");
    cy.get('a[href="/form"]').click();
    cy.url().should("include", "/form");
    cy.get("h3").contains("Send data with form");
  });
});
