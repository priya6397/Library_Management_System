import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import BookServices from "../Service/BookService";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import LibraryServices from "../Service/LibraryService";
import BookIcon from '@mui/icons-material/Book';
import { Tooltip } from "@mui/material";

export default function Books() {
  const navigate = useNavigate();
  const initialBookData = {
    title: "",
    authorName: "",
    publisherName: "",
    publisherNo: "",
    publisherEmail: "",
    bookType: "",
    price: "",
    quantity: "",
    libraryId: "",
  };

  const [books, setBooks] = useState([]);
  const [currentData, setCurrentData] = useState(initialBookData);
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const result = await BookServices.loadBooks();
    setBooks(result.data);
  };

  const IssueBook = (id, title) => {
    navigate("/BookIssue", {
      state: { id: id, title: title },
    });
  };

  const deleteBook = async (id) => {
    const result = await BookServices.deleteBookById(id);
    loadBooks();
  };

  const getBooks = async (id) => {
    handleShow();
    const result = await BookServices.getBooks(id);
    setCurrentData(result.data);
  };

  const updateBook = () => {
    const updatedData = { ...currentData, libraryId: currentData.library?.id }; //... spread operator stores data
    BookServices.updateBook(currentData.id, updatedData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          handleClose();
          loadBooks();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
    };

    const getLibraries = () => {
        LibraryServices.loadLibrary()
        .then((response) => {
            setViewLibraryData(response.data);
        })
        .catch((error) => {
            console.log("error", error);
        });
    };

    useEffect(() => {
        getLibraries();
    }, []);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "libraryId") {
      const selectedLibrary = viewLibraryData.find(
        (library) => library.id === parseInt(value)
      );
      setCurrentData({ ...currentData, library: selectedLibrary });
    } else {
      setCurrentData({ ...currentData, [name]: value });
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [viewLibraryData, setViewLibraryData] = useState([]);

  return (
    <div style={{ width: "80%", margin: "20px auto" }}>
      <h2 style={{ fontWeight: "bold" }}>Books List</h2>
      <Table stripped bordered hover variant="light">
        <thead style={{ backgroundColor: "#1976d2", height: "40px" }}>
          <th style={{ textAlign: "center" }}>Book Id</th>
          <th style={{ textAlign: "center" }}>Book Name</th>
          <th style={{ textAlign: "center" }}>Author Name</th>
          <th style={{ textAlign: "center" }}>Publisher Name</th>
          <th style={{ textAlign: "center" }}>Publisher Phone No</th>
          <th style={{ textAlign: "center" }}>Publisher Email</th>
          <th style={{ textAlign: "center" }}>Book Type</th>
          <th style={{ textAlign: "center" }}>Quantity</th>
          <th style={{ textAlign: "center" }}>Price</th>
          <th style={{ textAlign: "center" }}>Created At</th>
          <th style={{ textAlign: "center" }}>Action</th>
        </thead>
        <tbody>
          {books.map((row) => (
            <tr key={row.id}>
              <td component="th" style={{ textAlign: "center" }}>
                {row.id}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.title}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.authorName}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.publisherName}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.publisherNo}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.publisherEmail}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.bookType}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.quantity}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.price}
              </td>
              <td component="th" style={{ textAlign: "center" }}>
                {row.createdAt}
              </td>
              <td>
                  <Tooltip title="Issue Book">
                <IconButton
                  aria-label="issue"
                  size="large"
                  onClick={() => IssueBook(row.id, row.title)}
                  color="primary"
                >
                  <BookIcon fontSize="inherit" />
                </IconButton>
                </Tooltip>

                <Tooltip title="Edit">
                <IconButton
                  aria-label="edit"
                  size="large"
                  onClick={() => getBooks(row.id)}
                  color="info"
                >
                  <EditNoteIcon fontSize="inherit" />
                </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => deleteBook(row.id)}
                  color="error"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
        <div
          style={{
            display: "table-caption",
            width: "80%",
            margin: "20px auto",
          }}
        >
          <Link to="/AddBooks">
            <Button variant="primary">Add Book</Button>
          </Link>
        </div>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontWeight: "bold" }}>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3">
            <Form.Select enabled value={currentData?.library?.id} onChange={handleInputChange} name='libraryId'
            title="Select Library">
            <option>Select Library</option>
            {viewLibraryData.map((item) => (
                <option value={item.id}>{item.name}</option>
                
                ))}
            </Form.Select>
        </Form.Group>
            <div className='form-group mb-2'>
                <input name='title' className='form-control'
                value={currentData.title}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Book Title' 
                    title="Enter the title of the book here"/>
            </div>
            <div className='form-group mb-2'>
                <input name='authorName' className='form-control'
                value={currentData.authorName}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Author Name' 
                    title="Enter the author name here"/>
            </div>
            <div className='form-group mb-2'>
                <input name='publisherName' className='form-control'
                value={currentData.publisherName}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Publisher Name' 
                    title="Enter the publisher name here"/>
            </div>
            <div className='form-group mb-2'>
                <input name='publisherNo' className='form-control'
                value={currentData.publisherNo}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Publisher No' 
                    title="Enter the publisher number here" />
            </div>
            <div className='form-group mb-2'>
                <input name='publisherEmail' className='form-control'
                value={currentData.publisherEmail}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Publisher Email'
                    title="Enter the publisher email here" />
            </div>
            <div className='form-group mb-2'>
                <input name='bookType' className='form-control'
                value={currentData.bookType}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Book Type'
                    title="Enter the book type here" />
            </div>
            <div className='form-group mb-2'>
                <input name='price' className='form-control'
                value={currentData.price}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Price' 
                    title="Enter the price here" />
            </div>
            <div className='form-group mb-2'>
                <input name='quantity' className='form-control'
                value={currentData.quantity}
                onChange={handleInputChange}
                    type="text" placeholder='Enter Quantity'
                    title="Enter the quantity here" />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateBook}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
