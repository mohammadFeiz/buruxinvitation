import React,{Component} from 'react';
import Form from 'aio-form-react';
export default class FormInterface extends Component{
    render(){
        return (
            <Form 
                inputStyle={{background:'#f1f2f3',border:'none'}}
                rowStyle={{marginBottom:12}}
                {...this.props}
            />
        )
    }
}