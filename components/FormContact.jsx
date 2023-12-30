"use client"
import { useState } from "react";
import "./FormContact.css";
import ErrorToast from "./ErrorToast";

function FormContact() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        setSuccessMsg(null);

        const data = { name, email, subject, message };  // Definir data

        try {
           const res = await fetch("/api/mailer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error('Algo salió Mal con tu Email');
            }

            setSuccessMsg("Mensaje Enviado Exitosamente!");
          

            setTimeout(() => {
                setName("")
                setEmail("")
                setSubject("")
                setMessage("")
                setSuccessMsg("Te responderemos lo antes posible!");
            }, 4000);

        } catch (error) {
            setErrorMsg(error.message);

            setTimeout(() => {
                setName("")
                setEmail("")
                setSubject("")
                setMessage("")
                setErrorMsg("Por favor refresca la página, e inténtalo de nuevo...");
            }, 4000);
        }
    }

    return (
        <form className="form-contact" onSubmit={handleSubmit}>
            <input type="text" value={name} placeholder="Ingresa tu Nombre" onChange={(e) => setName(e.target.value)} required />
            <input type="email" value={email} placeholder="Ingresa tu Email" onChange={(e) => setEmail(e.target.value)} required />
            <input type="text" value={subject} placeholder="Asunto" onChange={(e) => setSubject(e.target.value)} required />
            <textarea value={message} placeholder="Escribe tu Mensaje..." onChange={(e) => setMessage(e.target.value)} required />
            <input type="submit" value="Enviar Mensaje" />

            {successMsg && <p className="successMsg">{successMsg}</p>}
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}

            <ErrorToast errorMsg={errorMsg} successMsg={successMsg} />
        </form>
    )
}

export default FormContact;
