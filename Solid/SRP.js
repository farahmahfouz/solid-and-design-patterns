const fs = require("fs");

class Report {
  constructor(title, data) {
    this.title = title;
    this.data = data;
  }

  generateReport() {
    return `Title: ${this.title}\nData: ${this.data}`;
  }
}

class ReportSaver {
  saveToFile(report, filename) {
    fs.writeFileSync(filename, report.generateReport());
  }
}

class ReportEmailer {
  sendEmail(report, email) {
    console.log(`Sending report to ${email}`);
    console.log(report.generateReport());
  }
}

// const myReport = new Report("Sales Report", "Total Sales: $5000");

// const saver = new ReportSaver();
// saver.saveToFile(myReport, "report.txt");

// const emailer = new ReportEmailer();
// emailer.sendEmail(myReport, "example@email.com");

//-------------------------------------------------------------------------------------//

class Invoice {
  constructor(customer, items) {
    this.customer = customer;
    this.items = items;
  }

  calculateTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

class InvoiceSaver {
  saveToFile(invoice, filename) {
    const data = `Customer: ${
      invoice.customer
    }\nTotal: ${invoice.calculateTotal()}`;
    fs.writeFileSync(filename, data);
  }
}

class InvoiceEmailer {
  sendToCustomerEmail(invoice, email) {
    console.log(`Sending invoice to ${email}`);
    console.log(
      `Customer: ${invoice.customer}, Total: ${invoice.calculateTotal()}`
    );
  }
}

// const invoice = new Invoice("Ahmed", [
//   { name: "Laptop", price: 1000 },
//   { name: "Mouse", price: 50 }
// ]);

// const saver = new InvoiceSaver();
// saver.saveToFile(invoice, "report.txt");

// const emailer = new InvoiceEmailer();
// emailer.sendToCustomerEmail(invoice, "example@email.com");

//-------------------------------------------------------------------------------------//

class UserManager {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  removeUser(username) {
    this.users = this.users.filter((u) => u.username !== username);
  }

  findUserByUsername(username) {
    return this.users.find((u) => u.username === username);
  }
}

class passwordChecker {
  static checkPassword(user, password) {
    if (user.password === password) {
      console.log("Login successful!");
      return true;
    } else {
      console.log("Login failed!");
      return false;
    }
  }
}

class Login {
  login(userManager, username, password) {
    const user = userManager.findUserByUsername(username);
    if (!user) {
      console.log("User not found");
      return false;
    }
    return passwordChecker.checkPassword(user, password);
  }
}

// const userManager = new UserManager();
// userManager.addUser({ username: "farah", password: "1234" });
// userManager.addUser({ username: "ahmed", password: "1234" });

// userManager.removeUser("ahmed");

// const loginService = new Login();
// loginService.login(userManager, "ahmed", "1234");
// loginService.login(userManager, "farah", "1234");
// loginService.login(userManager, "farah", "12s34");

//-------------------------------------------------------------------------------------//
let orders = [];

function addOrder(order) {
  orders.push(order);
  return true;
}

function sendNotification(order, total) {
  console.log(
    `Notification sent to ${order.customer.email} about order total: $${total}`
  );
}

function saveOrderToFile(orders) {
  fs.writeFileSync("orders.txt", JSON.stringify(orders, null, 2));
}

function calculateTotal(order) {
  let total = 0;
  for (let item of order.items) {
    total += item.price * item.quantity;
  }
  order.total = total;
  return total;
}

const newOrder = {
  customer: { name: "Ali", email: "ali@example.com" },
  items: [
    { name: "Book", price: 10, quantity: 2 },
    { name: "Pen", price: 2, quantity: 5 },
  ],
};

// const total = calculateTotal(newOrder);
// addOrder(newOrder);
// saveOrderToFile(orders);
// sendNotification(newOrder, total);

//-------------------------------------------------------------------------------------//

class PaymentProcessor {
  constructor(payment) {
    this.payment = payment;
    this.isProcessed = false;
  }
}

class Validate {
  static validate(processor) {
    if (!processor.payment.amount) return false;
    if (processor.payment.amount <= 0) return false;
    if (
      processor.payment.method != "card" &&
      processor.payment.method != "paypal"
    )
      return false;
    if (!processor.payment.customerEmail) return false;
    return true;
  }
}

class Process {
  static process(processor) {
    if (!Validate.validate(processor)) {
      console.log("Invalid payment");
      return false;
    }
    console.log(
      `Processing payment of $${processor.payment.amount} via ${processor.payment.method}`
    );
    processor.isProcessed = true;
    SendReceipt.sendReceipt(processor);
    return true;
  }
}

class SendReceipt {
  static sendReceipt(processor) {
    if (!processor.isProcessed) {
      console.log("Cannot send receipt before processing");
      return false;
    }
    console.log(`Receipt sent to ${processor.payment.customerEmail}`);
    return true;
  }
}

const payment = {
  amount: 100,
  method: "card",
  customerEmail: "ali@example.com",
};

const processor = new PaymentProcessor(payment);
Process.process(processor);
