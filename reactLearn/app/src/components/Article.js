import React, {Component} from 'react';

class Article extends Component{
    state = {
        isOpen: false 
    }
    
    
    render(){
        console.log(this.props);
        let {article} = this.props;
        let body = this.state.isOpen 
                    && <section>{article.text}</section>;
        return (
            <div>
                <h2>
                    {article.title}
                    <button onClick={this.handleClick}>
                        {this.state.isOpen ? "close" : "expand"}
                    </button>
                </h2>
                {body}
                <h3>creation date: {new Date(article.date).toDateString()}</h3> 
            </div>        
        )
    }

    handleClick = () => {
        this.setState ({
            isOpen: !this.state.isOpen
        })
    }
}


export default Article