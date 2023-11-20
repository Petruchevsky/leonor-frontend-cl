// Archivo: app/api/mailer/route.js
import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";

export async function POST(request) {
    // Obteniendo los datos del cuerpo de la solicitud
    const { name, email, subject, message } = await request.json();
	console.log(message)

    // Creando el transporte de correo
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Opciones del correo
    const mailOptions = {
        from: process.env.SMTP_USERNAME,
        to: process.env.GRUPO7_CONTACTO,
        subject: subject,
        replyTo: email,
        html: `
            <div>
                <h2>${subject}</h2>
                <h4><strong>${message}</strong></h4>
                <br/><br/><br/><br/>
                <h5>Este mensaje fué enviado por ${name} através del formulario de contacto de Grupo7.CL</h5>
            </div>
            <img src="https://res.cloudinary.com/dtqfrwjdm/image/upload/v1694029561/pie-mail-2_ymxuix.jpg" alt="imagen de pie de email" style="width:100%; position:absolute; bottom:0; box-shadow:0 0 10px white; margin:0 auto" />
        `,
    };

    try {
        // Enviando el correo
        await transporter.sendMail(mailOptions);
        // Retornando una respuesta exitosa
        return NextResponse.json({ message: "¡Correo enviado con éxito!" });
    } catch (error) {
        console.error("Error:", error);
        // Retornando una respuesta de error
        return NextResponse.json({ error: "¡Oh no! Algo salió mal en el envío del correo" }, { status: 500 });
    }
}
