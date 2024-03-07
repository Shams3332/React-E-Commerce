import React from 'react'
import { Helmet } from 'react-helmet'

export default function Contact() {
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Contact</title>
            </Helmet>
      {/* start Contact page */}
      <div className="container-fluid bg-light py-5">
      <div className="col-md-6 m-auto text-center">
        <h1 className="text-success fw-light ">Contact Us</h1>
        <p>
          Proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          Lorem ipsum dolor sit amet.
        </p>
      </div>
    </div>

{/* start form */}
<div className="container py-5">
      <div className="row py-5">
        <form className="col-md-9 m-auto" method="post" role="form">
          <div className="row">
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control mt-1" id="name" name="name" placeholder="Name" />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control mt-1" id="email" name="email" placeholder="Email" />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="subject">Subject</label>
            <input type="text" className="form-control mt-1" id="subject" name="subject" placeholder="Subject" />
          </div>
          <div className="mb-3">
            <label htmlFor="message">Message</label>
            <textarea className="form-control mt-1" id="message" name="message" placeholder="Message"></textarea>
          </div>
          <div className="row">
            <div className="col text-end mt-2">
              <button type="submit" className="btn btn-success btn-lg px-3">Let’s Talk</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
