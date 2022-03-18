import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {getLogger} from "nodemailer/lib/shared";


class MailService {
	transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: false,
			auth:{
				user:process.env.SMTP_USER,
				pass:process.env.SMTP_PASS,
			}
		});
	}
	async sendActivationMail(to: any, link: any) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: `Activation Link is on` + process.env.API_URL,
			text: '',
			html:
				`
					<div> 
						<h1> For activation please go in the link below </h1>
						<a href="${link}">${link}</a>
					</div>
				`
		})
	}
}

export const mailService = new MailService();



