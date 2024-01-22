//import {useState} from 'react'
import { FormEvent, useState } from 'react'
import './App.css'

import logoImg from './assets/logo.png'

/*
Calculo: alcool / gasolina
Ese o resultado for menor que 0.7 compensa usar alcool
 */

interface InfoProps{
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

export default function App(){
  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcooInput, setAlcooInput] = useState(0)
  const [info, setInfo] = useState<InfoProps>()

  function calcular(event: FormEvent) {
    event.preventDefault();

    const calculo = (alcooInput / gasolinaInput)
    console.log(calculo)

    if(calculo <= 0.7){
      setInfo({
        title: "Compensa usar ácool!",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcooInput)
      })
    }else{
      setInfo({
        title: "Compensa usar gasolina!",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcooInput)
      })
    }

  }

  function formatarMoeda(valor: number){
    const valorFormatado = valor.toLocaleString("pt-br",
    { 
      style: "currency", 
      currency: "BRL"
    });

    return valorFormatado;
  }

  return(
    <div>
      <main className="container">
        <img 
          className="logo"
          src={logoImg}
          alt="Logo do posto de gasolina"/>
        <h1 className="title">Qual melhor opção?</h1>

        <form className="form" onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>
            <input 
              className="input"
              type="number"
              placeholder="4,90"
              min="1"
              step="0.01"
              required
              value={alcooInput}
              onChange={ (e) => setAlcooInput(Number(e.target.value))}
            /> 

          <label>Gasolina (preço por litro):</label>
            <input 
              className="input"
              type="number"
              placeholder="4,90"
              min="1"
              step="0.01"
              required
              value={gasolinaInput}
              onChange={ (e) => setGasolinaInput(Number(e.target.value))}
            /> 

          <input className="button" type="submit" value="Calcular" />
        </form>
        
       {info && Object.keys(info).length > 0 && (
        <section className="result">
         <h2 className="result-title">
          {info.title}
        </h2>

         <span>Álcool {info.alcool}</span>
         <span>Gasolina {info.gasolina}</span>
        </section>
       )}

      </main>
    </div>
  )
}
