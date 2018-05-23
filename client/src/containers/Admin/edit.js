import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, clearBook, deletePost} from '../../actions'

class EditBook extends PureComponent {

    state = {
        formdata:{
            _id:this.props.match.params.id,
            name:'',
            author:'',
            review:'',
            pages:'',
            rating:'',
            price:''
        }
    }

    hendleInput = (event,name) => {
        const newFormData = {
            ...this.state.formdata
        }
        newFormData[name] = event.target.value

        this.setState({
            formdata:newFormData
        })
    }
    submitForm = (e) => {
        e.preventDefault();
        this.props.dispatch(updateBook(this.state.formdata))
    }

    deletePosts =() => {
        this.props.dispatch(deletePost(this.state.formdata._id))
    }

    redirectUserAftDeleting = () => {
        setTimeout(()=>{
            this.props.history.push('/user/user-reviews')

        },2000) 
    }

    componentWillMount(){
        this.props.dispatch(getBook(this.state.formdata._id))
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        let book = nextProps.books.bookdata;

        this.setState({
            formdata:{
                _id:book._id,
                name:book.name,
                author:book.author,
                review:book.review,
                pages:book.pages,
                rating:book.rating,
                price:book.price
            }
        })
    }

    componentWillUnmount(){
        this.props.dispatch(clearBook())
    }

    render() {
        let books = this.props.books;
        return (
            <div className="rl_container article">
                {
                    books.successBook ?
                    <div className="edit_confirm">
                        post updated, <Link to={`/books/${books.bookdata._id}`}>
                        Click here to see your post
                        </Link>
                    </div>
                    :null
                }
                {
                    books.postDeleted ?
                    <div className="red_tag">
                        post deleted
                        {this.redirectUserAftDeleting()}
                    </div>
                    :null
                }
                <form onSubmit={this.submitForm}>
                    <h2>Edit review</h2>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter name"
                            value={this.state.formdata.name}
                            onChange ={(event) => this.hendleInput(event,'name')}
                        />
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            placeholder="Enter author"
                            value={this.state.formdata.author}
                            onChange ={(event) => this.hendleInput(event,'author')}
                        />
                    </div>
                    <textarea
                        value={this.state.formdata.review}
                        onChange ={(event) => this.hendleInput(event,'review')}
                    />
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter pages"
                            value={this.state.formdata.pages}
                            onChange ={(event)=>this.hendleInput(event,'pages')}
                            
                        />
                    </div>
                    <div className="form_element">
                        <select
                            value={this.state.formdata.rating}
                            onChange ={(event)=>this.hendleInput(event,'rating')}
                        >
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option> 
                            <option val="4">4</option>
                            <option val="5">5</option>

                        </select>
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            placeholder="Enter price"
                            value={this.state.formdata.price}
                            onChange ={(event)=>this.hendleInput(event,'price')}
                        />
                    </div>
                    <button type="submit">Edit review</button>
                    <div className="delete_post">
                        <div 
                            className="button"
                            onClick={this.deletePosts}
                        >
                            Delete review
                        </div>

                    </div>
                      
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        books:state.books
    }
}

export default connect(mapStateToProps)(EditBook);