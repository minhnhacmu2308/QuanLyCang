import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import { addUser, deleteUser, updateUser } from "../../utils/userUtils.js";
import { generateId } from "../../utils/utils.js";
import Toast from "../Toast/index.jsx";
import {MESSAGE_SUCCESS} from "../../constants/index.js";
import { ROLE_USER } from "../../../../server/constants/index.js";
import {useMutation,gql} from "@apollo/client";
import {ApolloClient,ApolloProvider,InMemoryCache} from "@apollo/client";
import {createUploadLink} from "apollo-upload-client"
import CryptoJS from "crypto-js";

function encrypt(text) {
  return CryptoJS.HmacSHA256(text, "quanlycang").toString(
    CryptoJS.enc.Hex
  );
}

const client = new ApolloClient({
    link:createUploadLink({
      uri:"http://localhost:5000//graphql"
    }),
    cache: new InMemoryCache()
  });



function UserTable({ ...props }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => props.props.data.users);
  const [toastData, setToastData] = useState({
    color: "",
    title: "",
    type: "",
  });
  const [alertState, setAlertState] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateDuplicate = (value) => {
    const check = tableData.filter((x) => x.name === value);
    if (check.length > 0) {
      return true;
    }
    return false;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertState(false);
  };

  const handleOpen = (params) => {
    const data = {
      color: params.color,
      title: params.title,
      type: params.type,
    };
    setToastData(data);
    setAlertState(true);
  };

  const handleCreateNewRow = async (values) => {
    const code = generateId(20);
    console.log("values",values)
    values.code = code;
    values.role = ROLE_USER;
    values.image = "https://images.pexels.com/photos/127160/pexels-photo-127160.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
    const data = await addUser(values);
    var today = new Date();
    const value = data.data.addUser;
    value.createdAt = today;
    value.code = code;
    tableData.push(value);
    setTableData([...tableData]);
    handleOpen({
      color: "#009933",
      title: `Thêm ${MESSAGE_SUCCESS}`,
      type: "success",
    });
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    const variable = row.original;
    const user = await findUser(variable._id);
    const password_hash = await  encrypt(values.password);
    variable.fullName = values.fullName;
    variable.userName = values.userName;
    variable.address = values.address;
    variable.birthday= values.birthday;
    variable.password = user.password === values.password ? values.password : password_hash;
    if (!Object.keys(validationErrors).length) {
      values.password = password_hash;
      tableData[row.index] = values;
      console.log("values",values);
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      const data = await updateUser(variable);
      handleOpen({
        color: "#009933",
        title: `Cập nhật ${MESSAGE_SUCCESS}`,
        type: "success",
      });
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const findUser = (id) => {
    var result = -1;
    tableData.forEach((value, index) => {
      if (value._id === id) {
        result = value;
      }
    });
    return result;
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (
        !confirm(
          `Bạn có chắc muốn xóa đơn vị có code  ${row.getValue("code")}`
        )
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      const id = row.original._id;
      const data = await deleteUser({ id: id });
      handleOpen({
        color: "#009933",
        title: `Xóa ${MESSAGE_SUCCESS}`,
        type: "success",
      });
    },
    [tableData]
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      console.log("cell", cell);
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "fullName" || cell.column.id === "address"|| cell.column.id === "birthday" || cell.column.id === "userName" || cell.column.id === "password"
              ? validateRequired(event.target.value)  : null;
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `Không được để trống`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );
  const columns = useMemo(
    () => [
      {
        accessorKey: "code", //access nested data with dot notation
        header: "Code",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } }, //optional custom props
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "text",
          disabled: true,
          hidden: true,
        }),
      },
      {
        accessorKey: "fullName",
        header: "Họ và tên",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } }, //optional custom props
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "text",
        }),
      },
      {
        accessorKey: "userName",
        header: "Tên người dùng",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } },
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps({...cell,}),
          type: "text",
          disabled: true,
          hidden: true,
        }),
      },
      {
        accessorKey: "birthday",
        header: "Ngày sinh",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } }, //optional custom props
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "date",
        }),
      },
      {
        accessorKey: "address",
        header: "Địa chỉ",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } },
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps({...cell,}),
          type: "text",
        }),
      },
      {
        accessorKey: "password",
        header: "Mật khẩu",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } },
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps({...cell,}),
          type: "text",
        
        }),
      },
      {
        accessorKey: "image",
        header: "Ảnh",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } },
        Cell: ({ cell, table }) => (
          <img src={cell.getValue()} alt="" border="3" height="100" width="100" />
        ),
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps({...cell,}),
          type: "text",
          disabled: true,
          hidden: true,
        }),
      },
      {
        accessorKey: "createdAt", //normal accessorKey
        header: "Ngày tạo",
        Cell: ({ cell, table }) => (
          <span>{moment(cell.getValue()).format("yyyy-MM-DD")}</span>
        ),
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } },
        //optional custom props
        muiTableBodyCellEditTextFieldProps: ({ row }) => ({
          disabled: true,
          hidden: true,
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );
  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          "mrt-row-actions": {
            muiTableHeadCellProps: {
              align: "center",
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="primary"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Thêm mới
          </Button>
        )}
      />
      <Toast
        toastData={toastData}
        open={alertState}
        handleClose={() => handleClose()}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        tableData={tableData}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        
      />
    </>
  );
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  tableData,
}) => {
  columns = columns.filter(
    (x) => x.accessorKey === "name" || x.accessorKey === "description"
  );
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "default";
      return acc;
    }, {})
  );
  const [fields, setFields] = useState({})
  const [errors, setErrors] = useState({})
  const UPLOAD_FILE = gql`mutation UploadFile($file: Upload!) {
  uploadFile(file: $file) {
    url
  }
}`;
  const [uploadFile] = useMutation(UPLOAD_FILE,{
   
    onCompleted:data => console.log(data)
  })

  const handleFileChange = async (e) =>{

    const query = `mutation UploadFile($file: Upload!) {
      uploadFile(file: $file) {
        url
      }
    }`;
    const file  = e.target.files[0];
    console.log("file",file)
    if(!file) return;
    const formData = new FormData();
    formData.append('file', file);
    //  const variables = { variables:{file:file}};
    uploadFile({ variables:{file:file}})
    // const res = await fetch(`http://localhost:5000//graphql`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     },
    //     body: JSON.stringify({ query,variables })
    // });
    // const data = await res.json();
    // console.log("hihi",data)
   
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log("valuessss",values);
  };

  const handleSubmit = (e) => {
    console.log("E",fields)
    if (handleValidation()) {
        onSubmit(fields);
        onClose();
        setFields({})
    } 
    return;
  };

  const handleValidation =()=> {
    let errors = {};
    let formIsValid = true;
    //Name
    if (!fields["fullName"]) {
        formIsValid = false;
        errors["fullName"] = "Không thể để trống";
    }
    if (!fields["userName"]) {
        formIsValid = false;
        errors["userName"] = "Không thể để trống";
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "Không thể để trống";
  }
    if (!fields["address"]) {
        formIsValid = false;
        errors["address"] = "Không thể để trống";
    }

    // if (!fields["image"]) {
    //     formIsValid = false;
    //     errors["image"] = "Không thể để trống";
    // }

    if (!fields["birthday"]) {
        formIsValid = false;
        errors["birthday"] = "Không thể để trống";
    }


    setErrors(errors);
    return formIsValid;
  }

  const  handleChange = (e) => {
    fields[e.target.name] = e.target.value;
    setFields(fields);
    setErrors({ ...errors, [e.target.name]: "" });
  }

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Thêm mới</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
              <TextField
                key="fullName"
                label="Họ và tên"
                value={fields["fullName"]}
                error={!!errors["fullName"]}
                required={true}
                helperText={errors["fullName"]}
                name="fullName"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                key="userName"
                label="Tên người dùng"
                value={fields["userName"]}
                error={!!errors["userName"]}
                required={true}
                helperText={errors["userName"]}
                name="userName"
                type="text"
                onChange={(e) => handleChange(e)}
              />
              <label>Ngày sinh:</label>
              <TextField
                key="birthday"
                value={fields["birthday"]}
                error={!!errors["birthday"]}
                required={true}
                helperText={errors["birthday"]}
                name="birthday"
                type="date"
                onChange={(e) => handleChange(e)}
              />
               <TextField
                key="address"
                label="Địa chỉ"
                value={fields["address"]}
                error={!!errors["address"]}
                required={true}
                helperText={errors["address"]}
                name="address"
                type="text"
                onChange={(e) => handleChange(e)}
              />
               <TextField
                key="password"
                label="Mật khẩu"
                value={fields["password"]}
                error={!!errors["password"]}
                required={true}
                helperText={errors["password"]}
                name="password"
                type="password"
                onChange={(e) => handleChange(e)}
              />
                <TextField
                key="image"
                value={fields["image"]}
                error={!!errors["image"]}
                required={true}
                helperText={errors["image"]}
                name="image"
                type="file"
                onChange={(e) => handleFileChange(e)}
              />
               
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          onClick={() => {
            onClose();
            setFields({})
            setErrors({})
          }}
        >
          Trờ về
        </Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Tạo 
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;

export default UserTable;
