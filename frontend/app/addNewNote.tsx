import React, { useState } from 'react';
import styles from "./page.module.css";

const AddNewNoteInput: React.FC<{
  onAddNote: (title: string, authorName: string, authorEmail: string, content: string) => void;
  onCancel: () => void;}> = (
    { onAddNote, onCancel }) => {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');

  const handleSaveNote = () => {
    onAddNote(title, authorName, authorEmail, content);
    setTitle('');
    setAuthorName('');
    setAuthorEmail('');
    setContent('');
    onCancel();
  };

  const handleCancel = () => {
    onCancel(); 
  };

  return (
    <div className={styles.addNewNote}>
        <div className={styles.textInputContainer}>
          <label>
          title:
          <input name='text_input_new_title_note' type="text" value={title} onChange ={(e) => setTitle(e.target.value)}/>
          Author Name:
          <input name='text_input_new_Author_Name_note' type="text" value={authorName} onChange ={(e) => setAuthorName(e.target.value)}/>
          Author Email:
          <input name='text_input_new_Author_Emailnote' type="text" value={authorEmail} onChange ={(e) => setAuthorEmail(e.target.value)}/>
          Content:
          <input name='text_input_new_note' type="text" value={content} onChange ={(e) => setContent(e.target.value)}/>
        </label>
          <button className={styles.button} name="text_input_save_new_note" onClick={handleSaveNote}>
            Save
          </button>
          <button className={styles.button} name="text_input_cancel_new_note" onClick={handleCancel}>
            Cancel
          </button>
        </div>
    </div>
  );
};

export default AddNewNoteInput;