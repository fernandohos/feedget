import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "02317edcd2c8a1",
        pass: "a953213122db39"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({body, subject}: SendMailData) {
        transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Fernando Henrique <fernandohenriqueosantos@hotmail.com>',
            subject,
            html: body
        })
    }
}