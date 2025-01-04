import React, { useEffect, useState } from 'react';
import { income } from '../firebase/controller';

export default function AddPostForm() {
    const [formDescription, setFormDescription] = useState('');
    const [formExpected, setFormExpected] = useState('');
    const [formAmount, setFormAmount] = useState('');


    const clearForm = () => {
        setFormDescription('')
        setFormExpected('')
        setFormAmount('')
    }
    function fromSubmit(event: React.MouseEvent<HTMLFormElement>) {
        console.log('submit')
        event.preventDefault();
        if (!formDescription || !formExpected || !formAmount)
            return console.log('Please fill up all fields.')
        const aaa = income({ description: formDescription, expected: formExpected, amount: formAmount });
        // console.log(aaa)
        // aaa.then((response) => console.log(response))
    }

    return (
        <main>
            <div>
                <form onSubmit={fromSubmit}>
                    <div>
                        <label htmlFor="desc">description:</label>
                        <input
                            type="text"
                            id="desc"
                            // value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="expected">Expected:</label>
                        <input
                            type='text'
                            id="expected"
                            value={formExpected}
                            onChange={(e) => setFormExpected(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="text"
                            id="amount"
                            value={formAmount}
                            onChange={(e) => setFormAmount(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </main>
    )
}