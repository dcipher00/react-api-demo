import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState("");
  const [userid, SetUserid] = useState("");
  const [namedata, SetNamedata] = useState("");
  const [deleteid, setDeleteid] = useState("");
  const [search, setSearch] = useState([]);

  const getAll = () => {
    axios.get("http://localhost:3001/api/comments/").then((res) => {
      const comment = res.data;
      setData(comment);
    });
  };
  const getSingle = () => {
    axios.get(`http://localhost:3001/api/comments/${userid}`).then((res) => {
      const comment = res.data.text;
      setSingleData(comment);
    });
  };
  const handleChange = (e) => {
    SetUserid(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getSingle();
  };

  const addUser = () => {
    axios
      .post(`http://localhost:3001/api/comments/`, {
        text: namedata,
      })
      .then((res) => {
        console.log(res.data);
      });
    SetNamedata("");
    getAll();
  };
  const handleAddChange = (e) => {
    SetNamedata(e.target.value);
  };
  const handleAddSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  const deleteUser = () => {
    axios
      .delete(`http://localhost:3001/api/comments/${deleteid}`)
      .then((res) => {
        console.log(res.data);
      });
    setDeleteid("");
    alert("Comment Deleted");
    getAll();
  };
  const handleDeleteChange = (e) => {
    setDeleteid(e.target.value);
  };
  const handleDelete = (e) => {
    e.preventDefault();
    deleteUser();
  };

  const searchUser = () => {
    axios.get(`http://localhost:3001/api/comments/`).then((res) => {
      const comment = res.data.filter((test) =>
        test.text.toLowerCase().includes(search.toLowerCase())
      );
      console.log(comment);
      setData(comment);
    });
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    searchUser();
  };
  const resetCommentFeed = () => {
    axios.post("http://localhost:3001/api/reset-comments").then((res) => {
      console.log(res);
    });
    alert("Database Reseted");
  };
  return (
    <div>
      <h2 className="center">Get, Post, Delete, Search</h2>

      <div className="box-container" style={{ paddingTop: "10px" }}>
        <ul className="list-group">
          {data.map((person) => (
            <li className="list-group-item" key={person.id}>
              {person.text}
            </li>
          ))}
        </ul>
        <div className="center" style={{ paddingTop: "10px" }}>
          <button onClick={getAll} className="btn btn-primary">
            Get All Comments
          </button>
        </div>
        {singleData ? (
          <ul className="list-group">
            <li className="list-group-item">{singleData}</li>
          </ul>
        ) : (
          ""
        )}
        <div className="row mt-4">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label>Get Single Comment:</label>
              </div>
              <div className="form-group col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Comment id"
                  name="userid"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-md-4">
                <button type="submit" className="btn btn-warning">
                  Get Single Comment
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row mt-4">
          <form onSubmit={handleAddSubmit}>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label>Enter Comments:</label>
              </div>
              <div className="form-group col-md-5">
                <input
                  type="text"
                  value={namedata}
                  className="form-control"
                  name="namedata"
                  onChange={handleAddChange}
                />
              </div>
              <div className="form-group col-md-4">
                <button type="submit" className="btn btn-success">
                  Add Comment
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row mt-4">
          <form onSubmit={handleDelete}>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label>Delete Comments:</label>
              </div>
              <div className="form-group col-md-5">
                <input
                  type="text"
                  placeholder="Enter comment id"
                  value={deleteid}
                  className="form-control"
                  name="deleteid"
                  onChange={handleDeleteChange}
                />
              </div>
              <div className="form-group col-md-4">
                <button type="submit" className="btn btn-danger">
                  Delete Comment
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row mt-4">
          <form onSubmit={handleSearch}>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label>Search Comments:</label>
              </div>
              <div className="form-group col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter comment"
                  value={search}
                  name="deleteid"
                  onChange={handleSearchChange}
                />
              </div>
              <div className="form-group col-md-4">
                <button type="submit" className="btn btn-secondary">
                  Search Comment
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="center" style={{ paddingTop: "10px" }}>
          <button onClick={resetCommentFeed} className="btn btn-danger">
            Reset Comments
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
