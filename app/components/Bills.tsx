import React, { useState } from 'react';
import { bills } from '../firebase/controller';

export default function AddBillsForm() {
    const [formDescription, setFormDescription] = useState('');
    const [formDueDate, setformDueDate] = useState('');
    const [formBudget, setformBudget] = useState('');
    const [formActual, setformActual] = useState('');
    const [loading, setLoading] = useState(false)


    function fromSubmit(event: React.MouseEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true)
        if (!formDescription || !formDueDate || !formBudget)
            return console.log('Please fill up all fields.')
        bills({ description: formDescription, dueDate: formDueDate, budget: parseInt(formBudget), actual: parseInt(formActual) }).then((response) => {
            // console.log(response)
            if (response && response.status == 'success') {
                console.log('Bills Added.')
            } else {
                console.log(response)
                console.log('Failed to Add Bills.')
            }
        }).catch((error) => { console.log(error) }).finally(() => {
            clearForm()
            setLoading(false)
        })
    }

    return (
        <main>
            <div>
                <form onSubmit={fromSubmit}>
                    <div>
                        <label htmlFor="descBills">description:</label>
                        <input
                            type="text"
                            id="descBills"
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="dueDateBills">Due Date:</label>
                        <input
                            type='date'
                            id="dueDateBills"
                            value={formDueDate}
                            onChange={(e) => setformDueDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="amountBills">Amount:</label>
                        <input
                            type="text"
                            id="amountBills"
                            value={formBudget}
                            onChange={(e) => /^-?\d*(\.\d*)?$/.test(e.target.value) ? setformBudget(e.target.value) : setformBudget('')}
                        />
                    </div>
                    <div>
                        <label htmlFor="actualBills">Actual:</label>
                        <input
                            type="text"
                            id="actualBills"
                            value={formActual}
                            onChange={(e) => /^-?\d*(\.\d*)?$/.test(e.target.value) ? setformActual(e.target.value) : setformActual('')}
                        />
                    </div>
                    <button disabled={loading}>{loading ? 'Loading' : 'Submit'}</button>
                </form>
            </div>
        </main>
    )

    function clearForm() {
        setFormDescription('')
        setformDueDate('')
        setformActual('')
        setformBudget('')
    }
}