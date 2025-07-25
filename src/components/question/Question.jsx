import { Component } from "inferno";
import { DeleteQuestion, GetQuestions } from "../../services/Api/ApiService"
import '../../assets/css/styles.css';
import AddEditQuestion from "./AddEditQuestion";
import Swal from 'sweetalert2'
import ToastrService from "../../services/Toastr/ToastrService";
import { error, success } from "../../helper/Constants/Constants";
export class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            component: null
        };
    }

    async componentDidMount() {
        const data = await GetQuestions();
        this.setState({ data: data, component: null });
    }

    renderCustomComponent(component) {
        this.setState(prevState => ({ ...prevState, component }))
    }
    async displayDeleteAlert(id) {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this question!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const { data } = await DeleteQuestion(id);
                if (data.isSuccess)
                    ToastrService.setToast(success, data.message)
                else
                    ToastrService.setToast(error, data.message)
                window.location.reload();

            }
        });
    }

    displayQuestions() {
        if (this.state.data) {
            const questions = this.state.data.data.items;
            return questions.map((question, i) => {
                return (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td colSpan={3}>{question.text}</td>
                        {question.options.map((op) => {
                            return (
                                <td key={op.id} className={op.id == question.correctOptionId ? "CorrectOption" : undefined}>{op.text}</td>
                            )
                        })}
                        <td>
                            <div className="d-flex gap-2 align-items-center">
                                <i className="bi bi-pencil-fill Pointer"
                                    onClick={() => {
                                        this.props.history.push(`/admin/question/edit-question/${question.id}`)
                                        this.renderCustomComponent(<AddEditQuestion id={question.id} question={question} />)
                                    }}
                                ></i>
                                <i className="bi bi-trash-fill Pointer"
                                    onClick={() => { this.displayDeleteAlert(question.id) }}
                                ></i>
                            </div>
                        </td>
                    </tr>
                )
            });
        }
    }

    render() {
        const { component } = this.state
        if (component != null) {
            return component
        }
        return (

            <div>
                <div className="header-text">Question</div>
                <div className="d-flex justify-content-end">
                    <button className="purple-button" type="button"
                        onClick={() => {
                            this.props.history.push(`/admin/question/add-question`);
                            this.renderCustomComponent(<AddEditQuestion />)
                        }}
                    >
                        <i className="bi bi-plus-lg me-1"></i>
                        <span >Add Question</span>
                    </button>
                </div>
                <div className="card p-2 shadow mt-2">
                    <div className="table-responsive text-nowrap ">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th colSpan={3}>Text</th>
                                    <th>Option 1</th>
                                    <th>Option 2</th>
                                    <th>Option 3</th>
                                    <th>Option 4</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.displayQuestions()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
