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
  MenuItem,
  Select,
} from "@mui/material";
import MaterialReactTable from "material-react-table";
import moment from "moment";
import { useCallback, useMemo, useState, useEffect } from "react";
import { addOrder, deleteOrder, updateOrder } from "../../utils/OrderUtils.js";
import { generateId } from "../../utils/utils.js";
import Toast from "../Toast/index.jsx";
import { MESSAGE_SUCCESS } from "../../constants/index.js";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useNavigate } from "react-router-dom";

function OrderTable({ ...props }) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [tableData, setTableData] = useState(
    () => props.props.data.data.orders
  );
  const [drivers, setDrivers] = useState(
    () => props.props.drivers.data.drivers
  );
  const [vehicles, setVehicles] = useState(
    () => props.props.vehicles.data.vehicles
  );
  const [warehouses, setWarehouses] = useState(
    () => props.props.warehouses.data.warehouses
  );
  const [transequipments, setTransequipments] = useState(
    () => props.props.transequipments.data.transequipments
  );
  const navigate = useNavigate();

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

  const handleCreateNewRow = async (values, unitId, categoryId) => {
    const code = generateId(20);
    values.code = code;
    values.unitId = unitId;
    values.categoryId = categoryId;
    const data = await addOrder(values);
    console.log("data", data);
    var today = new Date();
    const value = data.data.addOrder;
    value.createdAt = today;
    tableData.push(value);
    setTableData([...tableData]);
    handleOpen({
      color: "#009933",
      title: `Thêm ${MESSAGE_SUCCESS}`,
      type: "success",
    });
  };

  const handleSaveRowEdits = async (values) => {
    console.log("values", values);
    // const variable = row.original;
    // variable.name = values.name;
    // variable.userId = values.userId;
    const index = findIndex(values._id);
    console.log("index", tableData[index]);
    values.unit = {
      code: values.code,
      name: values.name,
      _id: values.unitId,
    };

    values.category = {
      code: values.code,
      name: values.name,
      _id: values.categoryId,
    };

    const data = await updateOrder(values);
    console.log("updata success", data);
    tableData[index] = data.data.updateOrder;
    console.log("done", tableData);
    //send/receive api updates here, then refetch or update local table data for re-render
    setTableData([...tableData]);
    handleOpen({
      color: "#009933",
      title: `Cập nhật ${MESSAGE_SUCCESS}`,
      type: "success",
    });
    setUpdateModalOpen(false);
  };
  const findIndex = (id) => {
    var result = -1;
    tableData.forEach((value, index) => {
      if (value._id === id) {
        result = index;
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
        !confirm(`Bạn có chắc muốn xóa code này không  ${row.getValue("code")}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      const id = row.original._id;
      const data = await deleteOrder({ id: id });
      handleOpen({
        color: "#009933",
        title: `Xóa ${MESSAGE_SUCCESS}`,
        type: "success",
      });
    },
    [tableData]
  );
  const update = (row) => {
    console.log("row", row);
    setDataUpdate(row.original);
    setUpdateModalOpen(true);
  };

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      console.log("cell", cell);
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "name"
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
        accessorKey: "name",
        header: "Tên",
        muiTableHeadCellProps: { sx: { color: "#0D6EFD" } }, //optional custom props
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "text",
        }),
      },
      {
        accessorKey: "size",
        header: "Kích cỡ",
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
      //   {
      //     accessorKey: "unit.name",
      //     header: "Đơn vị",
      //     muiTableHeadCellProps: { sx: { color: "#0D6EFD" } },
      //     muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //       ...getCommonEditTextFieldProps(cell),
      //       type: "text",
      //     }),
      //   },
      //   {
      //     accessorKey: "category.name",
      //     header: "Danh mục",
      //     muiTableHeadCellProps: { sx: { color: "#0D6EFD" } },
      //     muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //       ...getCommonEditTextFieldProps(cell),
      //       type: "text",
      //     }),
      //   },
      {
        accessorKey: "createdAt", //normal accessorKey
        header: "Created At",
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
            <Tooltip arrow placement="left" title="Cập nhật">
              <IconButton onClick={() => update(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Xóa">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button
            color="primary"
            onClick={() =>   navigate("/create-order")}
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
        drivers={drivers}
        transequipments={transequipments}
        vehicles={vehicles}
        warehouses={warehouses}
      />
      <UpdateAccountModal
        columns={columns}
        open={updateModalOpen}
        dataUpdate={dataUpdate}
        tableData={tableData}
        onClose={() => setUpdateModalOpen(false)}
        onSubmit={handleSaveRowEdits}
        drivers={drivers}
        transequipments={transequipments}
        vehicles={vehicles}
        warehouses={warehouses}
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
  drivers,
  transequipments,
  vehicles,
  warehouses,
}) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "default";
      return acc;
    }, {})
  );
  const [unitId, setUnitId] = useState("default");
  const [categoryId, setCategoryId] = useState("default");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    console.log("values", values);
    if (
      !!values.color &&
      !!values.size &&
      !!values.name &&
      !!unitId &&
      unitId !== "default" &&
      !!categoryId &&
      categoryId !== "default" &&
      values.name !== "default" &&
      values.color !== "default" &&
      values.size !== "default"
    ) {
      //put your validation logic here
      onSubmit(values, unitId, categoryId);
      onClose();
      setValues({ name: "default", color: "default", size: "default" });
      setUnitId("default");
      setCategoryId("default");
    } else {
      setValues({ name: "", color: "", size: "" });
      setUnitId("");
      setCategoryId("");
    }
  };
  const onChange = (e) => {
    console.log("e", e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Thêm mới</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack direction={"row"} spacing={{ xs: 1, sm: 2, md: 4 }}>
            <TextField
              key="name"
              label="Tên"
              error={!values.name}
              required={true}
              helperText={message}
              name="name"
              onChange={(e) => onChange(e)}
            />
            <TextField
              key="color"
              label="Màu sắc"
              error={!values.color}
              required={true}
              helperText={message}
              name="color"
              onChange={(e) => onChange(e)}
            />
          </Stack>
          <Stack
            direction={"row"}
            style={{ marginTop: "10px" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <TextField
              key="size"
              label="Kích cỡ"
              error={!values.size}
              required={true}
              helperText={message}
              name="size"
              onChange={(e) => onChange(e)}
            />
            <select
              style={{ height: 55, width: 223 }}
              class="form-select"
              onChange={(e) => handleChange(e)}
              name="cateogoryId"
              required
            >
              <option selected>ss</option>
              {drivers.map((option) => (
                <option value={option._id}>{option.name}</option>
              ))}
            </select>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          onClick={() => {
            onClose();
            // setMessage("");
            setValues({ name: "default", size: "default", color: "default" });
            setUnitId("default");
            setCategoryId("default");
          }}
        >
          Trở về
        </Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Tạo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

//example of creating a mui dialog modal for creating new rows
export const UpdateAccountModal = ({
  open,
  columns,
  onClose,
  onSubmit,
  dataUpdate,
  drivers,
  transequipments,
  vehicles,
  warehouses,
}) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "default";
      return acc;
    }, {})
  );
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setuserName] = useState("");
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});
  useEffect(() => {
    fields["name"] = dataUpdate.name;
    fields["color"] = dataUpdate.color;
    fields["size"] = dataUpdate.size;
    fields["code"] = dataUpdate.code;
    fields["createdAt"] = dataUpdate.createdAt;
    fields["_id"] = dataUpdate._id;
    setFields(fields);
    setName(dataUpdate.name);
    // console.log(dataUpdate.user?._id);
    // setUserId(dataUpdate.user?._id);
    // setuserName(dataUpdate.user?.userName);
  }, [dataUpdate.name]);
  const handleSubmit = (e) => {
    if (handleValidation()) {
      onSubmit(fields);
    }
    return;
    // console.log("name",name)
    // console.log("userId",userId)
    // if (!!values.name && !!userId && userId !=="default" && values.name !== "default") {
    //     //put your validation logic here
    //     onSubmit(values,userId);
    //     onClose();
    //     setValues({name:"default"})
    //     setUserId("default")
    // }else{
    //     setValues({name:""})
    //     setUserId("")
    // }
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    console.log("files1", fields);
    //Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Không thể để trống";
    }
    if (!fields["size"]) {
      formIsValid = false;
      errors["size"] = "Không thể để trống";
    }
    if (!fields["color"]) {
      formIsValid = false;
      errors["color"] = "Không thể để trống";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleChange = (e) => {
    console.log("e", e.target.value);
    fields[e.target.name] = e.target.value;
    setFields(fields);
    console.log("fields", fields);
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Cập nhật</DialogTitle>
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
              label="Kích cỡ"
              value={fields["size"]}
              error={!!errors["size"]}
              required={true}
              helperText={errors["size"]}
              name="size"
              onChange={(e) => handleChange(e)}
            />

            <select
              style={{ height: 55 }}
              class="form-select"
              onChange={(e) => handleChange(e)}
              name="unitId"
              required
            >
              <option value={fields["unitId"]} selected>
                {fields["nameUnit"]}
              </option>
              {vehicles.map((option) => (
                <option value={option._id}>{option.name}</option>
              ))}
            </select>

            <select
              style={{ height: 55 }}
              class="form-select"
              onChange={(e) => handleChange(e)}
              name="cateogoryId"
              required
            >
              <option value={fields["categoryId"]} selected>
                {fields["nameCategory"]}
              </option>
              {drivers.map((option) => (
                <option value={option._id}>{option.name}</option>
              ))}
            </select>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button
          onClick={() => {
            onClose();
            // setMessage("");
            setValues({ name: "default", size: "default", color: "default" });
            setUnitId("default");
            setCategoryId("default");
          }}
        >
          Trở về
        </Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;

export default OrderTable;
