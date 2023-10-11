import env from "../config/enviroment.config.js";
import { RPServices } from "../dao/Models/Service/recover-pass.service.js";
import { UServices } from "../dao/Models/Service/users.service.js";
import { logger } from "../utils/logs/logger.js";
import { transport } from "../utils/nodemailer.js";

class RecoverPassController {
  recoveryPass = async (req, res) => {
    try {
      const { email } = req.body;
      logger.info(email);
      const user = await UServices.getEmail(email.toLowerCase());
      if (user) {
        const result = await RPServices.create({ email });

        await transport.sendMail({
          from: env.gmail,
          to: email,
          subject: "Restablecer contraseña",
          html: ` 
            <div>
              <h1 style="color: "red"">Restablecer contraseña</h1>
              <p>Si desea restablecer la contraseña haga click</p>
              <a href="http://localhost:8080/recover-pass/reset-pass?code=${result.code}&email=${email}" >Aqui</a>
            </div>`,
        });
        res.send("Revise su casilla de mail");
      } else {
        res.send("ese mail no existe");
      }
    } catch (error) {
      logger.error(error);
    }
  };

  checkCode = async (req, res) => {
    try {
      const { code, email } = req.query;

      const result = await RPServices.checkCode({ code, email });
      if (result) {
        res.render("recoverpass", { email: email });
      } else {
        res.send("El codigo expiro o es invalido");
      }
    } catch (error) {
      res.render("error");
    }
  };
  updatePassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const result = await RPServices.updatePassword({ email, newPassword });
      if (result) {
        res.redirect("/");
      } else {
        res.send("error algo fallo");
      }
    } catch (e) {
      res.send("error hacer un handle");
    }
  };
}
export const recoverPassController = new RecoverPassController();
