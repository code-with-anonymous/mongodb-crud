import React, { useState } from 'react';

export default function EditTodoModal({ onClose }) {
  const [state, setState] = useState({
    title: '',
    location: '',
    status: '',
    dateCreated: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <div className="modal fade show" id="exampleModal" tabIndex="-1" role="dialog" style={{ display: 'block' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="box container border border-black d-flex align-items-center justify-content-center">
              <div className="row">
                <div className="col-12">
                  <h2 className="text-center mb-3">Edit your task</h2>
                </div>
                <div className="col-6 mb-3">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    placeholder="Title"
                    value={state.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="form-control"
                    placeholder="Location"
                    value={state.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 mb-3">
                  <select
                    name="status"
                    id="status"
                    className="form-control"
                    value={state.status}
                    onChange={handleChange}
                  >
                    <option value="">Select status</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                  </select>
                </div>
                <div className="col-6">
                  <input
                    type="date"
                    name="dateCreated"
                    id="dateCreated"
                    className="form-control"
                    placeholder="Date Created"
                    value={state.dateCreated}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 mb-3">
                  <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    placeholder="Enter your description"
                    value={state.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-success">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
