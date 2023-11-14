import "./Tag.scss";

export const Tag = (props) => {
  return (
    <div className={props.status === "success" ? "tag--success" : "tag--fail"}>
      {props.text}
    </div>
  );
};
