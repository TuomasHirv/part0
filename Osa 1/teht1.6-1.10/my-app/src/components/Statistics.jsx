const Statistics = (props) => {
    const all = (props.good + props.neutral + props.bad)
    const average = (props.good-props.bad)/(all)
    const positive = (props.props/all)
    return (
        <ul>
            <h1>ratings</h1>
            <p><b>good:</b> {props.good}</p>
            <p><b>neutral:</b> {props.neutral}</p>
            <p><b>bad:</b> {props.bad}</p>
            <p><b>all:</b> {all} </p>
            <p><b>average:</b> {average} </p>
            <p><b>positive:</b> {positive*100}% </p>
        </ul>
    )
}
export default Statistics