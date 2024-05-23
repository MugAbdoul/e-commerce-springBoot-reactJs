import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Appbar from '../../components/Appbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, deleteCategory, updateCategory, selectCategories, selectLoading, selectError } from '../../redux/slices/categorySlice';

export default function CategoryPage() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [newCategory, setNewCategory] = React.useState({ name: '', image: null });
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = React.useState(null);
  const [editCategory, setEditCategory] = React.useState(null);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClickOpenDialog = (category = null) => {
    if (category) {
      setNewCategory({ name: category.name, image: category.image });
      setEditCategory(category);
    } else {
      setNewCategory({ name: '', image: null });
      setEditCategory(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCategory({ name: '', image: null });
    setEditCategory(null);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleAddOrUpdateCategory = async () => {
    if (newCategory.name) {
      try {
    
        if (editCategory) {
          const categoryData = {
            name: newCategory.name,
            image: newCategory.image !== editCategory?.image ? newCategory.image : editCategory.image,
          };
          await dispatch(updateCategory({ id: editCategory.id, category: categoryData })).unwrap();
          setSnackbarMessage('Category updated successfully!');
        } else {
          const categoryDataAdd = new FormData();
          categoryDataAdd.append('name', newCategory.name);
          categoryDataAdd.append('image', newCategory.image);
          await dispatch(addCategory(categoryDataAdd)).unwrap();
          setSnackbarMessage('Category added successfully!');
        }

        setOpenSnackbar(true);
        setNewCategory({ name: '', image: null });
        handleCloseDialog();
      } catch (error) {
        setSnackbarMessage('Failed to add/update category. Please try again.');
        setOpenSnackbar(true);
      }
    } else {
      setSnackbarMessage('Please provide all details.');
      setOpenSnackbar(true);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await dispatch(deleteCategory(id)).unwrap();
      setSnackbarMessage('Category deleted successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Category could not be deleted.because is being used by product as foreign key.');
      setOpenSnackbar(true);
    }
  };

  const handleConfirmDelete = (id) => {
    setDeleteCategoryId(id);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setDeleteCategoryId(null);
  };

  const handleConfirmDeleteCategory = () => {
    handleDeleteCategory(deleteCategoryId);
    handleCloseConfirmDialog();
  };

  const handleFileChange = (event) => {
    setNewCategory({ ...newCategory, image: event.target.files[0] });
  };

  return (
    <>
      <Appbar />
      <Box
        mt={7}
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={3} sx={{ maxWidth: 1000 }}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                }}
              >
                <Typography variant="h6">Category</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleClickOpenDialog()}>
                  Add
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12}>
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography>Error: {error}</Typography>}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.id}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        <img src={`http://localhost:8081/images/${category.image}`} alt={category.name} width="90" />
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="edit" color="primary" onClick={() => handleClickOpenDialog(category)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => handleConfirmDelete(category.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{editCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the name of the {editCategory ? 'category' : 'new category'} and upload an image.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Category Name"
              type="text"
              fullWidth
              variant="standard"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            {editCategory && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">Current Image:</Typography>
                <img src={`http://localhost:8081/images/${editCategory.image}`} alt={editCategory.name} width="90" />
              </Box>
            )}
            {!editCategory && (
              <>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="raised-button-file">
                  <Button variant="contained" component="span" sx={{ mt: 2 }}>
                    Upload Image
                  </Button>
                </label>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddOrUpdateCategory}>{editCategory ? 'Update' : 'Add'}</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this category?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
            <Button onClick={handleConfirmDeleteCategory}>Delete</Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Box>
    </>
  );
}
