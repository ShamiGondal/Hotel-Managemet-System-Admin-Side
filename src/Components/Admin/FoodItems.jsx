import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

function Fooditems() {
  const [foodItems, setFoodItems] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false); // State to control the visibility of the form

  useEffect(() => {
    fetch("http://localhost:4000/api/getFoodItems")
      .then((response) => response.json())
      .then((data) => setFoodItems(data))
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  const handleEdit = (index, item) => {
    setEditIndex(index);
    setFormData(item);
  };

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === "file") {
      // Handle file input separately
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // Only take the first file if multiple files are selected
      }));
    } else {
      // For other fields, handle regular input
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    // If there's a new image selected, upload it first
    if (formData.image) {
      const formDataImage = new FormData();
      formDataImage.append("image", formData.image);

      // Upload the new image
      fetch("http://localhost:4000/api/updateFoodItem/uploadImage", {
        method: "POST",
        body: formDataImage,
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the imageUrl in formData with the newly uploaded image URL
          formData.ImageURL = data.imageUrl;

          // Proceed to update the food item
          updateFoodItem();
        })
        .catch((error) => console.error("Error uploading new image:", error));
    } else {
      // If no new image selected, directly update the food item
      updateFoodItem();
    }
  };

  const updateFoodItem = () => {
    fetch(`http://localhost:4000/api/updateFoodItem/${formData.FoodItemID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the food item in the local state
        const updatedFoodItems = [...foodItems];
        updatedFoodItems[editIndex] = formData;
        setFoodItems(updatedFoodItems);
        // Reset edit index and form data
        setEditIndex(-1);
        setFormData({});
      })
      .catch((error) => console.error("Error updating food item:", error));
  };

  const handleAddFoodItem = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleaddFoodItemSubmit = () => {
    const formData = new FormData(document.getElementById("foodItemForm"));

    formData.set(
      "specialSelection",
      JSON.stringify(
        formData
          .get("specialSelection")
          .split(",")
          .map((item) => item.trim())
      )
    );
    formData.set(
      "sizes",
      JSON.stringify(
        formData
          .get("sizes")
          .split(",")
          .map((item) => item.trim())
      )
    );

    // Make POST request to API
    fetch("http://localhost:4000/api/addFoodItems", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add food item");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Food item added successfully:", data);
        toast("item added");
        // Refresh the list of food items
        fetch("http://localhost:4000/api/getFoodItems")
          .then((response) => response.json())
          .then((data) => setFoodItems(data))
          .catch((error) => console.error("Error fetching food items:", error));
        // Close the form
        setShowForm(false);
      })
      .catch((error) => {
        console.error("Error adding food item:", error);
        // Handle error
      });

    // Reset form data
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      price: "",
      sizes: "",
      specialSelection: "",
      isAvailable: false,
      foodItemDiscount: "",
      category: "",
      image: null,
    });
  };

  return (
    <Container>
      <Row xs={1} md={2} lg={3} className="g-4">
        {foodItems.length > 0 &&
          foodItems.map((foodItem, index) => (
            <Col key={foodItem.FoodItemID}>
              <Card style={{ width: "100%", height: "100%" }}>
                <Card.Img
                  variant="top"
                  src={foodItem.ImageURL}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  {editIndex === index ? (
                    <Form>
                      {Object.entries(foodItem).map(([key, value]) => (
                        <Form.Group controlId={key} key={key}>
                          {key === "ImageURL" ? (
                            <Form.Group controlId="image" key="image">
                              <Form.Label>Change Image</Form.Label>
                              <Form.Control
                                type="file"
                                name="image"
                                onChange={handleChange}
                              />
                            </Form.Group>
                          ) : (
                            <Form.Control
                              type="text"
                              name={key}
                              value={formData[key] || ""}
                              onChange={handleChange}
                            />
                          )}
                        </Form.Group>
                      ))}
                      <Button variant="primary" onClick={handleSubmit}>
                        Save
                      </Button>
                    </Form>
                  ) : (
                    <>
                      {Object.entries(foodItem).map(
                        ([key, value]) =>
                          key !== "FoodItemID" && (
                            <p key={key}>
                              <strong>{key}:</strong> {value}
                            </p>
                          )
                      )}
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(index, foodItem)}
                      >
                        Edit
                      </Button>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <Button
        variant="success"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "24px",
        }}
        onClick={handleAddFoodItem}
      >
        +
      </Button>
      <Modal show={showForm} onHide={handleFormClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Food Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="foodItemForm">
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="subtitle">
              <Form.Label>Subtitle</Form.Label>
              <Form.Control
                type="text"
                name="subtitle"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="sizes">
              <Form.Label>Sizes</Form.Label>
              <Form.Control type="text" name="sizes" onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="specialSelection">
              <Form.Label>Special Selection</Form.Label>
              <Form.Control
                type="text"
                name="specialSelection"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="isAvailable">
              <Form.Check
                type="checkbox"
                label="Available"
                name="isAvailable"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="foodItemDiscount">
              <Form.Label>Food Item Discount</Form.Label>
              <Form.Control
                type="number"
                name="foodItemDiscount"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleaddFoodItemSubmit}>
            Add Food Item
          </Button>
          <Button variant="secondary" onClick={handleFormClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Fooditems;
