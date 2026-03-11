import { useEffect, useState } from "react";
import TableView from "./TableView";

function App() {

  let name: string = "Jaynesh";
  let age: number = 21;
  let isTheme: Boolean = false;
  let phone: Number | String = 0;

  let array: number[] | string[] = [10, 20, 30, 40, 50, "Hello"];

  const [counter, setCounter] = useState<number>(0);

  /*
    useEffect() Hook :

    syntax :
      useEffect(function, []);
  */

  // function callBack() {
  //   console.log("Use Effect is running...");
  // }

  // const callBack = () => {
  //   console.log("Use Effect is running...");
  // }

  // useEffect(callBack, []);

  useEffect(() => {
    // 5 API  
    console.log("Call 5 API");
  }, []);

  useEffect(() => {
    // 2 API
    console.log("Use Effect is running...", counter);
  }, [counter]);

  name += " Sarkar";
  phone = 7845256985;

  return <>
    <div className="container">
      <div>
        <h1>Hello</h1>

        <h1>Counter: {counter}</h1>

        <button className="btn btn-success" onClick={() => { setCounter(counter + 1) }}>+</button>

        <div className="m-5">
          <p>Name : {name}</p>
          <p>Age : {age.toString()}</p>
          <p>Phone : {phone.toString()}</p>
          <p>Theme : {isTheme ? "Light" : "Dark"}</p>

          <p>Array : {array}</p>
        </div>
      </div>

      <TableView />
    </div>
  </>


}

export default App;