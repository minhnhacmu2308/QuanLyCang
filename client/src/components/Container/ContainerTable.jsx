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
  addContainer,
  deleteContainer,
  updateContainer,
} from "../../utils/ContainerUtils.js";
import { generateId } from "../../utils/utils.js";
import Toast from "../Toast/index.jsx";
import { MESSAGE_SUCCESS } from "../../constants/index.js";

function ContainerTable({ ...props }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => props.props.data.containers);
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

    values.code = code;
    console.log("create", values);
    const data = await addContainer(values);
    var today = new Date();
    const value = data.data.addContainer;
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
    console.log("values", values.size);
    variable.color = values.color;
    variable.size = values.size;
    variable.name = values.name;
    variable.owner = values.owner;
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      console.log("values", values);
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      const data = await updateContainer(variable);
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
        !confirm(`Bạn có chắc muốn xóa đơn vị có code  ${row.getValue("code")}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      const id = row.original._id;
      const data = await deleteContainer({ id: id });
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
            cell.column.id === "color" ||
            cell.column.id === "name" ||
            cell.column.id === "size" ||
            cell.column.id === "owner"
              ? validateRequired(event.target.value)
              : null;
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
        accessorKey: "name",
        header: "Tên",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } }, //optional custom props
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "text",
        }),
      },
      {
        accessorKey: "color",
        header: "Màu sắc",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } }, //optional custom props
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "text",
        }),
      },
      {
        accessorKey: "size",
        header: "Kích thước",
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
    (x) => x.accessorKey === "name" || x.accessorKey === "description"
  );
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "default";
      return acc;
    }, {})
  );
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log("valuessss", values);
  };

  const handleSubmit = (e) => {
    if (handleValidation()) {
      onSubmit(fields);
      onClose();
      setFields({});
    }
    return;
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    //Name
    if (!fields["color"]) {
      console.log("true");
      formIsValid = false;
      errors["color"] = "Không thể để trống";
    }
    if (!fields["name"]) {
      console.log("true");
      formIsValid = false;
      errors["name"] = "Không thể để trống";
    }
    if (!fields["size"]) {
      console.log("true");
      formIsValid = false;
      errors["size"] = "Không thể để trống";
    }
    if (!fields["owner"]) {
      console.log("true");
      formIsValid = false;
      errors["owner"] = "Không thể để trống";
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
              key="name"
              label="Tên"
              value={fields["name"]}
              error={!!errors["name"]}
              required={true}
              helperText={errors["name"]}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              key="color"
              label="Màu sắc"
              value={fields["color"]}
              error={!!errors["color"]}
              required={true}
              helperText={errors["color"]}
              name="color"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              key="size"
              label="Kích thước"
              value={fields["size"]}
              error={!!errors["size"]}
              required={true}
              helperText={errors["size"]}
              name="size"
              onChange={(e) => handleChange(e)}
            />
            <TextField
              key="owner"
              label="Chủ sở hữu"
              value={fields["owner"]}
              error={!!errors["owner"]}
              required={true}
              helperText={errors["owner"]}
              name="owner"
              onChange={(e) => handleChange(e)}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          onClick={() => {
            onClose();
            setFields({});
            setErrors({});
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

export default ContainerTable;
