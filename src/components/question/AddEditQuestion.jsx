import { Component } from "inferno";
import { AddQuestion, EditQuestion } from "../../services/Api/ApiService";
import ToastrService from "../../services/Toastr/ToastrService";
import { error, success } from "../../helper/Constants/Constants";

export default class AddEditQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            addmode: (props.id || null) == null,
            question: props.question?.text || '',
            options: props.question?.options || [
                { id: 0, text: '' },
                { id: 1, text: '' },
                { id: 2, text: '' },
                { id: 3, text: '' }
            ],
            correctOptionId: props.question?.correctOptionId || 0
        }
    }

    handleOptionText = (event, index) => {
        const newOptions = this.state.options.map((option, i) => {
            if (i == index) return { ...option, text: event.target.value }
            return option;
        })
        this.setState({ options: newOptions })
    }

    handleQuestionText = (event) => {
        this.setState({ question: event.target.value })
    }

    handleSubmission = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)
        const questionText = formData.get('question')
        const correctOption = formData.get('option-radio')


        let data;

        if (this.state.addmode) ({ data } = await AddQuestion(questionText, this.state.options, correctOption));
        else ({ data } = await EditQuestion(this.state.id, questionText, this.state.options, correctOption));

        if (data.isSuccess)
            ToastrService.setToast(success, data.message)
        else
            ToastrService.setToast(error, data.message)
        window.location.replace("/admin/question")
    }

    render() {
        const { question, options, addmode, correctOptionId } = this.state;
        return (
            <div className="container ">
                <div className="card mt-5 p-3 shadow">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-sm-between  align-items-center flex-sm-row flex-column justify-content-center">
                                <div className="header-text">{addmode ? "Add Question" : "Edit Question"}</div>
                                <button className="purple-button" onClick={() => { window.location.replace("/admin/question") }}>Back</button>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmission}>

                        <div className="row">
                            <div className="col p-2">
                                <label htmlFor="question-text" className="form-label fs-5">Question Text</label>
                                <input type="text" className="form-control" id="question-text" name="question" aria-describedby="Question Text" placeholder="Question Text" value={question} onInput={this.handleQuestionText} required />
                            </div>
                        </div>
                        <div className="row row-cols-sm-2 row-cols-1">
                            {options.map((option, index) => {
                                const name = `Option ${index + 1}`
                                return (
                                    <div className="col p-2" key={index}>
                                        <div className="input-group">
                                            <span className="input-group-text" >
                                                <input className="form-check-input" type="radio" name="option-radio" id={option.id} checked={addmode ? undefined : (option.id === correctOptionId) ? true : undefined} required value={option.id} />
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder={name}
                                                aria-label={name}
                                                aria-describedby={name}
                                                name={name}
                                                id={option.id}
                                                onInput={(event) => { this.handleOptionText(event, index) }}
                                                value={option.text}
                                                required />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row">
                            <div className="col text-center ">
                                <button className="purple-button me-2 px-3" type="submit">{addmode ? "Add" : "Edit"}</button>
                                <button className="purple-hover-button" type="reset">Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

