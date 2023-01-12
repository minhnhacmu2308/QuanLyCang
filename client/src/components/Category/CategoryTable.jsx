import { Delete, Edit } from '@mui/icons-material';
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
  Tooltip
} from '@mui/material';
import MaterialReactTable from 'material-react-table';
import moment from 'moment';
import { useCallback, useMemo, useState } from 'react';
import { addCategory, deleteCategory, updateCategory } from '../../utils/categoryUtils.js';
import { generateId } from '../../utils/utils.js';
import Toast from '../Toast/index.jsx';

function CategoryTable({...props}) {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => props.props.data.categorys);
  const [alertState, setAlertState] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleCreateNewRow = async (values) => {
    const code = generateId(20);
    values.code = code;
    const data =  await addCategory(values);
    var today = new Date();
    const value = data.data.addCategory;
    value.createdAt = today;
    tableData.push(value);
    setTableData([...tableData]);
    setAlertState(true);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    console.log("values",values);
    console.log("row",row);
    const variable = row.original;
    variable.name = values.name
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      const data = await updateCategory(variable);
      console.log("data",data);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
   async (row) => {
      if (
        !confirm(`Are you sure you want to delete name  ${row.getValue("name")}`)
      ) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
      const id =  row.original._id;
      const data = await deleteCategory({id:id});
      console.log(data);
    },
    [tableData],
  );

 const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = cell.column.id === 'name' ? validateRequired(event.target.value) : null;
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
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
    [validationErrors],
  );
    const columns = useMemo(
        () => [
          {
            accessorKey: 'code', //access nested data with dot notation
            header: 'Code',
            muiTableHeadCellProps: { sx: { color: '#0D6EFD' } }, //optional custom props
            size: 80,                     
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
              type: 'text',
              disabled : true
            }),
          },
          {
            accessorKey: 'name',
            header: 'Name',
            muiTableHeadCellProps: { sx: { color: '#0D6EFD' } }, //optional custom props
            muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
              ...getCommonEditTextFieldProps(cell),
              type: 'text',
            }),
          },
          {
            accessorKey: 'createdAt', //normal accessorKey
            header: 'Created At',
            Cell: ({ cell, table }) => <span>{moment(cell.getValue()).format('YYYY-MM-DD|HH:mm:ss')}</span>,
            muiTableHeadCellProps: { sx: { color: '#0D6EFD' } }, //optional custom props
            muiTableBodyCellEditTextFieldProps: ({ row }) => ({
              disabled: true,
            }),
          },        
        ],
        [getCommonEditTextFieldProps],
      );
      console.log('FE',props);
  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
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
          
          <Box sx={{ display: 'flex', gap: '1rem' }}>
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
            Create
          </Button>
        )}
      />
     <Toast title="Add category success" color="#009933" open={alertState}/>
     <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
}

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  columns = columns.filter(x => x.accessorKey === "name");
  const [values, setValues] = useState(() =>
  columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Category</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleSubmit} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;

export default CategoryTable;
