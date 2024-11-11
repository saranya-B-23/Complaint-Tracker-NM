import axios from 'axios'
import React, { useState } from 'react'

const Complaint = () => {
   const user = JSON.parse(localStorage.getItem('user'))
   const [userComplaint, setUserComplaint] = useState({
      userId: user._id,
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: '',
      comment: ''
   })

   const handleChange = (e) => {
      const { name, value } = e.target
      setUserComplaint({ ...userComplaint, [name]: value })
   }

   const handleClear = () => {
      setUserComplaint({
         userId: '',
         name: '',
         address: '',
         city: '',
         state: '',
         pincode: '',
         status: '',
         comment: ''
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const user = JSON.parse(localStorage.getItem('user'))
      const { _id } = user
      axios.post(`http://localhost:8000/Complaint/${_id}`, userComplaint)
         .then(res => {
            JSON.stringify(res.data.userComplaint)
            alert("Your Complaint has been sent!!")
            handleClear()
         })
         .catch(err => {
            console.log(err)
            alert("Something went wrong!!")
         })
   }

   return (
      <>
         <div className="complaint-box" style={{ backgroundColor: '#343a40', padding: '20px', borderRadius: '5px' }}>
            <form onSubmit={handleSubmit} className="compliant-form row bg-dark">

               <div className="col-md-6 p-3">
                  <label htmlFor="name" className="form-label" style={{ fontSize: '18px', color: '#f1f1f1' }}>Name</label>
                  <input name="name" onChange={handleChange} value={userComplaint.name} type="text" className="form-control" id="name" required style={{ fontSize: '16px', color: '#333' }} />
               </div>

               <div className="col-md-6 p-3">
                  <label htmlFor="address" className="form-label" style={{ fontSize: '18px', color: '#f1f1f1' }}>Address</label>
                  <input name="address" onChange={handleChange} value={userComplaint.address} type="text" className="form-control" id="address" required style={{ fontSize: '16px', color: '#333' }} />
               </div>

               <div className="col-md-6 p-3">
                  <label htmlFor="city" className="form-label" style={{ fontSize: '18px', color: '#f1f1f1' }}>City</label>
                  <input name="city" onChange={handleChange} value={userComplaint.city} type="text" className="form-control" id="city" required style={{ fontSize: '16px', color: '#333' }} />
               </div>

               <div className="col-md-6 p-3">
                  <label htmlFor="state" className="form-label" style={{ fontSize: '18px', color: '#f1f1f1' }}>State</label>
                  <input name="state" onChange={handleChange} value={userComplaint.state} type="text" className="form-control" id="state" required style={{ fontSize: '16px', color: '#333' }} />
               </div>

               <div className="col-md-6 p-3">
                  <label htmlFor="pincode" className="form-label" style={{ fontSize: '18px', color: '#f1f1f1' }}>Pincode</label>
                  <input name="pincode" onChange={handleChange} value={userComplaint.pincode} type="text" className="form-control" id="pincode" required style={{ fontSize: '16px', color: '#333' }} />
               </div>

               <div className="col-md-6 p-3">
                  <label htmlFor="status" className="form-label" style={{ fontSize: '18px', color: '#f1f1f1' }}>Status</label>
                  <input placeholder='type pending' name="status" onChange={handleChange} value={userComplaint.status} type="text" className="form-control" id="status" required style={{ fontSize: '16px', color: '#333' }} />
               </div>

               <label className="form-label text-light" htmlFor="comment" style={{ fontSize: '18px', color: '#f1f1f1' }}>Description</label>
               <div className="form-floating">
                  <textarea name="comment" onChange={handleChange} value={userComplaint.comment} className="form-control" required style={{ fontSize: '16px', color: '#333' }}></textarea>
               </div>

               <div className="text-center p-1 col-12">
                  <button type="submit" onClick={handleSubmit} className="mt-2 btn btn-success" style={{ fontSize: '18px' }}>Register</button>
               </div>
            </form>
         </div>
      </>
   )
}

export default Complaint
