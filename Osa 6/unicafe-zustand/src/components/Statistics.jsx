import useFeedbackStore from './store'

const Statistics = () => {
  const good = useFeedbackStore(state => state.good)
  const neutral = useFeedbackStore(state => state.neutral)
  const bad = useFeedbackStore(state => state.bad)
  const all = good + neutral + bad
  const average = all ? parseFloat(((good - bad) / all).toFixed(1)) : 0
  const positive = all ? parseFloat(((good / all)*100).toFixed(1)) : 0
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{all}</td></tr>
          <tr><td>average</td><td>{average}</td></tr>
          <tr><td>positive</td><td>{positive}</td><td> %</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
