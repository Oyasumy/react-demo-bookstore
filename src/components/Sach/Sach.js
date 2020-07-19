import React, { useState, useEffect } from "react";
import {
  Button,
  Icon,
  Table,
  Pagination,
  Modal,
  Input,
  Label,
  Segment,
} from "semantic-ui-react";
import PropTypes from "prop-types";

const Sach = (props) => {
  var { books, isShowModel } = props;
  // var wrapper = React.createRef();
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    setPageNumber(Math.ceil(books.length / postPage));
  }, [books, pageNumber, postPage]);

  useEffect(() => {
    setOpen(isShowModel);
  }, [isShowModel]);

  const showBooks = (books) => {
    var result = null;
    if (!books) return null;
    result = books.map((book, i) => {
      return (
        <ListSach
          key={i}
          setDelete={props.setDelete}
          book={book}
          setEditBook={props.setEditBook}
          setOp={() => props.setOpen()}
        />
      );
    });
    return result;
  };
  const onClose = () => {
    props.setOpen();
  };
  const handlePagi = (data) => {
    setCurrentPage(data.activePage);
  };
  //panig
  var produ = [...books];
  const indexOfLastPost = currentPage * postPage;
  const indexOfFirstPost = indexOfLastPost - postPage;

  const currentPost = produ.splice(indexOfFirstPost, postPage);
  return (
    <div>
      <h1>Sach</h1>
      <ModelAddOrEdit
        open={open}
        close={onClose}
        bookEdit={props.bookEdit}
        setApiAddBook={props.setApiAddBook}
        setApiEditBook={props.setApiEditBook}
      />
      <Table compact celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price In</Table.HeaderCell>
            <Table.HeaderCell>Price Out</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{showBooks(currentPost)}</Table.Body>

        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="3">
              <Pagination
                defaultActivePage={currentPage}
                firstItem={null}
                lastItem={null}
                pointing
                secondary
                totalPages={pageNumber}
                onPageChange={(e, d) => handlePagi(d)}
              />
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="3">
              <Button
                className="control-table"
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={() => {
                  props.setOpen();
                  props.setEmpty();
                }}
              >
                <Icon name="user" /> Add Book
              </Button>
              {/* <Button size="small">Approve</Button>
              <Button disabled size="small">
                Approve All
              </Button> */}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

Sach.propTypes = {
  books: PropTypes.array,
};

const ListSach = (props) => {
  var { book } = props;
  return (
    <Table.Row key={book.masach}>
      <Table.Cell collapsing>
        <Button.Group>
          <Button
            onClick={() => {
              props.setEditBook(book);
              props.setOp();
            }}
          >
            Edit
          </Button>
          <Button.Or />
          <Button positive onClick={() => props.setDelete(book)}>
            Delete
          </Button>
        </Button.Group>
      </Table.Cell>
      <Table.Cell>{book.tensach}</Table.Cell>
      <Table.Cell>{book.theloai}</Table.Cell>
      <Table.Cell>{book.tacgia}</Table.Cell>
      <Table.Cell>{book.soluong}</Table.Cell>
      <Table.Cell>{book.dongianhap}</Table.Cell>
      <Table.Cell>{book.dongiaban}</Table.Cell>
    </Table.Row>
  );
};

ListSach.propTypes = {
  book: PropTypes.shape({
    masach: PropTypes.number,
    tensach: PropTypes.string,
    theloai: PropTypes.string,
    tacgia: PropTypes.string,
    soluong: PropTypes.number,
    dongiaban: PropTypes.number,
    dongianhap: PropTypes.number,
  }),
};

const ModelAddOrEdit = (props) => {
  var { open, bookEdit } = props;
  const [book, setBook] = useState({
    masach: -1,
    tensach: "",
    theloai: "",
    tacgia: "",
    soluong: "",
    dongiaban: "",
    dongianhap: "",
  });
  // Object.keys(editBook).length !==0
  useEffect(() => {
    if (bookEdit) {
      if (Object.keys(bookEdit).length === 0) {
        setBook({
          masach: -1,
          tensach: "",
          theloai: "",
          tacgia: "",
          soluong: "",
          dongiaban: "",
          dongianhap: "",
        });
      } else {
        var {
          masach,
          tensach,
          theloai,
          tacgia,
          soluong,

          dongianhap,
        } = bookEdit;
        setBook({
          masach,
          tensach,
          theloai,
          tacgia,
          soluong,
          dongianhap,
        });
      }
    }
  }, [bookEdit]);

  const ShowData = () => {
    if (book.masach < 0) {
      props.setApiAddBook(book);
    } else {
      props.setApiEditBook(book);
    }
  };
  return (
    <>
      <Modal size="large" open={open} onClose={props.close}>
        <Modal.Header>{book.masach>0?"Update a Book":"Add Book"}</Modal.Header>
        <Modal.Content scrolling>
          <Segment raised>
            <Label as="a" color="red" ribbon>
              Overview
            </Label>
            <span>Name Book</span>
            <Input
              className="m-3"
              fluid
              icon="book"
              iconPosition="left"
              placeholder="Name Book"
              value={book.tensach}
              onChange={(e, { value }) => {
                if (value.length < 20) {
                  setBook({ ...book, tensach: value });
                }
              }}
            />
          </Segment>
          <Segment raised>
            <Label as="a" color="orange" ribbon>
              Overview
            </Label>
            <span>Category</span>
            <Input
              className="m-3"
              fluid
              icon="book"
              iconPosition="left"
              placeholder="Category"
              value={book.theloai}
              onChange={(e, { value }) => {
                if (value.length < 20) {
                  setBook({ ...book, theloai: value });
                }
              }}
            />
          </Segment>
          <Segment raised>
            <Label as="a" color="teal" ribbon>
              Overview
            </Label>
            <span>Author</span>
            <Input
              className="m-3"
              fluid
              icon="book"
              iconPosition="left"
              placeholder="Author"
              value={book.tacgia}
              onChange={(e, { value }) => {
                if (value.length < 20) {
                  setBook({ ...book, tacgia: value });
                }
              }}
            />
          </Segment>
          {/* <Segment raised>
            <Label as="a" color="yellow" ribbon>
              Overview
            </Label>
            <span>Quantity</span>
            <Input
              className="m-3"
              fluid
              icon="book"
              iconPosition="left"
              type="number"
              placeholder="Quantity"
              value={book.soluong}
              onChange={(e, { value }) => setBook({ ...book, soluong: value })}
            />
          </Segment>
          <Segment raised>
            <Label as="a" color="brown" ribbon>
              Price In
            </Label>
            <span>Price In</span>
            <Input
              className="m-3"
              fluid
              icon="book"
              iconPosition="left"
              type="number"
              placeholder="Quantity"
              value={book.dongianhap}
              onChange={(e, { value }) =>
                setBook({ ...book, dongianhap: value })
              }
            />
          </Segment>
          {/* <Segment raised> */}
          {/* <Label as="a" color="pink" ribbon>
              Price Out
            </Label>
            <span>Price Out</span>
            <Input
              className="m-3"
              fluid
              icon="book"
              iconPosition="left"
              type="number"
              placeholder="Quantity"
              value={book.dongiaban}
              onChange={(e, { value }) =>
                setBook({ ...book, dongiaban: value })
              }
            /> 
           </Segment>  */}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={props.close || props.setEmpty}>
            No
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Yes"
            onClick={() => ShowData()}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
};

ModelAddOrEdit.propTypes = {
  open: PropTypes.bool,
};

export default Sach;
