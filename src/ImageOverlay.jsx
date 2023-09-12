import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ImageOverlay = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setImage(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (image) {
      const img = new Image();
  
      img.src = image;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
  
        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
  
        // Draw the image on the canvas
        context.drawImage(img, 0, 0);
  
        // Add text overlay
        context.font = '30px Arial';
        context.fillStyle = 'white';
        context.fillText(text, 20, 40); // Adjust text position as needed
  
        // Convert canvas to data URL and create a download link
        const downloadUrl = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'image_with_text.jpg';
        link.click();
    };
  }
};

  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="text">
              <Form.Label>Text Overlay:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
            <Form.Group controlId="image">
  <Form.Label>Upload Image</Form.Label>
  <Form.Control type="file" onChange={handleImageUpload} accept="image/*" />
</Form.Group>
            </Form.Group>
            <Button onClick={handleDownload}>Download</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {image && (
            <div>
              <h2>Preview:</h2>
              <img src={image} alt="Preview" />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ImageOverlay;
