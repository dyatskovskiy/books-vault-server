import { Injectable } from '@nestjs/common';

import * as nodemailer from 'nodemailer';

import Mail from 'nodemailer/lib/mailer';

export type SendEmailResult = {
  success: boolean;
  error?: Error;
};

@Injectable()
export class MailService {
  constructor() {
    this.createTransporter();
  }

  private transporter: nodemailer.Transporter;

  private createTransporter(): void {
    const { MAILGUN_HOST, MAILGUN_PORT, MAILGUN_USER, MAILGUN_PASS } =
      process.env;

    this.transporter = nodemailer.createTransport({
      host: MAILGUN_HOST,
      port: +MAILGUN_PORT,
      auth: {
        user: MAILGUN_USER,
        pass: MAILGUN_PASS,
      },
    });
  }

  configureMessage(
    to: string,
    subject: string,
    htmlContent: string,
  ): Mail.Options {
    return {
      from: process.env.MAILGUN_FROM,
      to,
      subject,
      html: htmlContent,
    };
  }

  async sendEmail(emailConfig: Mail.Options): Promise<SendEmailResult> {
    try {
      await this.transporter.sendMail(emailConfig);

      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}
