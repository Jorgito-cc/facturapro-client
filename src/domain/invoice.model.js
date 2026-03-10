// Modelo puro sin dependencia de React

export class Invoice {
  constructor() {
    this.invoiceNumber = "";
    this.customerName = "";
    this.customerNit = "";
    this.issueDate = "";
    this.items = [];
  }
}