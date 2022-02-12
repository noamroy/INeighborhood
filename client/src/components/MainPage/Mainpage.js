import { Component } from 'react';
// import vacationsData from './../Data/vacations.json';
import './Mainpage.scss'
import VacationsList from '../VacationList';
import Form from '../Form';

class Mainpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formstate: "ADD",
            formvalues: {},
            vacations: [
                { id: 1, img: 'https://i.ibb.co/tpwKw6Y/Greecevillage.png', title: 'Phi Phi Islands', location: 'Thailand', price: '$1,480' },
                { id: 2, img: 'https://i.ibb.co/BzgwpWF/Kudahuvadhoo.png', title: 'Kudahuvadhoo', location: 'Maldives', price: '$1,030' },
                { id: 3, img: 'https://i.ibb.co/XxPmGV3/Phi-Phi-Islands.jpg', title: 'Phi Phi Islands', location: 'Maldives', price: '$1,480' },
                { id: 4, img: 'https://i.ibb.co/2h7rSCk/Kudahuvadhoo2.png', title: 'Kudahuvadhoo', location: 'Maldives', price: '$1,480' }
            ]
        };

        this.handleCallback = this.handleCallback.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.nextId = this.nextId.bind(this);
    }

    update(newVacation, i) {

        this.setState(prevState => ({
            vacations: prevState.vacations.map(
                vacation => vacation.id !== i ? vacation : { ...vacation, vacation: newVacation }
            )
        }));
    }

    delete(id) {
        console.log(`Main delete ${id}`)
        this.setState(prevState => ({
            vacations: prevState.vacations.filter((vacation) => {
                return vacation.id != id
            })
        },() => {
            this.props.updateItem(this.state)
        }))
    }



    add({ id = null, imgurl = 'https://i.ibb.co/tpwKw6Y/Greecevillage.png', title = 'Phi Phi Islands', location = 'Thailand', price = '$1,480' }) {
        const newPrice = `$${price}`
        const newVacation = {
            id: id !== null ? id : this.nextId(this.state.vacations),
            img: imgurl,
            title: title,
            location: location,
            price: newPrice
        }
        console.log(newVacation)
        this.state.vacations.push(newVacation)
    }

    nextId(vacations = []) {
        let max = vacations.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);
        console.log(max)
        return ++max;
    }

    handleCallback = (formData) => {
        console.log(formData)
        this.setState({ formvalues: formData });
        this.add({
            imgurl: formData.imgurl,
            title: formData.name,
            location: formData.location,
            price: formData.price
        })
        console.log(this.state.vacations)
    }


    render() {
        return (

            <div className="main-page">
                <VacationsList vacations={this.state.vacations} deleteFunc={this.delete}/>
                <Form state={this.state.formstate} formCallback={this.handleCallback} />
            </div>
        );
    }
}

export default Mainpage;
