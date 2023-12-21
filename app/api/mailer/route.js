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
        to: process.env.SMTP_USERNAME,
        subject: subject,
        replyTo: email,
        html: `
            <div>
                <h2>${subject}</h2>
                <h4><strong>${message}</strong></h4>
                <br/><br/><br/><br/>
                <h5>Este mensaje fue enviado por ${name} através del formulario de contacto de Leonor Berdichevsky Homeopata Online.</h5>
            </div>
            <img src="https://res.cloudinary.com/dsvlzbctv/image/upload/v1701215920/pie_de_mail_25f6c9e49a.jpg" alt="imagen de pie de email" style="width:100%; position:absolute; bottom:0; box-shadow:0 0 10px white; margin:0 auto" />
        `,
    };

    try {
        // Enviando el correo
        await transporter.sendMail(mailOptions);
        // Retornando una respuesta exitosa
        return NextResponse.json({ message: "¡Mensaje Enviado Exitosamente!" });
    } catch (error) {
        console.error("Error:", error);
        // Retornando una respuesta de error
        return NextResponse.json({ error: "¡Oh no! Algo salió Mal con tu Email" }, { status: 500 });
    }
}
