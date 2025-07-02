import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importiere useNavigate
import styles from '../styles/pages/TextPage.module.css';
import arrowBackIcon from '../assets/icons/arrow_back.svg'; // Importiere das SVG-Bild

function TextPage() {
    const navigate = useNavigate(); // Initialisiere useNavigate

    return (
        <div className={styles.textPage}>
            <img
                src={arrowBackIcon}
                alt="Back"
                className={styles.arrowBackIcon}
                onClick={() => navigate('/login')} // Navigiere zur Login-Seite
            />
            <main className={styles.textPageContent}>
                <section className={styles.textSection}>
                    <h2 className={`${styles.title} ${styles.blue}`}>Title</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper hendrerit tellus, eu aliquet dui sollicitudin a. Sed nunc dui, tempor non scelerisque ut, aliquam sit amet metus. Suspendisse ut erat tortor. Maecenas suscipit eleifend facilisis. Donec mollis vitae massa id imperdiet. Donec lobortis feugiat diam et tempor. Praesent malesuada felis vitae leo faucibus ultricies. Sed molestie mollis sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus. In eleifend sollicitudin diam, quis egestas risus maximus in.
                    </p>
                </section>
                <section className={styles.textSection}>
                    <h2 className={styles.title}>Title</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper hendrerit tellus, eu aliquet dui sollicitudin a. Sed nunc dui, tempor non scelerisque ut, aliquam sit amet metus. Suspendisse ut erat tortor.
                    </p>
                </section>
                <section className={styles.textSection}>
                    <h2 className={styles.title}>Title</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper hendrerit tellus, eu aliquet dui sollicitudin a. Sed nunc dui, tempor non scelerisque ut, aliquam sit amet metus. Suspendisse ut erat tortor. Maecenas suscipit eleifend facilisis. Donec mollis vitae massa id imperdiet. Donec lobortis feugiat diam et tempor. Praesent malesuada felis vitae leo faucibus ultricies. Sed molestie mollis sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus. In eleifend sollicitudin diam, quis egestas risus maximus in.
                    </p>
                </section>
            </main>
        </div>
    );
}

export default TextPage;