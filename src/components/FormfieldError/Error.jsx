import requiredErrorIcon from '../../assets/icons/error-24px.svg';
import './Error.scss';

const requiredError = () => {
  return (
    <div className="required-error">
      <img
        className="required-error__icon"
        src={requiredErrorIcon}
        alt="required error icon"
      />
      <p>This field is required</p>
    </div>
  );
};

export default requiredError;
