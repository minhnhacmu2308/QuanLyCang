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
import {
  addVehicle,
  deleteVehicle,
  updateVehicle,
} from "../../utils/VehicleUtil.js";
import { generateId } from "../../utils/utils.js";
import Toast from "../Toast/index.jsx";
import { MESSAGE_SUCCESS } from "../../constants/index.js";
import axios from "axios";

function VehicleTable({ ...props }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => props.props.data.vehicles);
  const [toastData, setToastData] = useState({
    color: "",
    title: "",
    type: "",
  });
  const [alertState, setAlertState] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateDuplicate = (value) => {
    const check = tableData.filter((x) => x.type === value);
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
    values.code = code;
    const data = await addVehicle(values);
    var today = new Date();
    const value = data.data.addVehicle;
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
    variable.owner = values.owner;
    variable.type = values.type;
    variable.licensePlates = values.licensePlates;
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      console.log("values", values);
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      const data = await updateVehicle(variable);
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
        !confirm(`Bạn có chắc muốn xóa đơn vị có code  ${row.getValue("type")}`)
      ) {
        return;
      }
      console.log("row", row);
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      const id = row.original._id;
      const data = await deleteVehicle({ id: id });
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
            cell.column.id === "type" ||
            cell.column.id === "owner" ||
            cell.column.id === "licensePlates"
              ? validateRequired(event.target.value)
              : null;
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `Không thể để trống`,
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
        accessorKey: "type",
        header: "Loại",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } }, //optional custom props
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "text",
        }),
      },
      {
        accessorKey: "image",
        header: "Ảnh",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } },
        Cell: ({ cell, table }) => (
          <img
            src={cell.getValue()}
            alt=""
            border="3"
            height="100"
            width="100"
          />
        ),
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps({ ...cell }),
          type: "text",
          disabled: true,
          hidden: true,
        }),
      },
      {
        accessorKey: "licensePlates",
        header: "Biển số xe",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } }, //optional custom props
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "text",
        }),
      },
      {
        accessorKey: "owner",
        header: "Chủ sỡ hữu",
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
          <span>{moment(cell.getValue()).format("YYYY-MM-DD|HH:mm:ss")}</span>
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
    (x) => x.accessorKey === "type" || x.accessorKey === "owner"
  );

  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "default";
      return acc;
    }, {})
  );
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState("");
  const handleSubmit = (e) => {
    fields["image"] = image;
    if (handleValidation()) {
      setFields(fields);
      onSubmit(fields);
      onClose();
      setFields({});
      setImage("")
    }
    return;
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    //Name
    if (!fields["owner"]) {
      console.log("true");
      formIsValid = false;
      errors["owner"] = "Không thể để trống";
    }
    if (!fields["type"]) {
      console.log("true");
      formIsValid = false;
      errors["type"] = "Không thể để trống";
    }
    if (!fields["image"]) {
      console.log("true");
      formIsValid = false;
      errors["image"] = "Không thể để trống";
    }
    if (!fields["licensePlates"]) {
      console.log("true");
      formIsValid = false;
      errors["licensePlates"] = "Không thể để trống";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    console.log("e", e);
    fields[e.target.name] = e.target.value;
    setFields(fields);
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = async (e) => {
    const formData = new FormData();
    console.log("file", e.target.files[0]);
    // Update the formData object
    formData.append("image", e.target.files[0]);
    let url = "http://localhost:3000/admin/upload-image";
    try {
      const response = await axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        setImage(response.data.secure_url);
      }
      console.log("res", response);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

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
              key="type"
              label="Loại"
              value={fields["type"]}
              error={!!errors["type"]}
              required={true}
              helperText={errors["type"]}
              name="type"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              key="owner"
              label="Chủ sỡ hữu"
              value={fields["owner"]}
              error={!!errors["owner"]}
              required={true}
              helperText={errors["owner"]}
              name="owner"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              key="licensePlates"
              label="Biển số xe"
              value={fields["licensePlates"]}
              error={!!errors["licensePlates"]}
              required={true}
              helperText={errors["licensePlates"]}
              name="licensePlates"
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
            <div style={{ marginLeft: "0px", marginTop: "10px" }} id="divImage">
              <img
                id="avatar"
                height="190"
                width="100%"
                src={
                  image == ""
                    ? "https://st.quantrimang.com/photos/image/072015/22/avatar.jpg"
                    : image
                }
              />
            </div>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          onClick={() => {
            onClose();
            // setMessage("");
            setFields({});
            setErrors({});
          }}
        >
          Trở về
        </Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;

export default VehicleTable;
