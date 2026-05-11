import {
  Table,
  Button
} from "react-bootstrap";

const UsersTable = ({
  users,
  handleEdit,
  handleDelete
}) => {

  return (
    <Table bordered hover>

      <thead>

        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th width="180">
            Aksi
          </th>
        </tr>

      </thead>

      <tbody>

        {
          users.map((item, index) => (
            <tr key={item.user_id}>

              <td>
                {index + 1}
              </td>

              <td>
                {item.nama}
              </td>

              <td>
                {item.username}
              </td>

              <td>
                {item.email}
              </td>

              <td>
                {item.role}
              </td>

              <td>

                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(item.user_id)}
                >
                  Delete
                </Button>

              </td>

            </tr>
          ))
        }

      </tbody>

    </Table>
  );

};

export default UsersTable;