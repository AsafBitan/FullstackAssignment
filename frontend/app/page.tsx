"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "./navigationBar";
import AddNewNoteInput from "./addNewNote";
import serverCallesAndNote from "./serverCallesAndNote";
import Note from "./note";

export const NOTES_PER_PAGE: number = 10;
export const NOTES_URL: string = "http://localhost:3001";

const Home: React.FC = () => {
  const { notes, setNotes, activePage, setActivePage, totalPages, setTotalPages, HTTPGet, get, getPage, getTotalPages, postNote, putNote, deleteNote  } = serverCallesAndNote()
  const [showAddNewNote, setShowAddNewNote] = useState(false);
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme === 'light' ? styles.lightTheme : styles.darkTheme;
  }


  useEffect(() => {
    document.body.className = theme === 'light' ? styles.lightTheme : styles.darkTheme;
  }, [theme])

  useEffect(() => {
    getTotalPages();
    getPage(activePage, NOTES_PER_PAGE);
  }, [activePage, NOTES_PER_PAGE]); // Adding dependency array so it won't rerender every render cycle
  

  const handleAddNewNote = (title: string, authorName: string, authorEmail: string, content: string) => {
    title == "" ? alert("Title is Empty!") :
    authorName == "" ? alert("Author is Empty!") :
    authorEmail == "" ? alert("Email is Empty!") :
    content == "" ? alert("Content is Empty!") :

    postNote(title, authorName, authorEmail, content);
  }

  const handleAddNewNoteCancel = () => {
    setShowAddNewNote(false);
  }

  const currentFivePages = (totalPages: number, activePage: number) => {
    // Deciding what buttons to other pages to show depending on the total pages and the active page
    if (activePage <= 2 || totalPages <= 5) {
      return Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);
    } else if (activePage >= totalPages - 2) {
      return [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      return [
        activePage - 2,
        activePage - 1,
        activePage,
        activePage + 1,
        activePage + 2,
      ];
    }
  };

  const pages = currentFivePages(totalPages, activePage);

  return (
    <main className={`${styles.themeContainer} ${theme === 'light' ? styles.lightTheme : styles.darkTheme}`}>
      {!showAddNewNote &&
        (<button name="add_new_note" className={styles.button} onClick={() => setShowAddNewNote(true)}>
          Add new note
        </button>)}
      {showAddNewNote &&(
        <AddNewNoteInput onAddNote={handleAddNewNote} onCancel={handleAddNewNoteCancel}/>
      )}
      
      <div className={styles.description}>
        {notes?.map((note) => (
          <Note 
            note={note} 
            key={note.id}
            putNote={putNote}
            deleteNote={deleteNote} 
          />
        ))}
      </div>
      {/* NavBar will handle all the navigation and its layout */}
      <NavBar
        pages={pages}
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
      />
      <button className={styles.themeButton} name="change_theme" onClick={changeTheme}>
        Change Theme
      </button>
    </main>
  );
};

export default Home;


