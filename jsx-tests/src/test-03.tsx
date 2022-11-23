/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button.
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book.
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 *
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 *
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
    table: {
        borderCollapse: "collapse"
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px'
        }
    }
} as const;

type Contact = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

function PhoneBookForm({ addEntryToPhoneBook }) {
    const [contact, setContact] = useState({
        firstName: 'Coder',
        lastName: 'Byte',
        phoneNumber: '8885559999'
    })


    const onSubmit = (e:React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        addEntryToPhoneBook(contact)
        setContact({
            firstName: '',
            lastName: '',
            phoneNumber: ''
        })
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setContact({ ...contact, [name]: value })
    }

    return (
        <form onSubmit={e => { e.preventDefault() }} style={style.form.container}>
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userFirstname'
                name='firstName'
                type='text'
                value={contact.firstName}
                onChange={onChange}
            />
            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userLastname'
                name='lastName'
                type='text'
                value={contact.lastName}
                onChange={onChange}
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userPhone'
                name='phoneNumber'
                type='text'
                value={contact.phoneNumber}
                onChange={onChange}
            />
            <br />
            <input
                style={style.form.submitBtn}
                className='submitButton'
                type='submit'
                value='Add User'
                disabled={!contact.firstName || !contact.lastName || !contact.phoneNumber}
                onClick={onSubmit}
            />
        </form>
    )
}

function InformationTable({phoneBook}) {

    return (
        <table style={style.table} className='informationTable'>
            <thead>
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {phoneBook?.map((contact:Contact, index:number) => (
                    <tr key={index}>
                        <td style={style.tableCell}>{contact?.firstName}</td>
                        <td style={style.tableCell}>{contact?.lastName}</td>
                        <td style={style.tableCell}>{contact?.phoneNumber}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function Application() {

    const [phoneBook, setPhoneBook] = useState<Contact[]>([])

    const addEntryToPhoneBook = (contact:Contact) => {
        const unsortedPhoneBook = [...phoneBook, contact]

        const sortedPhoneBook = unsortedPhoneBook.sort((a, b) => {
           return a.lastName.toLowerCase() > b.lastName.toLowerCase() ? 1 : -1
        })

        setPhoneBook(sortedPhoneBook)
    }

    return (
        <section>
            <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
            <InformationTable phoneBook={phoneBook} />
        </section>
    );
}

ReactDOM.render(
    <Application />,
    document.getElementById('test-03')
);