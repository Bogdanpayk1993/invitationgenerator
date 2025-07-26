import { useEffect, useState } from 'react';
import './greetings_list_control.css';

function Greetings_list_control(props) {

    const greetings_list = props.greetings_list
    const set_greetings_list = props.set_greetings_list
    const [new_greeting, set_new_greeting] = useState("")
    const [index_new_greeting, set_index_new_greeting] = useState(-1)

    function Add() {
        let new_greetings_list = greetings_list.slice()

        if (new_greeting != "") {
            new_greetings_list.push(new_greeting)
        }

        set_greetings_list(new_greetings_list)
        set_new_greeting("")
    }

    function Change() {
        let new_greetings_list = greetings_list.slice()

        new_greetings_list[index_new_greeting] = new_greeting

        set_greetings_list(new_greetings_list)
        set_new_greeting("")
        set_index_new_greeting(-1)
    }

    function Delete() {
        let new_greetings_list = greetings_list.slice()

        new_greetings_list.splice(index_new_greeting, 1)

        set_greetings_list(new_greetings_list)
        set_new_greeting("")
        set_index_new_greeting(-1)
    }

    useEffect(() => {
        if (index_new_greeting > -1) {
            set_new_greeting(greetings_list[index_new_greeting])
        } else {
            set_new_greeting("")
        }
    }, [index_new_greeting])

    return (
        <div className='Greetings_list_control'>
            <h4> Список груп запрошених </h4>
            <div className='Menu'>
                <input onChange={(event) => set_new_greeting(event.target.value)} placeholder='Звернення до групи запрошених' value={new_greeting} />
                {
                    index_new_greeting == -1 ?
                        <button onClick={() => Add()}> Додати </button>
                        :
                        <>
                            <button onClick={() => Change()}> Змінити </button>
                            <button onClick={() => Delete()}> Видалити </button>
                            <button onClick={() => set_index_new_greeting(-1)}> Скасувати </button>
                        </>
                }
            </div>
            <div className='Greetings_list'>
                <ol>
                    {
                        greetings_list.map((el, i) => (
                            <li onClick={() => set_index_new_greeting(i)}> {el} </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )

}

export default Greetings_list_control;