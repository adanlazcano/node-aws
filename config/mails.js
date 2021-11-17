/**
 * @description Plantillas genericas para el envio de emails
 */
// Helpers
const sendMail = require('./sendMail');
// Constants
const messageContainer = `
  padding: 15px 50px;
  margin: 0 auto;
  max-width: 700px;
  /* background-color: rgb(163, 195, 235); */
  background-color: #F5F9FE;
`;
const imgColumn = 'padding: 5px 30px;';
const userNameColumn = `
  padding: 10px 30px;
  text-align: center;
`;
const bodyMessageColumn = `
  padding: 10px 30px;
  font-size: 18px;
  text-align: center;
`;
const btnColumn = `
  padding: 10px;
  text-align: center;
`;
const aOfBtnColumn = `
  cursor: pointer;
  font-size: 18px;
  background-color: #ff9d00;
  border: 1px #ff9d00 solid;
  color: #fff;
  padding: 7px 15px;
  border-radius: 30px;
`;
const subTextColumn = `
  padding: 10px 30px;
  text-align: center;
  font-size: 18px;
`;

const endTextColumn = `
  padding: 40px 30px 20px 30px;
  font-size: 16px;
  text-align: center;
`;

const basicStructure = (format, name) => {
  return `
  <table style="${messageContainer}">
    <tr class="empty-header">
      <td colspan="3"></td>
    </tr>

    <tr>
      <td style="${imgColumn}">
        <img src="${process.env.HOST_LOGO}" alt="">
        </td>
      <td>
        &nbsp;
      </td>
      <td>
        &nbsp;
      </td>
    </tr>

    <tr>
      <td style="${userNameColumn}" colspan="3">
        <h2>
          ¡Hola ${name}!
        </h2>
      </td>
    </tr>

    ${format}

    <tr class="empty-header">
      <td colspan="3"></td>
    </tr>

  </table>
`;
};

const textOnly = (data) => {
  return `
    <tr class="message-container__body-message">
      <td style="${bodyMessageColumn}" colspan="3">
        ${data.text}
      </td>
    </tr>

    <tr class="message-container__end-text">
      <td style="${endTextColumn}" colspan="3">
        ${data.footer}
      </td>
      <td>
          &nbsp;
        </td>
    </tr>
  `;
};

const textButton = (data) => {
  return `
    <tr class="message-container__body-message">
      <td style="${bodyMessageColumn}" colspan="3">
        ${data.text}
      </td>
    </tr>

    <tr class="message-container__message_button">
      <td style="${btnColumn}" colspan="3">
        <a style="${aOfBtnColumn}" href="${data.host}" target="_blank">
          ${data.button}
        </a>
      </td>
    </tr>

    <tr class="message-container__sub-text">
      <td colspan="3" style="${subTextColumn}">
        ${data.subText}
      </td>
    </tr>

    <tr class="message-container__end-text">
      <td style="${endTextColumn}" colspan="3">
        ${data.footer}
      </td>
      <td>
          &nbsp;
        </td>
    </tr>
  `;
};


const confirmation = (name, email, key) => {
  const text = 'Confirma tu cuenta haciendo click en el siguiente botón:';

  const data = {
    text: text,
    footer: '',
    host: process.env.CONFIRMATION + '?t=' + key,
    button: 'Confirmar cuenta',
    subText: '',
  };

  const mail = {
    mailOptions: {
      from: `${process.env.SERVER} <${process.env.MAIL_NO_REPLY}>`,
      to: email,
      subject: 'Confirma tu cuenta',
      html: basicStructure(textButton(data), name),
    },
  };
  return sendMail(mail);
};

const accountConfirmed = (name, email) => {
  const mail = {
    mailOptions: {
      from: `${process.env.SERVER} <${process.env.MAIL_NO_REPLY}>`,
      to: email,
      subject: 'Cuenta Confirmada',
      text: `Gracias ${name} por confirmar tu cuenta`,
      html: `<p>Gracias ${name} por confirmar tu cuenta</p>`,
    },
  };
  return sendMail(mail);
};


const passwordChanged = (name, email) => {
  const text = `Te notificamos que tu contraseña ha sido cambiada con éxito.
  Si no fuiste tú el que solicitó el cambio, por favor contáctanos inmediatamente, respondiendo este mensaje. 
  `;

  const data = {
    text: text,
    footer: '',
  };

  const mail = {
    mailOptions: {
      from: `${process.env.SERVER} <${process.env.MAIL_NO_REPLY}>`,
      to: email,
      subject: 'Haz cambiado tu contraseña',
      html: basicStructure(textOnly(data), name),
      replyTo: process.env.MAIL_SUPPORT,
    },
  };
  return sendMail(mail);
};

const changePassword = ( name, email, token) => {
  const text = `¿Qué tal?<br>
    Hemos recibido una solicitud para un cambio de contraseña en tu cuenta`;
  const footer = '<small>Si tienes alguna duda, contáctanos por esta vía haciendo click en responder.</small>';
  const subText = 'Si no has sido tú el que solicitó el cambio, puedes ignorar este mensaje🙃';

  const data = {
    text: text,
    footer: footer,
    host: process.env.PASSWORD_RESET + '?t=' + token,
    button: 'Cambiar contraseña',
    subText: subText,
  };

  const mail = {
    mailOptions: {
      from: `${process.env.SERVER} <${process.env.MAIL_NO_REPLY}>`,
      to: email,
      subject: 'Cambio de contraseña',
      html: basicStructure(textButton(data), name),
      replyTo: process.env.MAIL_SUPPORT,
    },
  };
  return sendMail(mail);
};

const setPassword = (name, email, token, creator) => {
  const text = `¿Qué tal?<br>
    ${creator} te ha agregado como usuario<br>
    Haz click en el siguiente botón para establecer tu contraseña y poder ingresar al panel.`;
  const subText = '';

  const data = {
    text: text,
    footer: '',
    host: process.env.PASSWORD_RESET + '?t=' + token,
    button: 'Establecer contraseña',
    subText: subText,
  };

  const mail = {
    mailOptions: {
      from: `${process.env.SERVER} <${process.env.MAIL_NO_REPLY}>`,
      to: email,
      subject: 'Activa tu usuario',
      html: basicStructure(textButton(data), name),
    },
  };
  return sendMail(mail);
};


module.exports = {
  confirmation,
  accountConfirmed,
  passwordChanged,
  changePassword,
  setPassword,
};
