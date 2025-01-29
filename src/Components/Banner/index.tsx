import React, { useRef } from "react";
import PropTypes from "prop-types";
import "./index.css";
import ImgContainer from "./ImgContainer";
import SwitchArrow from "./SwitchArrow";

interface BannerProps {
	width: number;
	height: number;
	imgSrcs: string[];
	autoDuration: number;
	duration: number;
}


const Banner = (props: BannerProps) => {
    const imgContainerRef = useRef<{ switchToImgIndex: (index: number) => void }>(null);

    const style = {
        width: props.width,
        height: props.height,

    };

	const handleSwitch = (index: number) => {
        if (imgContainerRef.current) {
            imgContainerRef.current.switchToImgIndex(index);
        }
    };

	return (<div className="banner-container" style={style}>
		<ImgContainer 
			ref={imgContainerRef}
			imgScrcs={props.imgSrcs} 
			imgWidth={props.width} 
			imgHeight={props.height}
			duration={props.duration}
		/>
		<SwitchArrow/>
		<button onClick={()=>{handleSwitch(3)}}>To the 3rd img</button>
		<button onClick={()=>{handleSwitch(2)}}>To the 2nd img</button>

	</div>);
};

Banner.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	imgSrcs: PropTypes.arrayOf(PropTypes.string).isRequired,
	autoDuration: PropTypes.number.isRequired, //duration of each image
	duration: PropTypes.number.isRequired, // duration of one switch
};

export default Banner;
