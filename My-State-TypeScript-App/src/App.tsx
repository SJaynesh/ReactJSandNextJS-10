import { useState } from "react";

function App() {

  let name: string = "Jaynesh";
  let age: number = 21;
  let isTheme: Boolean = false;
  let phone: Number | String = 0;

  let array: number[] | string[] = [10, 20, 30, 40, 50, "Hello"];

  const [counter, setCounter] = useState<number>(0);

  name += " Sarkar";
  phone = 7845256985;

  return <>
    <h1>Hello</h1>

    <h1>Counter: {counter}</h1>

    <button onClick={() => { setCounter(counter + 1) }}>+</button>

    <p>Name : {name}</p>
    <p>Age : {age.toString()}</p>
    <p>Phone : {phone.toString()}</p>
    <p>Theme : {isTheme ? "Light" : "Dark"}</p>

    <p>Array : {array}</p>
  </>
}

export default App;