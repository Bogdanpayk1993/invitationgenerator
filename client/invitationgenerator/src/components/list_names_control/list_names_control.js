import { useEffect, useState } from 'react';
import './list_names_control.css';

function List_names_control(props) {

    const list_names = props.list_names
    const set_list_names = props.set_list_names
    const [new_names, set_new_names] = useState("")
    const [index_name, set_index_name] = useState(-1)

    function Add() {
        let new_list_names = list_names.slice()

        if (new_names != "") {
            new_list_names.push(new_names)
        }

        set_list_names(new_list_names)
        set_new_names("")
    }

    function Change() {
        let new_list_names = list_names.slice()

        new_list_names[index_name] = new_names

        set_list_names(new_list_names)
        set_new_names("")
        set_index_name(-1)
    }

    function Delete() {
        let new_list_names = list_names.slice()

        new_list_names.splice(index_name, 1)

        set_list_names(new_list_names)
        set_new_names("")
        set_index_name(-1)
    }

    useEffect(() => {
        set_new_names(list_names[index_name])
    }, [index_name])

    return (
        <div className='List_names_control'>
            <h4> Список запрошених </h4>
            <div className='Menu'>
                <input onChange={(event) => set_new_names(event.target.value)} placeholder='Імена запрошених' value={new_names} />
                {
                    index_name == -1 ?
                        <button onClick={() => Add()}> Додати </button>
                        :
                        <>
                            <button onClick={() => Change()}> Змінити </button>
                            <button onClick={() => Delete()}> Видалити </button>
                        </>
                }
            </div>
            <div className='List_names'>
                <ol>
                    {
                        list_names.map((el, i) => (
                            <li onClick={() => set_index_name(i)}> {el} </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )

}

export default List_names_control;