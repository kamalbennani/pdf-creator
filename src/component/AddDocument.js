import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { generateComponentAsPDF } from '../backend/generate-pdf';
import { Document } from './Document';

class AddDocument extends React.Component {
  handleInsertDocument(event) {
    console.log('submitted');
    event.preventDefault();
    const title = document.querySelector('[name="title"]');
    const body = document.querySelector('[name="body"]');
    const document = {title, body};

    if (document.title.value.trim() !== '' && document.body.value.trim() !== '') {
      console.log('title', document.title.value, 'body', document.body.value);
      const fileName = `document_${document.title}.pdf`;
      generateComponentAsPDF({ component: Document, props: { document }, fileName })
      .then((result) => {
        console.log('result', result);
      })
      .catch((error) => { throw new Error(error); });
    } else {
      console.log('Please provide a content');
    }
  }

  render() {
    console.log('rendering');
    return (
      <form className="AddDocument">
        <FormGroup>
          <FormControl
            name="title"
            type="text"
            placeholder="Type a document title and press enter..."
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            name="body"
            componentClass="textarea"
            placeholder="What do you want to say?"
          />
        </FormGroup>
        <Button bsStyle="success" onClick={ this.handleInsertDocument }>
          Add Document
        </Button>
      </form>

    )
  }
}

export default AddDocument;
