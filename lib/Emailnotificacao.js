import nodemailer from 'nodemailer'

class EmailNotificacao {
    static async emailnotificacao(destinatario, Assunto, text){
            //Configurar o Transponder
        const  transpoter = await nodemailer.createTransport({
           service:'gmail',
           auth:{
           user: '',
           pass: ''
        }
    })

    //Definir o e-mail a ser enviado
        const mailOptions = {
            from:'seu_email@gmail.com',
            to:destinatario,
            subject:Assunto,
            text:text
        }

        //Enviar e-mail
        await transpoter.sendMail(mailOptions, (err, info)=>{
            if(err){
                return console.error(err.message)
            }
            console.debug('E-mail enviado: ' + info.response3)
         })

    }
}export default EmailNotificacao
