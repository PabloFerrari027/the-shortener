import { Env } from '@/shared/env';
import { NotificationPort } from '@/shared/ports/notification.port';
import nodemailer, { Transporter } from 'nodemailer';

export class NodemailerNotificationProvider implements NotificationPort {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
        user: Env.SMTP_EMAIL,
        pass: Env.SMTP_PASS,
      },
    });
  }

  async send(to: string, head: string, body: string): Promise<void> {
    await this.transporter.sendMail({
      from: Env.SMTP_EMAIL,
      to: to,
      subject: head,
      text: body,
    });
  }
}
