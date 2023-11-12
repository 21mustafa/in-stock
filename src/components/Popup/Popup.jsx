import "../Popup/Popup.scss";
import closeIcon from "../../assets/icons/close-24px.svg";

function Popup(props) {
  return (
    <div className="popup">
      <div className="popup__content">
        <button
          className="popup__close"
          onClick={() => {
            props.onCancel();
          }}
        >
          <img className="popup__icon" src={closeIcon} alt="close icon" />
        </button>
        <div className="popup__body">
          <div>
            <h2 className="popup__title">{props.title}</h2>
            <div className="popup__text">{props.text}</div>
          </div>
          <div className="popup__action">
            <button
              onClick={() => {
                props.onCancel();
              }}
              className="popup__action-button--default"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                props.onDelete();
              }}
              className="popup__action-button--cautious"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
