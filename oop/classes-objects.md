# OOP

## 1. Classes and Objects

Classes and objects are the fundamental structures of OOP. A class serves as a template for an object, defining its shape, values, attributes, and behavior within OOP.

Objects, on the other hand, are instances of these classes. They can process and fulfill their roles according to the structure defined by the classes they belong to.

## 2. Constructor

The constructor is the mechanism that activates when a class instance is created.

It’s a part of the class system, so it runs by default. However, when we want to do something different when a class instance is created, we can override the constructor.

```ts
class Car {
  name: string;
  price: number;

  constructor() {
    this.name = 'BMW';
    this.price = 40000;
  }
}

const carInstance = new Car();
console.log(`Car name: ${carInstance.name} and price: ${carInstance.price}`);
```

## 3. Methods

We call the functions in the class ‘methods.’ There are a few types of special methods used in classes, such as constructor methods, getter methods, and setter methods.

When accessing class properties, we must use the ‘this’ keyword.

```ts
class Car {
  shortName = 'BMW';
  //Error: Cannot find name shortName . Did you mean the instance member 'this.shortName' ?
  print(star: '*****'): void {
    this.shortName += star;
  }
}
```

## 4. Generic Classes

Classes, can be generic. When a generic class is instantiated with ’new’, its type parameters are inferred the same way as in a function call.

```ts
class Vehicle<Type> {
  contents: Type;

  constructor(value: Type) {
    this.contents = value;
  }
}

const car = new Vehicle<string>('Porches');

const carList = new Vehicle<string[]>(['BMW', 'Audi', 'Mercedes']);

const serialNumbers = new Vehicle(12345);

const carSerialNumbers = new Vehicle<
  {
    serialNumber: number;
    carName: string;
  }[]
>([
  {
    serialNumber: 12345,
    carName: 'BMW',
  },
  {
    serialNumber: 12346,
    carName: 'Audi',
  },
]);

console.log(car.contents);
console.log(carList.contents);
console.log(serialNumbers.contents);
console.log(carSerialNumbers.contents);
```

## 5. Encapsulation

Wrapping code and objects to form a single unit is basically what encapsulation means.

We aim to gather the relevant objects and data in one place and then, using access modifiers, wrap and consolidate this data into a single unit called a class.

During the encapsulation process, we can choose to restrict some authorization on the class data or control the class itself using access modifiers.

### 5.1 Access Modifiers

- **public**:
  - When we define a property(field) as public in a class, it means that the property can be accessed under any circumstances.
  - We can access that property outside of the class without any restrictions, and we can use that property even in its child classes.

```ts
class Car {
  public print(name: string) {
    console.log(`Car: ${name}`);
  }
}

const bmw = new Car();
bmw.print('BMW');
```

- **private**:
  - When we define a property as private within a class, it means that the property’s ownership is limited solely to the class in which it is defined.
  - We can utilize that property in the same class in any manner we wish. However, accessing or using it outside of the class or its child classes is not permissible.

```ts
class Car {
  private print(name: string) {
    console.log(`Car: ${name}`);
  }
}

const bmw = new Car();
bmw.print('BMW'); //* Property 'print' is private and only accessible within class 'Car'.
```

- **protected**:
  - When a property is designated as ‘protected’ within a class, it signifies that the property is accessible solely within that class and its subclasses.
  - However, outside of these classes, accessing or utilizing a ‘protected’ property isn’t possible.

```ts
class Car {
  protected print(name: string) {
    console.log(`Car: ${name}`);
  }
}

const bmw = new Car();
bmw.print('BMW'); //* Property 'print' is protected and only accessible within class 'Car' and its subclasses.
```

### 5.2 Getter and Setter methods

They are mostly used when handling restricted access modifiers.

```ts
class Car {
  private _price = 40000;

  get price() {
    return this._price;
  }
}

const car = new Car();

console.log(car.price); // 40000
car.price = 50000; // Error: Cannot assign to 'price' because it is a read-only property.
```

When there is only a ‘get’ method within a class, TypeScript automatically turns the relevant property into a read-only property.

```ts
class Car {
  private _price = 40000;

  get price() {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }
}

const car = new Car();

console.log(car.price); // 40000
car.price = 50000;
console.log(car.price); // 50000
```

### 5.3 Static Properties

Static members aren't associated with class instances, they can be used outside the instance scope.
To use static properties, we do not need an instance of the class exist. They are built into the class itself, which is why we can simply access then using the class itself.

```ts
class Car {
  public static numberOfCars: number = 4;
  carName: string = 'BMW';
}

console.log(Car.numberOfCars); //4
console.log(Car.carName); //undefined, Property 'carName' does not exist on type 'typeof Car'

const car = new Car();
console.log(car.carName); //BMW
```

## 6. Inheritance

Inheritance is a mechanism in OOP. It can create connections between independent code blocks (classes).

The essence of inheritance lies in facilitating classes with shared objectives to also share common properties. Rather than both classes independently possessing identical properties, this mechanism allows one class to inherit the common traits from another.

