import './JokeADay.css';
import React from 'react'

const JOKE_TIMER = 5000
const LETTER_TIMER = 100

class JokeADay extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            joke: '',
            jokeString: '',
            error: ''
        }
    }

    componentDidMount() {
        this.startTimer()
    }

    startTimer = () => {
        const getJoke = new Promise((resolve, reject) => {
            fetch("http://api.icndb.com/jokes/random")
                .then(res => res.json())
                .then(
                    (result) => {
                        resolve(result.value.joke)
                    },
                    (error) => {
                        reject(error)
                    }
                )
        })
        let timer, index = -1
        getJoke.then((joke) => {
            this.setState({ joke: joke.replaceAll('&quot;', '"'), jokeString: '' }, () => {
                timer = setInterval(() => {
                    if (index < this.state.joke.length) {
                        let jokeString = this.state.jokeString
                        index++
                        if (this.state.joke[index] == ' ') {
                            jokeString += ' '
                            index++
                        }
                        jokeString += this.state.joke[index] ? this.state.joke[index] : ''
                        this.setState({ jokeString })
                    }
                    else {
                        clearInterval(timer)
                        setTimeout(() => {
                            this.startTimer()
                        }, JOKE_TIMER);
                    }
                }, LETTER_TIMER);
            })
        })

    }



    render() {
        return (
            <div className='page'>
                <a href='https://en.wikipedia.org/wiki/Chuck_Norris' target="_blank">Who is Chuck Norris?</a>
                <a href='http://www.icndb.com/api/' target="_blank">Jokes API</a>
                <a id='site'>About this site
                    <span class="tooltiptext">This site created by <a href='https://github.com/codebloodedape' target="_blank">Vishal</a></span></a>
                <div className='jokeContainer'>
                    {(this.state.jokeString !== '') && (<div>{this.state.jokeString}</div>)}
                </div>
                {<img className='img' src='chucknorris.jpg' />}
            </div>
        )
    }
}

export default JokeADay;
