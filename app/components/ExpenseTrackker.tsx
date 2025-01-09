import React, { useState } from 'react';
import { expenseTracker } from '../firebase/controller';

export default function AddExpensesTrackerForm() {
    const [formDate, setformDate] = useState('');
    const [formAmount, setformAmount] = useState('');
    const [formDesc, setformDesc] = useState('');
    const [formCategory, setFormCategory] = useState('');
    const [loading, setLoading] = useState(false)


    function fromSubmit(event: React.MouseEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true)
        if (!formCategory || !formDate || !formAmount || !formDesc)
            return console.log('Please fill up all fields.')
        expenseTracker({ date: formDate, amount: parseInt(formAmount), description: formDesc, category: formCategory }).then((response) => {
            // console.log(response)
            if (response && response.status == 'success') {
                console.log('ExpensesTracker Added.')
            } else {
                console.log(response)
                console.log('Failed to Add ExpensesTracker.')
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
                        <label htmlFor="dateExpensesTracker">Date:</label>
                        <input
                            type="text"
                            id="dateExpensesTracker"
                            value={formDate}
                            onChange={(e) => setformDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="amountExpensesTracker">Amount:</label>
                        <input
                            type="text"
                            id="amountExpensesTracker"
                            value={formAmount}
                            onChange={(e) => setformAmount(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="descExpensesTracker">Description:</label>
                        <input
                            type="text"
                            id="descExpensesTracker"
                            value={formDesc}
                            onChange={(e) => setformDesc(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="categoryExpensesTracker">Category:</label>
                        <input
                            type="text"
                            id="categoryExpensesTracker"
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                        />
                    </div>
                    <button disabled={loading}>{loading ? 'Loading' : 'Submit'}</button>
                </form>
            </div>
        </main>
    )

    function clearForm() {
        setFormCategory('')
        setformDate('')
        setformAmount('')
        setformDesc('')
    }
}