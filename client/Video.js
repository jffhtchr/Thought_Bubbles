import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { setAlphabetArray } from './redux/alphabetReducer';
import { leftMotionEvent } from './redux/motionEventLeftReducer';
import { rightMotionEvent } from './redux/motionEventRightReducer';
import { selectCurrentCharacter, clearLastCharacter } from './redux/messageReducer';


class Video extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        
        var lastImageData;
        var canvasSource = document.getElementById("canvas-source")
        var canvasBlended = document.getElementById("canvas-blended")
        var contextSource = canvasSource.getContext('2d');
        var contextBlended = canvasBlended.getContext('2d');

        var video = document.getElementById("video")
        var content = document.getElementById("video-container");
        var canvases = document.getElementsByClassName("canvas")
    
        // mirror video
	    contextSource.translate(canvasSource.width, 0);
	    contextSource.scale(-1, 1);

        var constraints = {
                audio: false,
                video: { width: 640, height: 480 }
        }

        navigator.mediaDevices.getUserMedia(constraints)
        .then(this.success)
        .catch(this.error);

        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame       ||
                   window.webkitRequestAnimationFrame ||
                   window.mozRequestAnimationFrame    ||
                   window.oRequestAnimationFrame      ||
                   window.msRequestAnimationFrame     ||
                   function (callback) {
                    window.setTimeout(callback, 1000 / 60);
            };
        })();

        //updates every 60th of a second
        window.onload = function update(){
            drawVideo();
            blend();
            getCoords();
            checkAreas();
            requestAnimFrame(update);
        }

        //draws video into canvas
        function drawVideo() {
            contextSource.drawImage(video, 0, 0, video.width, video.height);
        }

        //Makes sure the difference is always positive (same as Math.abs)
	    function fastAbs(value) {
		    return (value ^ (value >> 31)) - (value >> 31);
	    }

        //Adjust this to change sensitivity of motion sensors?
	    function threshold(value) {
		    return (value > 0x15) ? 0xFF : 0;
	    }

	    function difference(target, data1, data2) {
		    // blend mode difference
		    if (data1.length != data2.length) return null;
		    var i = 0;
		    while (i < (data1.length * 0.25)) {
			    target[4 * i] = data1[4 * i] == 0 ? 0 : fastAbs(data1[4 * i] - data2[4 * i]);
			    target[4 * i + 1] = data1[4 * i + 1] == 0 ? 0 : fastAbs(data1[4 * i + 1] - data2[4 * i + 1]);
			    target[4 * i + 2] = data1[4 * i + 2] == 0 ? 0 : fastAbs(data1[4 * i + 2] - data2[4 * i + 2]);
			    target[4 * i + 3] = 0xFF;
			    ++i;
		    }
	    }

        function differenceAccuracy(target, data1, data2) {
            if (data1.length != data2.length) return null;
            var i = 0;
            while (i < (data1.length * 0.25)) {
                var average1 = (data1[4 * i] + data1[4 * i + 1] + data1[4 * i + 2]) / 3;
                var average2 = (data2[4 * i] + data2[4 * i + 1] + data2[4 * i + 2]) / 3;
                var diff = threshold(fastAbs(average1 - average2));
                target[4 * i] = diff;
                target[4 * i + 1] = diff;
                target[4 * i + 2] = diff;
                target[4 * i + 3] = 0xFF;
                ++i;
            }
        }
    
        function blend() {
            var width = canvasSource.width;
            var height = canvasSource.height;
            // get webcam image data
            var sourceData = contextSource.getImageData(0, 0, width, height);
            // create an image if the previous image doesn’t exist
            if (!lastImageData) lastImageData = contextSource.getImageData(0, 0, width, height);
            // create a ImageData instance to receive the blended result
            var blendedData = contextSource.createImageData(width, height);
            // blend the 2 images
            differenceAccuracy(blendedData.data, sourceData.data, lastImageData.data);
            // draw the result in a canvas
            contextBlended.putImageData(blendedData, 0, 0);
            // store the current webcam image
            lastImageData = sourceData;
        }

        var spotzzz = []

        function getCoords(){
            var children = document.getElementById("hot-spots").children
            var hotspots = Array.prototype.slice.call( children )
            hotspots.forEach(function(el, i){
                var ratio = document.getElementById("canvas-highlights").width/ video.width;
                spotzzz[i] = {
                            x:      el.offsetLeft / ratio,
                            y:      el.offsetTop / ratio,
                            width:  el.scrollWidth / ratio,
                            height: el.scrollHeight / ratio,
                            el:     el
                        };
            });
        }

        var props = this.props;
        var propsShiftLeft = this.props.shiftLeft;
        var propsShiftRight = this.props.shiftRight;
        var propsShiftUp = this.props.shiftUp;
        
        function shiftL(){
            propsShiftLeft(props)
        }

        function shiftR(){
            propsShiftRight(props)
        }

        function shiftUp(){
            propsShiftUp(props)
        }

        let upTriggered = false;
        let leftTriggered = false;
        let rightTriggered = false;

        function checkAreas() {
            var topBox = document.getElementById('top-box').getBoundingClientRect();
            var leftBox = document.getElementById('left-box').getBoundingClientRect();;
            var rightBox = document.getElementById('right-box').getBoundingClientRect();
        
            var hotSpots = [
                {
                    el:  document.getElementById('left-box'),
                    x:  leftBox.x,
                    y: leftBox.y,
                    width: leftBox.width,
                    height: leftBox.height
                },
                {
                    el: document.getElementById('top-box'),
                    x:  topBox.x,
                    y: topBox.y,
                    width: topBox.width,
                    height: topBox.height
                },
                {
                    el:  document.getElementById('right-box'),
                    x:  rightBox.x,
                    y: rightBox.y,
                    width: rightBox.width,
                    height: rightBox.height
                }
            ]

            // loop over the note area
            var data;
        
            for (var r=0; r<spotzzz.length; ++r) {
                // var blendedData = contextBlended.getImageData(1/1*r*video.width, 0, video.width, 100);
                var blendedData = contextBlended.getImageData(spotzzz[r].x, spotzzz[r].y, spotzzz[r].width, spotzzz[r].height);
                // console.log("blendedData: ", blendedData)
                var i = 0;
                var average = 0;

                // loop over the pixels
                while (i < (blendedData.data.length * 0.25)) {
                    // make an average between the color channel
                    average += (blendedData.data[i*4] + blendedData.data[i*4+1] + blendedData.data[i*4+2]) / 3;
                    ++i;
                }

                // calculate an average between of the color values of the hot spot area
                average = Math.round(average / (blendedData.data.length * 0.25));
                if (average > 10) {
                    data = {confidence: average, spot: spotzzz[r]};
                    var id = data.spot.el.id

                    if(id === "right-box" && rightTriggered === false){
                        setRandomColor(id)
                        shiftR()
                        rightTriggered = true; 
                        setTimeout(()=>{
                            rightTriggered = false
                        },1000)
                    }
                    else if(id === "left-box" && leftTriggered === false){
                        setRandomColor(id)
                        shiftL()
                        leftTriggered = true; 
                        setTimeout(()=>{
                            leftTriggered = false
                        },1000)
                    }
                    if(id === "top-box" && upTriggered === false){                    
                        setRandomColor(id)
                        shiftUp()
                        upTriggered = true; 
                        setTimeout(()=>{
                            upTriggered = false
                        },1000)
                    }
                }
            }
        }

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        
        function setRandomColor(id) {
            document.getElementById(`${id}`).style.backgroundColor = getRandomColor();
        }
    }
   

    // ---------------- METHODS --------------- //
    
    componentDidUpdate(){
        if(this.state.updated === false ){
            var newMessage = this.state.message + this.props.currentCharacter
            if(newMessage !== "[object Object]")
            this.setState({
                message: newMessage,
                updated: true
            })      
        }   
    }

    componentWillReceiveProps(){
        this.setState({
            updated: false
        }) 
    }
    
    success(stream) {
        var video = document.getElementById('video');
        video.srcObject = stream;
    }

    error(error) {
        console.log(error);
    }

    render() {

    return (
 
    <div id="video-container">
        
        <video id="video" width="640" height="480" autoPlay></video>

        <canvas className="canvas" id="canvas-source" width="640" height="480"></canvas>
        <canvas className="canvas" id="canvas-highlights" width="640" height="480"></canvas>
        <canvas className="canvas" id="canvas-blended" width="640" height="480"></canvas>

        <div id='hot-spots'>
            <div className = "boxes" id="left-box">Scroll Left</div>
            <div className = "boxes" id="top-box">Select</div>
            <div className = "boxes" id="right-box">Scroll Right</div>
        </div>
        
    </div>

    );
    }
}

function mapStateToProps(storeState){
    return{
       message: storeState.message
    }
 }
 
 function mapDispatchToProps(dispatch, props){
     let letters = [" ", "A","B","C","D","E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "DELETE"]
     return{
         shiftRight(){
            letters.push(letters.shift());
            dispatch(setAlphabetArray(letters))
            dispatch(rightMotionEvent())
        },
        shiftLeft(){
            letters.unshift(letters.pop());
            dispatch(setAlphabetArray(letters))
            dispatch(leftMotionEvent())
        },
        shiftUp(){
            let pickedLetter = letters[Math.ceil((letters.length-1)/2)];
            if(pickedLetter === 'DELETE'){
                dispatch(clearLastCharacter());
            }else{
                dispatch(selectCurrentCharacter(pickedLetter))
            }
        }
     }
 }

const VideoContainer = connect(mapStateToProps, mapDispatchToProps)((Video))
export default VideoContainer;





