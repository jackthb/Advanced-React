import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { create } from 'react-test-renderer';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from '../components/ErrorMessage';
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # variables being passed in, and types
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'nice shoes',
    price: 3434,
    description: 'so cool',
    image: '',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
    }
  );
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(inputs);
        // submit input fields to backend
        await createProduct();
        clearForm();
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='image'>
          Image
          <input
            required
            type='file'
            id='image'
            name='image'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='Price'>
          Price
          <input
            type='number'
            id='price'
            name='price'
            placeholder='Price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='Description'>
          Description
          <textarea
            id='description'
            name='description'
            placeholder='Description'
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>+ Add Product</button>
      </fieldset>
    </Form>
  );
}
