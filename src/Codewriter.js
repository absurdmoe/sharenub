import React, { Component } from 'react';
import PubNub from 'pubnub';
import { Button } from 'react-bootstrap';
import Editornavigation from './Editornavigation';


let pubnub = new PubNub({
    subscribeKey: "sub-c-9fccfcb8-5e27-11e8-94f8-7233e189f8a9",
    publishKey: "pub-c-d6cb434b-5c82-4ae1-8f14-dc364968f06f"
  })

  

class Codewriter extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.pubnubexecute();
    }
    pubnubexecute(){
        let html;
        let css;
        let js;

        pubnub.subscribe({
            channels: ['collab']
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
            channel: 'collab'
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



