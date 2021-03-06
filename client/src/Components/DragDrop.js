// //Make item move from one pouch to another in database
// //The same above action should be reflected in state in react
// //Visually, it should disappear from one pouch and appear in the other one

import React from "react";
import { Draggable, Droppable } from "react-drag-and-drop";
import { Container, Col } from "reactstrap";
import AddPouchContainer from "../Containers/AddPouchContainer";
import DeleteItemContainer from "../Containers/DeleteItemContainer";
import DeletePouchContainer from "../Containers/DeletePouchContainer";
import AddItemContainer from "../Containers/AddItemContainer";
import RenamePouchContainer from "../Containers/RenamePouchContainer";
import Item from "./Item";
import PropTypes from "prop-types";

const DragDrop = props => {
  const { currentPouch, getUser } = props;
  let draggableItems = props.currentItems.map(item => {
    return (
      <Draggable
        type="item"
        data={JSON.stringify(item)}
        itemid={item._id}
        // onDragEnd={e => {
        //   props.onDragEnd(item._id, currentPouch._id, getUser._id);
        // }}
      >
        <div className="item-box">
          <Item item={item} />
          <div>
            <DeleteItemContainer itemid={item._id} />
          </div>
        </div>
      </Draggable>
    );
  });
  let droppableItems = props.pouches.map(pouch => {
    return (
      <Droppable
        types={["item"]} // <= allowed drop types
        onDrop={data => {
          console.log("Dropped data:", data.item);
          data = JSON.parse(data.item);
          props.onDrop(data, pouch._id, props.currentPouch._id);
        }} //{props.onDrop.bind(this)}
        //onDrop={() => onDrop()}
        key={pouch._id}
        onClick={() => {
          console.log("Droppable makes triggers onClick!!!");
          props.setCurrentPouch(pouch._id);
        }}
      >
        <div className="pouch">
          <h3 className="pouch-name">{pouch.name}</h3>
        </div>
      </Droppable>
    );
  });
  return (
    <div class="top-padding">
      <div id="pouch-side-bar">
        <p id="pouch-side-bar-title">Your Pouches</p>
        <div>
          <AddPouchContainer />
          {droppableItems}
        </div>
      </div>
      <div className="current-pouch-container">
        <Container>
          <Col xs="12">
            <div className="box1 item-box">
              {props.currentPouch ? (
                <h1 id="current-pouch-title">{props.currentPouch.name}</h1>
              ) : null}
              <div className="edit-buttons">
                <RenamePouchContainer />
                {props.currentPouch &&
                props.currentPouch.name !== "Unsorted Items" ? (
                  <DeletePouchContainer />
                ) : null}
                <AddItemContainer />
              </div>
              {props.currentItems.length > 0 ? (
                <div>{draggableItems}</div>
              ) : (
                <div>No Items in this Pouch</div>
              )}
            </div>
          </Col>
        </Container>
      </div>
    </div>
  );
};

DragDrop.propTypes = {
  currentPouch: PropTypes.object,
  getUser: PropTypes.func,
  currentItems: PropTypes.array,
  pouches: PropTypes.array,
  onDrop: PropTypes.func,
  setCurrentPouch: PropTypes.func
};

DragDrop.defaultProps = {
  currentPouch: {},
  getUser: () => {},
  currentItems: [],
  pouches: [],
  onDrop: () => {},
  setCurrentPouch: () => {}
};

export default DragDrop;
