import "../Popup/Popup.scss";
import closeIcon from "../../assets/icons/close-24px.svg";

function Popup(props) {
  return (
    <div className="popup">
      <div className="popup__content">
        <button
          onClick={() => {
            props.onCancel();
          }}
        >
          <img className="popup__icon" src={closeIcon} alt="close icon" />
        </button>
        <h2>{props.title}</h2>
        <div>{props.text}</div>
        <div className="popup-action">
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
  );
}

export default Popup;
