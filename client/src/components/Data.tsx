import * as React from "react";
import { useNavigate, NavLink } from "react-router-dom";

interface IUser {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
  created_at: string;
  updated_at: string;
}

type UserTyper = IUser;

interface IProps {
  data: UserTyper[];
}

type PropsType = IProps;

const DataTable = (props: PropsType) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<IUser>();
  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement>,
    user: UserTyper
  ) => {
    e.preventDefault();
    navigate("/edit", { state: { id: user.id } });
    setUser(user);
  };
  const { data } = props;
  const exportToCSV = () => {
    const csvData = data.map((item) => {
      return Object.values(item).join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvData.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "exported_data.csv");
    document.body.appendChild(link);
    link.click();
  };
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: UserTyper) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{item.status}</td>
            <td>{item.created_at}</td>
            <td>{item.updated_at}</td>
            <td>
              <NavLink to="/edit">
                <button onClick={(e) => handleEdit(e, item)}>Edit</button>
              </NavLink>
            </td>
          </tr>
        ))}
      </tbody>
      <button onClick={exportToCSV}>Export to CSV</button>
    </table>
  );
};

export default DataTable;
