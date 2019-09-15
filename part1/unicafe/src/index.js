import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => (
    <button onClick = {props.handleClick}>
        {props.text}
    </button>
)
const Statistics = ({good, neutral, bad}) => {
    if (good + neutral + bad === 0) {
        return (
            <div>
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
                <p>all {good + neutral + bad}</p>
                <p>average 0</p>
                <p>positive 0%</p>
            </div>
        )
    }

    return (
        <div>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {good + neutral + bad}</p>
            <p>average {(good - bad)/(good + neutral + bad)}</p>
            <p>positive {((good)/(good + neutral + bad)) * 100} %</p>
        </div>
    )

}

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick = {() => setGood(good + 1)} text="good" />
            <Button handleClick = {() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick = {() => setBad(bad + 1)} text="bad" />
            <h1>statistics</h1>
            <Statistics good = {good} neutral = {neutral} bad = {bad} />

        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'))