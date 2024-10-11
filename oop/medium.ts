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
