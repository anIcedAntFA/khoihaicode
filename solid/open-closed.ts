type DB = 'MySQL' | 'Redis' | 'Neo4j';

// class QueryGenerator {
//   getReadingQuery(db: DB): string {
//     switch (db) {
//       case 'MySQL':
//         return 'SELECT * FROM MySQL';
//       case 'Redis':
//         return 'SCAN 0';
//       case 'Neo4j':
//         return 'MATCH (n) RETURN n';
//       default:
//         return 'Unknown';
//     }
//   }

//   getWritingQuery(database: DB, data: string): string {
//     switch (database) {
//       case 'MySQL':
//         return `INSERT INTO MySQL VALUES (${data})`;
//       case 'Redis':
//         return `SET ${data}`;
//       case 'Neo4j':
//         return `CREATE (${data})`;
//       default:
//         return 'Unknown';
//     }
//   }
// }

interface QueryGenerator {
  getReadingQuery: () => string;
  getWritingQuery: (data: string) => string;
}

class MySql implements QueryGenerator {
  getReadingQuery() {
    return 'SELECT * FROM MySQL';
  }

  getWritingQuery(data: string) {
    return `INSERT INTO MySQL VALUES (${data})`;
  }
}

class Redis implements QueryGenerator {
  getReadingQuery() {
    return 'SCAN 0';
  }

  getWritingQuery(data: string) {
    return `SET ${data}`;
  }
}

class Neo4j implements QueryGenerator {
  getReadingQuery() {
    return 'MATCH (n) RETURN n';
  }

  getWritingQuery(data: string) {
    return `CREATE (${data})`;
  }
}

// class PaymentService {
//   processPayment(method: string, amount: number): void {
//     if (method === 'CreditCard') {
//       this.processCreditCardPayment(amount);
//     } else if (method === 'PayPal') {
//       this.processPayPalPayment(amount);
//     } else if (method === 'Bitcoin') {
//       this.processBitcoinPayment(amount);
//     } else {
//       console.log('Unknown payment method');
//     }
//   }

//   private processCreditCardPayment(amount: number): void {
//     console.log(`Processing credit card payment of $${amount}`);
//   }

//   private processPayPalPayment(amount: number): void {
//     console.log(`Processing PayPal payment of $${amount}`);
//   }

//   private processBitcoinPayment(amount: number): void {
//     console.log(`Processing Bitcoin payment of $${amount}`);
//   }
// }

// // Usage example
// const paymentService = new PaymentService();
// paymentService.processPayment('CreditCard', 100);
// paymentService.processPayment('PayPal', 200);
// paymentService.processPayment('Bitcoin', 300);

// Define an abstract class for payment processors
abstract class PaymentProcessor {
  abstract processPayment(amount: number): void;
}

// Implement CreditCard payment processor
class CreditCardProcessor extends PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing credit card payment of $${amount}`);
  }
}

// Implement PayPal payment processor
class PayPalProcessor extends PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing PayPal payment of $${amount}`);
  }
}

// Implement Bitcoin payment processor
class BitcoinProcessor extends PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing Bitcoin payment of $${amount}`);
  }
}

// Main PaymentService class
class PaymentService {
  private processors: { [key: string]: PaymentProcessor } = {
    CreditCard: new CreditCardProcessor(),
    PayPal: new PayPalProcessor(),
    Bitcoin: new BitcoinProcessor(),
  };

  processPayment(method: string, amount: number): void {
    const processor = this.processors[method];
    if (processor) {
      processor.processPayment(amount);
    } else {
      console.log('Unknown payment method');
    }
  }
}

// Usage example
const paymentService = new PaymentService();
paymentService.processPayment('CreditCard', 100);
paymentService.processPayment('PayPal', 200);
paymentService.processPayment('Bitcoin', 300);
