import React, { useState } from 'react';
import { expenses } from '../firebase/controller';

export default function AddExpensesForm() {
    const [formCategory, setFormCategory] = useState('');
    const [formBudget, setformBudget] = useState('');
    const [loading, setLoading] = useState(false)


    function fromSubmit(event: React.MouseEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true)
        if (!formCategory || !formBudget || !formBudget)
            return console.log('Please fill up all fields.')
        expenses({ category: formCategory, budget: parseInt(formBudget) }).then((response) => {
            // console.log(response)
            if (response && response.status == 'success') {
                console.log('Expenses Added.')
            } else {
                console.log(response)
                console.log('Failed to Add Expenses.')
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
                        <label htmlFor="descExpenses">Category:</label>
                        <input
                            type="text"
                            id="descExpenses"
                            value={formCategory}
                            onChange={(e) => setFormCategory(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="dueDateExpenses">Budget:</label>
                        <input
                            type='text'
                            id="dueDateExpenses"
                            value={formBudget}
                            onChange={(e) => setformBudget(e.target.value)}
                        />
                    </div>
                    <button disabled={loading}>{loading ? 'Loading' : 'Submit'}</button>
                </form>
            </div>
        </main>
    )

    function clearForm() {
        setFormCategory('')
        setformBudget('')
    }
}