import React, { useState } from 'react';
import { income } from '../firebase/controller';

export default function AddIncomeForm() {
    const [formDescription, setFormDescription] = useState('');
    const [formExpected, setFormExpected] = useState('');
    const [formAmount, setFormAmount] = useState('');
    const [loading, setLoading] = useState(false)


    function fromSubmit(event: React.MouseEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true)
        if (!formDescription || !formExpected || !formAmount)
            return console.log('Please fill up all fields.')
        income({ description: formDescription, expected: parseInt(formExpected), amount: parseInt(formAmount) }).then((response) => {
            // console.log(response)
            if (response && response.status == 'success') {
                console.log('Income Added.')
            } else {
                console.log('Failed to Add Income.')
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
                        <label htmlFor="descIncome">description:</label>
                        <input
                            type="text"
                            id="descIncome"
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="expectedIncome">Expected:</label>
                        <input
                            type='text'
                            id="expectedIncome"
                            value={formExpected}
                            onChange={(e) => setFormExpected(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="amountIncome">Amount:</label>
                        <input
                            type="text"
                            id="amountIncome"
                            value={formAmount}
                            onChange={(e) => setFormAmount(e.target.value)}
                        />
                    </div>
                    <button disabled={loading}>{loading ? 'Loading' : 'Submit'}</button>
                </form>
            </div>
        </main>
    )

    function clearForm() {
        setFormDescription('')
        setFormExpected('')
        setFormAmount('')
    }
}