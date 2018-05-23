import React from 'react';
import { Tabs } from 'react-bootstrap';
import { Tab } from 'react-bootstrap';

let Editornavigation = () => (<div>
    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="HTML">
                <label htmlFor="html-editor">Write your html here:</label>
                <br/>
                <textarea id="html-editor" className="code-editor"></textarea>
            </Tab>
            <Tab eventKey={2} title="CSS">
                <label htmlFor="css-editor">Write your css here:</label>
                <br/>
                <textarea id="css-editor" className="code-editor"></textarea>
            </Tab>
            <Tab eventKey={3} title="JavaScript">
                <label htmlFor="js-editor">Write your js here:</label>
                <br/>
                <textarea id="js-editor" className="code-editor"></textarea>
            </Tab>
    </Tabs>
</div>)


export default Editornavigation;