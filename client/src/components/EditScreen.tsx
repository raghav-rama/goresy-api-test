import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./EditScreen.css";

interface IUser {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
  created_at?: string | undefined;
  updated_at?: string | undefined;
}

const EditScreen = () => {
  const location = useLocation();
  const id = location.state.id;
  const navigate = useNavigate();
  const [editedData, setEditedData] = React.useState<IUser>();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    console.log(e.target.value);
  };
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Selected ID: ", id);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
    await axios
      .patch(`http://localhost:5000/api/users/${id}`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // setEditedData(Object.fromEntries(formData));
    console.log("Saved");
  };
  const onCancel = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate(-1);
    // console.log("Cancelled");
  };
  return (
    <div className="container">
      <div className="text">Edit User {id}</div>
      <form action="#" onSubmit={handleSave}>
        <div className="form-row">
          <div className="input-data">
            <input
              name="name"
              onChange={handleInputChange}
              type="text"
              required
            />
            <div className="underline"></div>
            <label htmlFor="">Name</label>
          </div>
          <div className="input-data">
            <input
              name="email"
              onChange={handleInputChange}
              type="text"
              required
            />
            <div className="underline"></div>
            <label htmlFor="">Email</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input
              name="gender"
              onChange={handleInputChange}
              type="text"
              required
            />
            <div className="underline"></div>
            <label htmlFor="">Gender</label>
          </div>
          <div className="input-data">
            <input
              name="status"
              onChange={handleInputChange}
              type="text"
              required
            />
            <div className="underline"></div>
            <label htmlFor="">Status</label>
          </div>
        </div>
        <div className="form-row">
          <div className="form-row submit-btn">
            <div className="input-data">
              <div className="inner"></div>
              <input type="submit" value="Save" />
            </div>
            <input type="button" value="Cancel" onClick={onCancel} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditScreen;
