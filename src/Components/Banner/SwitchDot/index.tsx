import React from "react";
import PropTypes from "prop-types";
import "./index.css";

interface SwitchDotProps {
	total: number;
	currentIndex: number;
	onChange: (index: number) => void;

}

const SwitchDot = (props: SwitchDotProps) => {
	const spans = [];

	for (let i = 0; i < props.total; i++) {
		spans.push(
			<span
				key={i}
				className={i === props.currentIndex ? "active" : ""}
				onClick={() => props.onChange(i)}
			></span>
		);
	}

	return <div className="dots">
		{spans}
	</div>;
};

SwitchDot.propTypes = {
	total: PropTypes.number.isRequired,
    currentIndex:PropTypes.number.isRequired,
	onChange: PropTypes.func,
};

export default SwitchDot;
