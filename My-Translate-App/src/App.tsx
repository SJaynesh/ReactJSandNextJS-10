import axios from 'axios';
import { useState } from 'react'

export default function App() {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");


  const translate = async () => {

    const res = await axios.post("https://deep-translate1.p.rapidapi.com/language/translate/v2",
      {
        "q": input,
        "source": "en",
        "target": "gu"
      },
      {
        headers: {
          'x-rapidapi-key': 'd8f7cda0bamshbc4d982d36cb16dp1e6fe5jsn32111f51b5bd',
          'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
          'Content-Type': 'application/json'
        },

      }
    );

    console.log("Translate Response", res.data.data.translations.translatedText[0]);
    setOutput(res.data.data.translations.translatedText[0]);

  }

  return (
    <>
      <label htmlFor="">Input</label> <br />
      <textarea name="input" onChange={(e) => setInput(e.target.value)} ></textarea>
      <br />
      <br />
      <button onClick={translate}>Translate</button>
      <br /><br />
      <label htmlFor="">Output</label> <br />
      <textarea name="input" value={output}></textarea>
      <br />
    </>
  )
}
