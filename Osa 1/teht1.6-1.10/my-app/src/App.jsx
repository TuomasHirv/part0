import { useState } from 'react'

const StatisticsLine =(props) =>{
  const {text, value} = props
  return(
    <p><b>{text}</b> {value}</p>
  )
}
const Statistics = ({ props }) => {
  const good_ = props.good
  const neutral_ = props.neutral
  const bad_ = props.bad
  const all = (props.good + props.neutral + props.bad)
  const average = (props.good-props.bad)/(all)
  const positive = (props.good/all)
  if (props.good != 0 || props.neutral != 0 || props.bad != 0) {
  return (
    <table>
      <StatisticsLine text = 'good' value = {good_}/>
      <StatisticsLine text = 'neutral_' value = {neutral_}/>
      <StatisticsLine text = 'bad' value = {bad_}/>
      <StatisticsLine text = 'all' value = {all}/>
      <StatisticsLine text = 'average' value = {average}/>
      <StatisticsLine text = 'positive' value = {positive}/>
    </table>
  )
  } else {
    return(
      <b>no feedback given</b>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [ratings, setRatings] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })
  
  
  const handleGoodClick = () =>
  {
    setRatings({...ratings, good: ratings.good+1})
  }
  const handleNeutralClick = () =>
  {
    setRatings({...ratings, neutral: ratings.neutral+1})
  }
  const handleBadClick = () =>
  {
    setRatings({...ratings, bad: ratings.bad+1})
  }

  return (
    <div>
      <h1>Give feedback </h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <div>
        <Statistics props = {ratings}/>
      </div>
    </div>
  )
}

export default App