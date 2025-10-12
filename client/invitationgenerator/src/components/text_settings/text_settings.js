import Select from "react-select";
import Greetings_list_control from "../greetings_list_control";
import './text_settings.css'

function Text_Settings(props) {

    const invitation_texts = props.invitation_texts
    const template_type = props.template_type
    const set_template_type = props.set_template_type
    const greetings_list = props.greetings_list
    const set_greetings_list = props.set_greetings_list
    const generating_invitation_text = props.generating_invitation_text

    return (
        <div className="Text_settings">
            <div className="Input_container">
                <Select options={invitation_texts} onChange={(event) => set_template_type(event["label"])} placeholder="Оберіть тип" value={invitation_texts[invitation_texts.findIndex(el => el["label"] === template_type)]} />
            </div>
            {
                template_type != "" ?
                    <>
                        <div className="Button_container">
                            <button onClick={() => generating_invitation_text(null)}> Відмінити зміни шаблону </button>
                        </div>
                        <div className="Name_container">
                            <Greetings_list_control greetings_list={greetings_list} set_greetings_list={set_greetings_list} />
                        </div>
                    </> : null
            }
        </div>
    )
}

export default Text_Settings;