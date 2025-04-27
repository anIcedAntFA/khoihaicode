function constExample() {
  if (true) {
    const x = 10; // Block-scoped to the if block
    console.log(x); // 10
  }
  // console.log(x); // ReferenceError: x is not defined (outside the if block's scope)

  const y = 20;
  // const y = 30; // SyntaxError: Identifier 'y' has already been declared (Redeclaration not allowed)
  // y = 30; // TypeError: Assignment to constant variable (Reassignment not allowed)
  console.log(y); // 20

  const myObject = { name: 'Astro' };
  myObject.name = 'Updated Astro'; // Modifying contents is allowed
  console.log(myObject); // { name: 'Updated Astro' }
  // myObject = { name: 'New Object' }; // TypeError: Assignment to constant variable (Reassigning the object reference is NOT allowed)
}
constExample();

// const myConst; // SyntaxError: Missing initializer in const declaration (Must initialize)
// console.log(myConst); // ReferenceError: Cannot access 'myConst' before initialization (TDZ)
const myConst = 5;
console.log(myConst); // 5