- **Single inheritance**: it’s the inheritance between one parent and one child class.
- **Multi-level inheritance**: each class inherits from the one directly above it, creating a structure akin to ladder.
- Multiple inheritance: one child class inherits properties from two parent classes that aren’t related to each other. (JavaScript do not support this type of inheritance)
- Multipath inheritance: This inheritance pattern involves creating a child class from multiple other child classes and sharing the same base class among them. (JavaScript do not support this type of inheritance)
- **Hierarchical Inheritance**: more than one child class is created from a single base class, and further child classes act as parent classes for more than one child class.
- Hybrid Inheritance: The inheritance pattern observed here is actually a combination of more than one type. Therefore, if the hybrid pattern involves multiple or multipath inheritance. (JavaScript do not support this type of inheritance)

### 6.1 Super

It’s an OOP keyword used in inheritance mechanisms to access the parent class constructor or method.

### 6.2 Extends

It’s an OOP keyword used in the inheritance mechanism to form inheritance relationships within classes.

```ts
class Parent {
  id = 4;
}

class Child extends Parent {
  constructor() {
    //Constructors for derived classes must contain a 'super' call.
    console.log(this.id); //'super' must be called before accessing 'this' in the constructor of a derived class.
  }
}
```

```ts
class Parent {
  id = 4;
}

class Child extends Parent {
  constructor() {
    super();
  }
}

const child = new Child();
console.log(child.id);
```

## 7. Abstraction

Abstraction involves concealing the inner workings and complexity of a class from the outer world. It selectively provides relevant information to the outside world.

Employing abstraction means a programmer doesn’t need to worry about the internal mechanisms of the utilized class. It’s akin to a to-do list; it prompts the programmer to work on the tasks it presents without the need to delve beyond the relevant information presented within the abstract class.

> Let’s use an analogy: if we consider a car and its driver, we can liken the car to an abstract class while the driver represents a programmer. To effectively operate the car and drive safely, the driver doesn’t need to understand the intricacies of the car’s engines; rather, the driver only needs to know how to start the car and operate it to reach the destination. This process is the concept of abstraction.

### 7.1 Abstract class

Abstract classes differ from normal classes by nature. While you can create an instance of a normal class, you cannot create an instance of an abstract class. Because they are abstract, they aren’t actual objects; they merely represent a blueprint or a template.

When using abstract classes in inheritance, the _extends_ keyword is used, and the class that inherits the abstract class must define all the abstract class properties to function properly.

```ts
abstract class Car {
  abstract start(): void;
  abstract stop(): void;
}

class BMW extends Car {
  start(): void {
    console.log('BMW start');
  }

  stop(): void {
    console.log('BMW stop');
  }
}

const bmw = new BMW();
bmw.start();
```

### 7.2 Interface

When a class inherits from an interface, it must use the _implements_ keyword.

Interfaces can form inheritance relationships between them, and when they do, they use the _extends_ keyword.

### 7.3 Implements

We use _extends_ between classes and we use _implements_ when there is an interface in the process. Also, we can use _implements_ to check if a particular class satisfies interface requirements.

```ts
interface Market {
  showPrice(): void;
}

class Car implements Market {
  price = 200;

  showPrice(): void {
    console.log(`The price of the car is ${this.price}`);
  }
}

const car = new Car();
car.showPrice();
```

## 8. Polymorphism

Polymorphism occurs when a child class modifies or reshapes the inherited properties. Essentially, this means a child class can modify or override some of the properties inherited from its parent.

### 8.1 Method overriding

Method overriding allows us to redefine a method from the superclass within the child class.

```ts
class WorkingHour {
  time() {
    console.log('Business is open between 8am and 5pm');
  }
}

class Market extends WorkingHour {
  //if we remove the '?' on the parameter 'isBossOnVacation' we will recieve an error
  //Error: Type '(isBossOnVacation: boolean) => void' is not assignable to type '() => void'.
  time(isBossOnVacation?: boolean): void {
    if (isBossOnVacation) {
      console.log('business is close');
    } else {
      console.log('Business is open between 9am and 4pm');
    }
  }
}

const instance = new Market();
//Output: Business is open between 9am and 4pm
instance.time();
//Output: business is close
instance.time(true);
```

### 8.2 Method overloading

With this method, we can overload a method in the superclass by writing a new version of the method in the child class. We can change parameters and return types to overload the superclass method.

```ts
class GeometricShape {
  calculateArea(radius: number): number;
  calculateArea(length: number, width: number): number;

  calculateArea(arg1: number, arg2?: number): number {
    if (arg2 === undefined) {
      // Calculate area of circle
      return Math.PI * arg1 * arg1;
    } else {
      // Calculate area of rectangle
      return arg1 * arg2;
    }
  }
}

const shape = new GeometricShape();

console.log(shape.calculateArea(5)); // 78.54
console.log(shape.calculateArea(5, 10)); // 50
```
