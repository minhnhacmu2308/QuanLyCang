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
import { addCustomer, deleteCustomer, updateCustomer } from "../../utils/userUtils.js";
import { generateId } from "../../utils/utils.js";
import Toast from "../Toast/index.jsx";
import {MESSAGE_SUCCESS} from "../../constants/index.js";
import { ROLE_CUSTOMER } from "../../../../server/constants/index.js";

function CustomerTable({ ...props }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => props.props.data.customers);
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
    values.role = ROLE_CUSTOMER;
    const data = await addCustomer(values);
    var today = new Date();
    const value = data.data.addCustomer;
    value.createdAt = today;
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
    variable.fullName = values.fullName;
    variable.email = values.email;
    variable.address = values.address;
    variable.fax= values.fax;
    variable.taxCode = values.taxCode;
    variable.phone = values.phone;
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      console.log("values",values);
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      const data = await updateCustomer(variable);
      handleOpen({
        color: "#009933",
        title: `Cập nhật ${MESSAGE_SUCCESS}`,
        type: "success",
      });
      exitEditingMode(); //required to exit editing mode and close modal
    }
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
      const data = await deleteCustomer({ id: id });
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
            cell.column.id === "fullName" || cell.column.id === "address"|| cell.column.id === "email" || cell.column.id === "phone"|| cell.column.id === "fax" || cell.column.id === "taxCode"
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
        accessorKey: "taxCode",
        header: "Mã số thuế",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } },
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps({...cell,}),
          type: "text",
        }),
      },
      {
        accessorKey: "fax",
        header: "Fax",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } }, //optional custom props
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "text",
        }),
      },
      {
        accessorKey: "email",
        header: "Email",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } }, //optional custom props
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "text",
        }),
      },
      {
        accessorKey: "address",
        header: "Địa chỉ",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } }, //optional custom props
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "text",
        }),
      },
      {
        accessorKey: "phone",
        header: "Số điện thoại",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } }, //optional custom props
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "text",
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
    if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "Không thể để trống";
    }
    if (!fields["address"]) {
        formIsValid = false;
        errors["address"] = "Không thể để trống";
    }

    if (!fields["phone"]) {
        formIsValid = false;
        errors["phone"] = "Không thể để trống";
    }

    if (!fields["taxCode"]) {
        formIsValid = false;
        errors["taxCode"] = "Không thể để trống";
    }

    if (!fields["fax"]) {
        formIsValid = false;
        errors["fax"] = "Không thể để trống";
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
                key="taxCode"
                label="Mã số thuê"
                value={fields["taxCode"]}
                error={!!errors["taxCode"]}
                required={true}
                helperText={errors["taxCode"]}
                name="taxCode"
                type="text"
                onChange={(e) => handleChange(e)}
              />
              <TextField
                key="fax"
                label="Fax"
                value={fields["fax"]}
                error={!!errors["fax"]}
                required={true}
                helperText={errors["fax"]}
                name="fax"
                onChange={(e) => handleChange(e)}
              />
               <TextField
                key="email"
                label="Email"
                value={fields["email"]}
                error={!!errors["email"]}
                required={true}
                helperText={errors["email"]}
                name="email"
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
                onChange={(e) => handleChange(e)}
              />
               <TextField
                key="phone"
                label="Số điện thoại"
                value={fields["phone"]}
                error={!!errors["phone"]}
                required={true}
                helperText={errors["phone"]}
                name="phone"
                onChange={(e) => handleChange(e)}
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

export default CustomerTable;
