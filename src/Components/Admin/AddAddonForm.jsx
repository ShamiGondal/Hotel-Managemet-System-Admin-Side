import  { useState } from 'react';

const AddAddonForm = () => {
  const apiUri = import.meta.env.VITE_REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    size: '',
    description: '',
    price: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, subtitle, size, description, price, image } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append('title', title);
    formDataToSend.append('subtitle', subtitle);
    formDataToSend.append('size', size);
    formDataToSend.append('description', description);
    formDataToSend.append('price', price);
    formDataToSend.append('image', image);

    try {
        const response = await fetch(`${apiUri}api/addAddon`, {
            method: 'POST',
            body: formDataToSend
        });

        if (!response.ok) {
            throw new Error('Failed to add addon');
        }

        // Since fetch doesn't have a `data` property like Axios, you need to handle the response differently
        console.log('Addon added successfully');
        // Add any additional logic here after successful submission
    } catch (error) {
        console.error('Error adding addon:', error);
        // Handle error
    }
};


  return (
    <div>
      <h2>Add Addon</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Subtitle:
          <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Size:
          <input type="text" name="size" value={formData.size} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Image:
          <input type="file" accept="image/*" onChange={handleFileChange} required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddAddonForm;
