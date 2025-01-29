import React, { useRef, useState, useEffect } from "react";
import PropTypes, { number } from "prop-types";
import "./index.css";
import ImgContainer from "./ImgContainer";
import SwitchArrow from "./SwitchArrow";
import SwitchDot from "./SwitchDot";

interface BannerProps {
	width: number;
	height: number;
	imgSrcs: string[];
	autoDuration: number;
	duration: number;
}

const Banner = (props: BannerProps) => {

	const [currentIndex, setCurrentIndex] = useState<number>(0);


    const imgContainerRef = useRef<{ switchToImgIndex: (index: number) => void }>(null);

	const handleSwitch = (index: number) => {
        if (imgContainerRef.current) {
            imgContainerRef.current.switchToImgIndex(index);
        }
		setCurrentIndex(index);

    };

	const handleArrowChange = (dirction:'left'|'right') =>{
		let current  = currentIndex;

		switch(dirction){
			case "left":
				current--;
				if(current <0) current = props.imgSrcs.length - 1;
				break;
			case "right":
				current++;
				if(current> props.imgSrcs.length-1) current = 0;
				break;
		}

		handleSwitch(current);
	}

	let autoSwithTimer:number|undefined = undefined;
	const autoSwith = () => {
		clearInterval(autoSwithTimer);

		autoSwithTimer = setInterval(() => {
			let current = currentIndex;
			current = (current + 1) % props.imgSrcs.length;
			handleSwitch(current);

		}, props.autoDuration);
	};

	useEffect(() => {
		// This code will run once after the component mounts
		autoSwith();

		// Cleanup function if needed
		return () => {
			clearInterval(autoSwithTimer);
		};
	}, [currentIndex, props.autoDuration]); // Add currentIndex and props.autoDuration to the dependency array

    const style = {
        width: props.width,
        height: props.height,

    };

	return (<div className="banner-container" style={style} onMouseEnter={()=>clearInterval(autoSwithTimer)} onMouseLeave={()=>autoSwith()}>
		<ImgContainer 
			ref={imgContainerRef}
			imgScrcs={props.imgSrcs} 
			imgWidth={props.width} 
			imgHeight={props.height}
			duration={props.duration}
		/>
		<SwitchArrow onChange={handleArrowChange}/>
		<SwitchDot currentIndex={currentIndex} total={props.imgSrcs.length} onChange={handleSwitch}/>

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
