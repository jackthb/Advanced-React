import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  // create state obj for inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');
  useEffect(() => {
    setInputs(initial);
    // runs when watched items change
  }, [initialValues]);

  // {
  //   name: 'wes',
  //   description: ' nice shoes ',
  //   price: 1000
  // }

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }
  function resetForm() {
    setInputs(initial);
  }
  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }
  // return what we need to surface
  return { inputs, handleChange, resetForm, clearForm };
}
