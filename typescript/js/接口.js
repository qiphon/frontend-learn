"use strict";
// function printLabel(labelledObj: { label: string }) {
//     console.log(labelledObj.label);
//   }
//   let myObj = { size: 10, label: "Size 10 Object" };
//   printLabel(myObj);
// interface LabelledValue {
//     label: string;
// }
// function printLabel(labelledObj: LabelledValue) {
//     console.log(labelledObj.label);
// }
// let myObj = { size: 10, label: "Size 10 Object" };
// printLabel(myObj);
// interface SquareConfig {
//     color?: string;
//     width?: number;
//   }
//   function createSquare(config: SquareConfig): {color: string; area: number} {
//     let newSquare = {color: "white", area: 100};
//     if (config.color) {
//       newSquare.color = config.color;
//     }
//     if (config.width) {
//       newSquare.area = config.width * config.width;
//     }
//     return newSquare;
//   }
//   let mySquare = createSquare({color: "black"});
//   console.log(mySquare)
// interface Point {
//     readonly x: number;
//     readonly y: number;
// }
// let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error TS2540: Cannot assign to 'x' because it is a constant or a read-only property.
// let a: number[] = [1, 2, 3, 4];
// let ro: ReadonlyArray<number> = a;
// a[2]=555;
// // ro[2]= 222
// console.log(a)
