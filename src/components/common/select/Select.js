import classNames from "classnames";
import "./select.scss";

const InputSelect = ({ className, label, optionarray, ...props }) => {
  return (
    <div className={classNames("", className)}>
      <label>{label}</label>
      <select className="form-select" style={{color: 'black'}} {...props}>
        {optionarray
          ? optionarray.map((opt, idx) => (
              <option key={idx} value={opt} style={{color: 'black'}}>
                {opt.toUpperCase()}
              </option>
            ))
          : ""}
      </select>
    </div>
  );
};

export default InputSelect;
