import React, { Component } from 'react';
import PubNub from 'pubnub';
import { Button } from 'react-bootstrap';
import Editornavigation from './Editornavigation';
const key = require('./key.js');


let pubnub = new PubNub({
    subscribeKey: key.pubnub.subscribe_key,
    publishKey:  key.pubnub.publish_key
  })

  

class Codewriter extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        console.log(this.props.channel)
        this.pubnubexecute();
    }
    pubnubexecute(){
        let html;
        let css;
        let js;
// console.log(29)
//         pubnub.history(
//             {
//                 channel: 'dogs',
//                 count: 100, //will retrieve latest message
//                 function (status, response) {
//                     console.log('loading history...');
//                     console.log(status)
//                     console.log(response)
//                 }  
//         })
//         console.log(40)

        pubnub.subscribe({
            channels: [this.props.channel]
        })
        
        pubnub.addListener({
          message: function(m){
            console.log(m.message);
          }
        })

        pubnub.addListener({
            message: function(m){
              console.log(m.message);
              html = m.message.html;
              css = m.message.css;
              js = m.message.js;
              
              let executionWrapper = document.getElementById('code-executer-wrapper');
              let myframe = document.createElement('iframe');
              myframe.src = "about:blank";
              myframe.id = "frame";

              executionWrapper.innerHTML = "";
              executionWrapper.appendChild(myframe);
   
              let frame = document.getElementById('frame');
              document.getElementById('html-editor').value = html;
              document.getElementById('css-editor').value = css;
              document.getElementById('js-editor').value = js;


              frame.src = "about:blank";
              let style = "<style>" + css + "</style>";
              let script = "<script>" + js + "<\/script>";

              let doc = "<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width'>" + style + "</head><body>" + html + script +  "</body></html>";

              frame.contentDocument.write(doc);
            }
        })
    } 
    sendMessage(){
        let html = document.getElementById('html-editor').value;
        let css = document.getElementById('css-editor').value;
        let js = document.getElementById('js-editor').value;
       
        pubnub.publish({
            message: {
                html, css, js,
            },
            channel: this.props.channel
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        });
    }
    render() { 
        return (<div>
        <h1>Edit your code:</h1>
        <div className="code-writer">
            <Editornavigation />
        </div>
        <Button size="lg" block onClick={() => this.sendMessage()}>Run Code</Button>
        </div>)
    }
}
 
export default Codewriter;



