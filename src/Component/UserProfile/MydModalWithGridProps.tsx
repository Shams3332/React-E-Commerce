import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

interface MydModalWithGridProps {
  show: boolean;
  onHide: () => void;
}

const MydModalWithGrid: React.FC<MydModalWithGridProps> = (props) => {



 
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
      Update Your Data
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    
      <div className="row">

            <div className="form-group col-md-6 mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control mt-1" id="name"
              name="name" placeholder="Name"
          
              />

            </div>

            <div className="form-group col-md-6 mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control mt-1" id="email" name="email" placeholder="Email" />
            </div>

            <div className="form-group col-md-6 mb-3">
              <label htmlFor="name">Age</label>
              <input type="text" className="form-control mt-1" id="name" name="name" placeholder="Name" />
            </div>

            <div className="form-group col-md-6 mb-3">
              <label htmlFor="name">Address</label>
              <input type="text" className="form-control mt-1" id="name" name="name" placeholder="Name" />
            </div>

            <div className="form-group col-md-6 mb-3">
              <label htmlFor="name">Phone</label>
              <input type="text" className="form-control mt-1" id="name" name="name" placeholder="Name" />
            </div>

            <div className="form-group col-md-6 mb-3">
      <FloatingLabel controlId="floatingSelect" label="Active Email">
      <Form.Select aria-label="Floating label select example">
        <option></option>
        <option value="1">True</option>
        <option value="2">False</option>
      </Form.Select>
    </FloatingLabel>
            </div>
          </div>
        
    
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide} className='btn-success'>Close</Button>
    </Modal.Footer>
  </Modal>
  );
}

export default MydModalWithGrid;
