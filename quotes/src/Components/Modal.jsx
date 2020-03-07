import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css";

class Modal extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.8,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  render() {
    return (
      <div>
        <div ref={Modal => this.Modal = Modal} id="modal1" className="modal">
          <div className="modal-content">
            <h4 className="modal-title" style={{ color: this.props.color }}>Новость</h4>
            <p className="modal-p" style={{ color: this.props.color }}>{this.props.text}</p>
          </div>
          <div className="modal-footer">
            <a style={{ color: this.props.color }} className="modal-close waves-effect waves-red btn-flat">
              Закрыть
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;